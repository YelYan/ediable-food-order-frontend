import { Separator } from "@/components/ui/separator";
import { z } from "zod";
import { useForm, type Resolver } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form } from "@/components/ui/form";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import LoadingSpinner from "@/components/ui/loading";
import type { Restaurant } from "@/types";

import DetailsSection from "./DetailsSection";
import CuisineSection from "./CuisineSection";
import MenuSection from "./MenuSection";
import ImageSection from "./ImageSection";

const formSchema = z
  .object({
    restaurantName: z.string({
      message: "restaurant name is required",
    }),
    city: z.string({
      message: "city is required",
    }),
    country: z.string({
      message: "country is required",
    }),
    deliveryPrice: z.coerce
      .number({
        message: "delivery price is required",
      })
      .refine((v) => !Number.isNaN(v), { message: "must be a valid number" }),
    estimatedDeliveryTime: z.coerce
      .number({
        message: "estimated delivery time is required",
      })
      .refine((v) => !Number.isNaN(v), { message: "must be a valid number" }),
    cuisines: z.array(z.string()).nonempty({
      message: "please select at least one item",
    }),
    menuItems: z.array(
      z.object({
        name: z.string().min(1, "name is required"),
        price: z.coerce
          .number()
          .refine((v) => !Number.isNaN(v), {
            message: "must be a valid number",
          })
          .min(1, "price is required"),
      })
    ),
    imageUrl: z.string().optional(),
    imageFile: z.instanceof(File, { message: "image is required" }).optional(),
  })
  .refine((data) => data.imageUrl || data.imageFile, {
    message: "Either image URL or image File must be provided",
    path: ["imageFile"],
  });

type RestaurantFormData = z.infer<typeof formSchema>;

type Props = {
  restaurant?: Restaurant;
  onSave: (restaurantFormData: FormData) => void;
  isLoading: boolean;
};

const ManageRestaurantForm = ({ onSave }: Props) => {
  const form = useForm<RestaurantFormData>({
    resolver: zodResolver(formSchema) as Resolver<RestaurantFormData>,
    defaultValues: {
      cuisines: [],
      menuItems: [
        {
          name: "",
          price: 0,
        },
      ],
    },
  });

  const isLoading = false;

  const onSubmit = (formDataJson: RestaurantFormData) => {
    const formData = new FormData();

    formData.append("restaurantName", formDataJson.restaurantName);
    formData.append("city", formDataJson.city);
    formData.append("country", formDataJson.country);

    formData.append(
      "deliveryPrice",
      (formDataJson.deliveryPrice * 100).toString()
    );
    formData.append(
      "estimatedDeliveryTime",
      formDataJson.estimatedDeliveryTime.toString()
    );
    formDataJson.cuisines.forEach((cuisine, index) => {
      formData.append(`cuisines[${index}]`, cuisine);
    });

    formDataJson.menuItems.forEach((menuItem, index) => {
      formData.append(`menuItems[${index}][name]`, menuItem.name);
      formData.append(
        `menuItems[${index}][price]`,
        (menuItem.price * 100).toString()
      );
    });

    if (formDataJson.imageFile) {
      formData.append(`imageFile`, formDataJson.imageFile);
    }

    onSave(formData);
  };
  return (
    <Card>
      <CardHeader>
        <CardTitle>Details</CardTitle>
        <CardDescription>
          Enter your details about your restaurant.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <DetailsSection />
            <Separator className="my-4" />
            <CuisineSection />
            <Separator className="my-4" />
            <MenuSection />
            <Separator className="my-4" />
            <ImageSection />
            <Separator className="my-4" />
            <Button disabled={isLoading} type="submit" variant={"primary"}>
              {isLoading ? <LoadingSpinner size="sm" /> : "Submit"}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default ManageRestaurantForm;
