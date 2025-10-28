import type { Restaurant } from "@/types";
import type { CartItem } from "@/pages/details/DetailsRestaurant";
import { CardContent, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { Separator } from "./ui/separator";
import { Trash } from "lucide-react";

type Props = {
  restaurant: Restaurant;
  cartItems: CartItem[];
  removeFromCart: (cartItem: CartItem) => void;
};

const OrderSummary = ({ restaurant, cartItems, removeFromCart }: Props) => {
  return (
    <>
      <CardHeader>
        <CardTitle className="text-2xl font-bold tracking-tight flex justify-between">
          <span>Your Order</span>
          <span>$100</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col gap-5">
        {cartItems.map((item, index: number) => (
          <div className="flex justify-between" key={index}>
            <span>
              <Badge variant={"outline"} className="mr-2">
                {item.quantity}
              </Badge>
              {item.name}
            </span>
            <span className="flex items-center gap-1">
              <Trash
                className="cursor-pointer"
                color="red"
                size={20}
                onClick={() => removeFromCart(item)}
              />
              ${((item.price * item.quantity) / 100).toFixed(2)}
            </span>
          </div>
        ))}
        <Separator className="my-2" />
        <div className="flex justify-between">
          <span>Delivery</span>
          <span>${(restaurant.deliveryPrice / 100).toFixed(2)}</span>
        </div>
        <Separator className="my-2" />
      </CardContent>
    </>
  );
};

export default OrderSummary;
