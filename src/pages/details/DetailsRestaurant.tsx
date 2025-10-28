import { useState } from "react";
import { useParams } from "react-router";
import { useGetRestaurant } from "@/hooks/useRestaurant";
import { ShoppingBag } from "lucide-react";
import LoadingSpinner from "@/components/ui/loading";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import {
  Empty,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty";
import { Card, CardFooter } from "@/components/ui/card";

import RestaurantInfo from "@/components/RestaurantInfo";
import MenuItemCom from "@/components/MenuItem";
import OrderSummary from "@/components/OrderSummary";
import CheckOutBtn from "@/components/CheckOutBtn";

export type CartItem = {
  _id: string;
  name: string;
  price: number;
  quantity: number;
};

const DetailsRestaurant = () => {
  const { restaurantId } = useParams<{ restaurantId: string }>();
  const [cartItems, setCartItems] = useState([]);

  const { data: restaurant, isLoading } = useGetRestaurant(
    restaurantId as string
  );

  const addToCart = () => {
    console.log("add to cart");
  };

  const removeFromCart = () => {
    console.log("remove");
  };

  if (isLoading) {
    return <LoadingSpinner size="md" variant={"animated"} />;
  }

  if (!restaurant || !restaurantId) {
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
    <div className="flex flex-col gap-10">
      <AspectRatio ratio={16 / 5}>
        <img
          src={restaurant.imageUrl}
          className="rounded-md object-cover h-full w-full"
        />
      </AspectRatio>

      <div className="grid md:grid-cols-[4fr_2fr] gap-5 md:px-32">
        <div className="space-y-4">
          <RestaurantInfo restaurant={restaurant} />
          <span className="text-2xl font-bold tracking-tight block mb-4">
            Menu
          </span>
          <div className="space-y-4">
            {restaurant.menuItems.map((menuItem, index: number) => (
              <MenuItemCom
                key={index}
                menuItem={menuItem}
                addToCart={addToCart}
              />
            ))}
          </div>
        </div>
        {/* order summary */}
        <Card>
          <OrderSummary
            restaurant={restaurant}
            cartItems={cartItems}
            removeFromCart={removeFromCart}
          />
          <CardFooter>
            <CheckOutBtn />
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default DetailsRestaurant;
