import { useFormContext } from "react-hook-form";
import {
  FormControl,
  FormMessage,
  FormLabel,
  FormField,
  FormItem,
} from "../ui/form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

type Props = {
  index: number;
  removeMenuItem: () => void;
};

const MenuItemInput = ({ index, removeMenuItem }: Props) => {
  const { control } = useFormContext();
  return (
    <div className="flex gap-2 items-end" key={index}>
      <FormField
        control={control}
        name={`menuItems.${index}.name`}
        render={({ field }) => (
          <FormItem>
            <FormLabel className="flex items-center gap-2">
              Name <FormMessage />
            </FormLabel>
            <FormControl>
              <Input
                {...field}
                placeholder="Cheese Pizza"
                className="bg-white"
              />
            </FormControl>
          </FormItem>
        )}
      />
      <FormField
        control={control}
        name={`menuItems.${index}.price`}
        render={({ field }) => (
          <FormItem>
            <FormLabel className="flex items-center gap-1">
              Price (£) <FormMessage />
            </FormLabel>
            <FormControl>
              <Input {...field} placeholder="8.00" className="bg-white" />
            </FormControl>
          </FormItem>
        )}
      />
      <Button
        className="border border-red-500 text-red-500 hover:text-red-300"
        variant="outline"
        type="button"
        onClick={removeMenuItem}
      >
        Remove
      </Button>
    </div>
  );
};

export default MenuItemInput;
