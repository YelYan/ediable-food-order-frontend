import { Dialog, DialogContent, DialogTrigger } from "./ui/dialog";
import { Button } from "./ui/button";

const CheckOutBtn = () => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant={"primary"}>Go to checkout</Button>
      </DialogTrigger>
      <DialogContent>we will add user profile form here</DialogContent>
    </Dialog>
  );
};

export default CheckOutBtn;
