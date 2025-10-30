import LoadingSpinner from "@/components/ui/loading";
import { useGetMyOrder } from "@/hooks/useOrder";
import {
  Empty,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { ShoppingBag } from "lucide-react";
import OrderStatusHeader from "@/components/OrderStatusHeader";
import type { OrderT } from "@/types";
import OrderStatusDetails from "@/components/OrderStatusDetails";

const OrderStatus = () => {
  const { data: orders, isLoading } = useGetMyOrder();

  if (isLoading) {
    return (
      <LoadingSpinner size="md" type="withText" text="Loading orders..." />
    );
  }

  if (!orders || orders.length === 0) {
    return (
      <Empty>
        <EmptyHeader>
          <EmptyMedia variant="icon">
            <ShoppingBag />
          </EmptyMedia>
          <EmptyTitle>No restaurants found Yet</EmptyTitle>
        </EmptyHeader>
      </Empty>
    );
  }

  return (
    <div className="space-y-10">
      {orders.map((order: OrderT) => (
        <div className="space-y-10 bg-gray-50 p-10 rounded-lg">
          <OrderStatusHeader order={order} />
          <div className="grid grid-col-1 gap-10 md:grid-cols-2">
            <OrderStatusDetails order={order} />
            <AspectRatio ratio={16 / 5}>
              <img
                src={order.restaurant.imageUrl}
                className="rounded-md object-cover h-full w-full"
              />
            </AspectRatio>
          </div>
        </div>
      ))}
    </div>
  );
};

export default OrderStatus;
