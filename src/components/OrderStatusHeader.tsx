import type { OrderT } from "@/types";
import { Progress } from "@/components/ui/progress";
import { ORDER_STATUS } from "@/config/order-status.config";
import { Label } from "./ui/label";

const OrderStatusHeader = ({ order }: { order: OrderT }) => {
  function getExceptedDelivery() {
    const created = new Date(order.createdAt);

    created.setMinutes(
      created.getMinutes() + order.restaurant.estimatedDeliveryTime
    );

    const hours = created.getHours();
    const minutes = created.getMinutes();
    const paddedMinutes = minutes < 10 ? `0${minutes}` : minutes;

    return `${hours} : ${paddedMinutes}`;
  }

  function progressOrderStatus() {
    const results = ORDER_STATUS.map((status) => {
      if (status.value === order.status) {
        return (
          <div className="space-y-4">
            <Label>{status.label}</Label>
            <Progress
              className="animate-pulse [&>div]:bg-orange-500"
              value={status.progressValue}
            />
          </div>
        );
      }
    });
    return results;
  }
  return (
    <>
      <h1 className="text-2xl font-bold tracking-tighter flex flex-col gap-4 md:flex-row md:justify-between">
        <span>Order Status : {order.status}</span>
        <span>Excepted By: {getExceptedDelivery()}</span>
      </h1>
      {progressOrderStatus()}
    </>
  );
};

export default OrderStatusHeader;
