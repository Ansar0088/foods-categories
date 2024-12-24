"use client";
import { useState } from "react";
import { toast } from "sonner";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useAppDispatch, useAppSelector } from "../hooks/store";
import { removeFromCart, updateQuantity } from "../store/cartSlice";
import { Minus, Plus, Trash2 } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useSelector } from "react-redux";
import { toggleWalking } from "../store/orderSlice";
import { RootState } from "../store/store";

export default function OrderForm() {
  const [invoiceType, setInvoiceType] = useState("cash");
  const [orderType, setOrderType] = useState("delivery");

  const items = useAppSelector((state) => state.cart.items);
  const total = useAppSelector((state) => state.cart.total);
  const isVisible = useSelector((state: RootState) => state.walking.visible);
  console.log("sss--", isVisible);

  const dispatch = useAppDispatch();

  const handleQuantityChange = (name: string, quantity: number) => {
    dispatch(updateQuantity({ name, quantity }));
  };
  const handleCheckboxChange = () => {
    dispatch(toggleWalking());
  };
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = {
      invoiceType,
      orderType,
      items,
      total,
    };

    console.log(JSON.stringify(data, null, 2));

    toast.success("Order submitted successfully!", {
      style: {
        backgroundColor: "#28A745",
        color: "#ffffff",
      },
    });
  };

  return (
    <div className="w-full max-w-3xl mx-auto p-6 bg-white rounded-xl shadow-sm">
      {/* {JSON.stringify('oye agyaa',handleSubmit)} */}

      <form className="space-y-6" onSubmit={handleSubmit}>
        {/* Walking Checkbox */}
        <div className="flex items-center space-x-2">
          <Checkbox
            id="toggleVisibility"
            onCheckedChange={handleCheckboxChange}
            checked={!isVisible}
            className="checkbox"

          />
          <Label htmlFor="walking">Walking</Label>
        </div>
        {isVisible && (
          <>
            <Select>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="--Select Customer--" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="1">Customer 1</SelectItem>
                <SelectItem value="2">Customer 2</SelectItem>
                <SelectItem value="3">Customer 3</SelectItem>
              </SelectContent>
            </Select>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input placeholder="Customer Number" />
              <Input placeholder="Customer Name" />
            </div>
            <Input placeholder="Customer Address" />
          </>
          
        )}

<div className="space-y-2">
              <Label>Invoice Type:</Label>
              <RadioGroup
                defaultValue="cash"
                value={invoiceType}
                onValueChange={setInvoiceType}
                className="flex space-x-4"
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="cash" id="cash" />
                  <Label htmlFor="cash">Cash</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="pending" id="pending" />
                  <Label htmlFor="pending">Pending</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="transfer" id="transfer" />
                  <Label htmlFor="transfer">Transfer</Label>
                </div>
              </RadioGroup>
            </div>

            {/* Order Type */}
            <div className="space-y-2">
              <Label>Order Type:</Label>
              <RadioGroup
                defaultValue="delivery"
                value={orderType}
                onValueChange={setOrderType}
                className="flex space-x-4"
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="delivery" id="delivery" />
                  <Label htmlFor="delivery">Delivery</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="takeaway" id="takeaway" />
                  <Label htmlFor="takeaway">Takeaway</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="dinein" id="dinein" />
                  <Label htmlFor="dinein">DineIn</Label>
                </div>
              </RadioGroup>
            </div>
        {/* Items Table */}
        <div className="rounded-md border">
          <ScrollArea className="h-40">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Item</TableHead>
                  <TableHead>Price</TableHead>
                  <TableHead>Quantity</TableHead>
                  <TableHead>Total</TableHead>
                  <TableHead>Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {items.map((item) => (
                  <TableRow key={item.name}>
                    <TableCell>{item.name}</TableCell>
                    <TableCell>{item.price.toFixed(2)}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Button
                          variant="outline"
                          type="button"
                          size="sm"
                          onClick={() =>
                            handleQuantityChange(item.name, item.quantity - 1)
                          }
                        >
                          <Minus className="h-4 w-4" />
                        </Button>
                        <span className="w-8 text-center">{item.quantity}</span>
                        <Button
                          variant="outline"
                          type="button"
                          size="sm"
                          onClick={() =>
                            handleQuantityChange(item.name, item.quantity + 1)
                          }
                        >
                          <Plus className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                    <TableCell>{item.total.toFixed(2)}</TableCell>
                    <TableCell>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => dispatch(removeFromCart(item.name))}
                      >
                        <Trash2 className="h-4 w-4 text-red-600" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
                <TableRow>
                  <TableCell colSpan={3} className="text-right font-medium">
                    Total Amount:
                  </TableCell>
                  <TableCell className="font-bold">
                    ${total.toFixed(2)}
                  </TableCell>
                  <TableCell />
                </TableRow>
              </TableBody>
            </Table>
          </ScrollArea>
        </div>
        <div className="flex justify-between">
          <Button variant="outline" type="button">
            Reset
          </Button>
          <Button type="submit" className="bg-blue-500 hover:bg-blue-600">
            Submit
          </Button>
        </div>
      </form>
    </div>
  );
}
