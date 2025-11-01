import { useState, useEffect } from "react";
import type { OrderT, OrderStatus } from "@/types";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Separator } from "./ui/separator";
import { Badge } from "./ui/badge";
import { Label } from "./ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { ORDER_STATUS } from "@/config/order-status.config";
import { useMyRestaurant } from "@/hooks/useMyRestaurant";

type Props = {
  order: OrderT;
};

const OrderItemCard = ({ order }: Props) => {
  const [status, setStatus] = useState<OrderStatus>(order?.status);

  const { updateOrderStatus, isUpdatingOrderStatus } = useMyRestaurant();

  const getTime = () => {
    const orderDateTime = new Date(order.createdAt);

    const hours = orderDateTime.getHours();
    const minutes = orderDateTime.getMinutes();

    const paddedMinutes = minutes < 10 ? `0${minutes}` : minutes;

    return `${hours}:${paddedMinutes}`;
  };

  // Check if total amount should be shown
  const shouldShowTotalAmount = order.status !== "placed";

  useEffect(() => {
    setStatus(order.status);
  }, [order?.status]);

  async function handleStatusChange(newStatus: OrderStatus) {
    await updateOrderStatus({
      orderId: order._id,
      status: newStatus,
    });
    setStatus(newStatus);
  }

  return (
    <Card key={order._id}>
      <CardHeader>
        <CardTitle className="grid md:grid-cols-4 gap-4 justify-between mb-3">
          <div>
            Customer Name:
            <span className="ml-2 font-normal">
              {order.deliveryDetails.name}
            </span>
          </div>
          <div>
            Delivery address:
            <span className="ml-2 font-normal">
              {order.deliveryDetails.addressLine1}, {order.deliveryDetails.city}
            </span>
          </div>
          <div>
            Time:
            <span className="ml-2 font-normal">{getTime()}</span>
          </div>
          <div>
            Total Cost:
            <span className="ml-2 font-normal">
              {shouldShowTotalAmount ? (
                `$${(order.totalAmount / 100).toFixed(2)}`
              ) : (
                <Badge variant={"primary"}>Pending</Badge>
              )}
            </span>
          </div>
        </CardTitle>
        <Separator />
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex flex-col gap-2">
          {order.cartItems.map((cartItem, index) => (
            <span key={`${cartItem.menuItemId}-${index}`}>
              <Badge variant="outline" className="mr-2">
                {cartItem.quantity}
              </Badge>
              {cartItem.name}
            </span>
          ))}
        </div>
        <div className="flex flex-col gap-4">
          <Label htmlFor="status">What is the status of this order?</Label>
          <Select
            value={status}
            disabled={isUpdatingOrderStatus}
            onValueChange={(value) => handleStatusChange(value as OrderStatus)}
          >
            <SelectTrigger id="status">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent position="popper">
              {ORDER_STATUS.map((status) => (
                <SelectItem value={status.value}>{status.label}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </CardContent>
    </Card>
  );
};

export default OrderItemCard;
