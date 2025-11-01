import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ManageRestaurantForm from "@/components/forms/ManageRestaurantForm";
import { useMyRestaurant } from "@/hooks/useMyRestaurant";
import OrderItemCard from "@/components/OrderItemCard";
import type { OrderT } from "@/types";
import LoadingSpinner from "@/components/ui/loading";

const ManageRestaurant = () => {
  const {
    isCreatingmyRestaurant,
    createMyRestaurant,
    myrestaurant,
    updateMyRestaurant,
    isUpdatingResstaurant,
    orders,
    isGettingOrder,
  } = useMyRestaurant();

  const isEditing = !!myrestaurant;

  if (isGettingOrder || !orders?.data) {
    return <LoadingSpinner />;
  }

  return (
    <Tabs defaultValue="orders" defaultChecked={true}>
      <TabsList>
        <TabsTrigger value="orders">Orders</TabsTrigger>
        <TabsTrigger value="manage-restaurant">Manage Restaurant</TabsTrigger>
      </TabsList>
      <TabsContent
        value="orders"
        className="space-y-5 bg-gray-50 p-10 rounded-lg"
      >
        <h2 className="text-2xl font-bold">
          {orders?.data?.length} active orders
        </h2>
        {orders?.data?.map((order: OrderT) => (
          <OrderItemCard key={order._id} order={order} />
        ))}
      </TabsContent>
      <TabsContent value="manage-restaurant">
        <ManageRestaurantForm
          restaurant={myrestaurant}
          onSave={isEditing ? updateMyRestaurant : createMyRestaurant}
          isLoading={isCreatingmyRestaurant || isUpdatingResstaurant}
        />
      </TabsContent>
    </Tabs>
  );
};

export default ManageRestaurant;
