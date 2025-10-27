import {
  FormDescription,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { cuisineList } from "@/config/manage-restaurant.config";
import { useFormContext } from "react-hook-form";
import CuisineCheckBox from "./CuisineCheckBox";

const CuisineSection = () => {
  const { control } = useFormContext();
  return (
    <div className="space-y-4">
      <div>
        <h2 className="text-2xl font-bold">Cuisines</h2>
        <FormDescription>
          Select the cuisines that your restaurant serves
        </FormDescription>
      </div>

      <FormField
        control={control}
        name="cuisines"
        render={({ field }) => (
          <FormItem>
            <div className="grid grid-cols-1 md:grid-cols-5 gap-2">
              {cuisineList.map((cuisine) => (
                <CuisineCheckBox cuisine={cuisine} field={field} />
              ))}
            </div>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
};

export default CuisineSection;
