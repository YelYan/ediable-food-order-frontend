import { Card, CardContent } from "./ui/card";
import type { Restaurant } from "@/types";
import { AspectRatio } from "./ui/aspect-ratio";
import { Link } from "react-router";
import { Banknote, Clock, Dot } from "lucide-react";

const SearchCardResults = ({ restaurant }: { restaurant: Restaurant }) => {
  return (
    <Link to={`/details/${restaurant._id}`}>
      <Card>
        <CardContent className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 items-center">
          <AspectRatio ratio={19 / 8}>
            <img
              src={restaurant.imageUrl}
              className="rounded-md w-full h-full object-cover"
            />
          </AspectRatio>

          <div className="col-span-2 flex flex-col md:flex-row items-center gap-8">
            <div id="card-content" className="flex flex-col">
              <h3 className="text-2xl font-bold tracking-tight mb-2 hover:underline">
                {restaurant.restaurantName}
              </h3>
              <div className="flex flex-row flex-wrap">
                {restaurant.cuisines.map((item, index) => (
                  <span key={index} className="flex">
                    <span>{item}</span>
                    {index < restaurant.cuisines.length - 1 && <Dot />}
                  </span>
                ))}
              </div>
            </div>
            <div className="flex gap-2 flex-col">
              <div className="flex items-center gap-1 text-green-600">
                <Clock className="text-green-600" />
                {restaurant.estimatedDeliveryTime} mins
              </div>
              <div className="flex  gap-1">
                <Banknote />
                Delivery from ${(restaurant.deliveryPrice / 100).toFixed(2)}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
};

export default SearchCardResults;
