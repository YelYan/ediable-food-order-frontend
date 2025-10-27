import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ManageRestaurantForm from "@/components/forms/ManageRestaurantForm";
import { useMyRestaurant } from "@/hooks/useMyRestaurant";

const ManageRestaurant = () => {
  const { isCreatingmyRestaurant, createMyRestaurant } = useMyRestaurant();
  // const handleSubmit = (restaurantFormData: FormData) => {
  //   createMyRestaurant(restaurantFormData);
  // };
  return (
    <Tabs defaultValue="orders" defaultChecked={true}>
      <TabsList>
        <TabsTrigger value="orders">Orders</TabsTrigger>
        <TabsTrigger value="manage-restaurant">Manage Restaurant</TabsTrigger>
      </TabsList>
      <TabsContent value="orders">orders</TabsContent>
      <TabsContent value="manage-restaurant">
        <ManageRestaurantForm
          onSave={createMyRestaurant}
          isLoading={isCreatingmyRestaurant}
        />
      </TabsContent>
    </Tabs>
  );
};

export default ManageRestaurant;
