import { useState } from "react";
import { useParams } from "react-router";
import { useGetRestaurant } from "@/hooks/useRestaurant";
import { useOrder } from "@/hooks/useOrder";
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
import type { MenuItem } from "@/types";
import type { ProfileFormValues } from "@/components/CheckOutBtn";
import { useGetCurrentUser } from "@/hooks/useUser";

export type CartItem = {
  _id: string;
  name: string;
  price: number;
  quantity: number;
};

const DetailsRestaurant = () => {
  const { restaurantId } = useParams<{ restaurantId: string }>();
  const [cartItems, setCartItems] = useState<CartItem[]>(() => {
    const storedCartItems = sessionStorage.getItem(`cartItems-${restaurantId}`);
    return storedCartItems ? JSON.parse(storedCartItems) : [];
  });

  const { data: restaurant, isLoading } = useGetRestaurant(
    restaurantId as string
  );

  const { createCheckoutSession, isCreatingCheckoutSession } = useOrder();
  const { data: currentUser } = useGetCurrentUser();

  const addToCart = (menuItem: MenuItem) => {
    setCartItems((prevCartItems) => {
      const existing = prevCartItems.find((ci) => ci._id === menuItem._id);
      if (existing) {
        return prevCartItems.map((ci) =>
          ci._id === menuItem._id ? { ...ci, quantity: ci.quantity + 1 } : ci
        );
      }

      sessionStorage.setItem(
        `cartItems-${restaurantId}`,
        JSON.stringify([
          ...prevCartItems,
          {
            _id: menuItem._id,
            name: menuItem.name,
            price: menuItem.price,
            quantity: 1,
          },
        ])
      );
      return [
        ...prevCartItems,
        {
          _id: menuItem._id,
          name: menuItem.name,
          price: menuItem.price,
          quantity: 1,
        },
      ];
    });
  };

  const removeFromCart = (cartItem: CartItem) => {
    setCartItems((prevCartItem) => {
      const updatedCartItems = prevCartItem.filter(
        (item) => item._id !== cartItem._id
      );
      sessionStorage.setItem(
        `cartItems-${restaurantId}`,
        JSON.stringify(updatedCartItems)
      );
      return updatedCartItems;
    });
  };

  const onCheckOut = async (userFormData: ProfileFormValues) => {
    if (!restaurant) return;

    const checkOutData = {
      cartItems: cartItems.map((cartItem) => ({
        menuItemId: cartItem._id,
        name: cartItem.name,
        quantity: cartItem.quantity.toString(),
      })),
      restaurantId: restaurant._id,
      deliveryDetails: {
        name: userFormData.name ?? "",
        addressLine1: userFormData.addressLine1 ?? "",
        city: userFormData.city ?? "",
        country: userFormData.country ?? "",
        email: currentUser?.email ?? "",
      },
    };

    const data = await createCheckoutSession(checkOutData);
    window.location.href = data.url;
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
                addToCart={() => addToCart(menuItem)}
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
            <CheckOutBtn
              disabled={cartItems.length === 0}
              onCheckOut={onCheckOut}
              isLoading={isCreatingCheckoutSession}
            />
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default DetailsRestaurant;
