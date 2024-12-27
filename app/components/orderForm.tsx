"use client";

import React, { useState } from "react";
import { toast } from "sonner";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
// import { useAppDispatch, useAppSelector } from "../hooks/store";
// import { removeFromCart, updateQuantity } from "../store/cartSlice";
import { Minus, Plus, Trash2 } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
// import { useSelector } from "react-redux";
// import { toggleWalking } from "../store/orderSlice";
// import { RootState } from "../store/store";
import SearchCustomars from "./searchCustomars";
import { useAtom, useAtomValue } from "jotai";
import { cartItemsAtom, cartTotalAtom, clearCartAtom, removeFromCartAtom, updateQuantityAtom } from "../state/cart";
import { visibleWalkingAtom } from "../state/atom";
import axios from "axios";
import Cookies from "js-cookie";

export default function OrderForm() {
  const [invoiceType, setInvoiceType] = useState("cash");
  const [orderType, setOrderType] = useState("delivery");

  const [customerid, setCustomerId] = useState(0);
  const [customerName, setCustomerName] = useState("");
  const [customerNumber, setCustomerNumber] = useState("");
  const [customerAddress, setCustomerAddress] = useState("");
  const [loading, setLoading] = useState(false);
  const [, updateQuantity] = useAtom(updateQuantityAtom);
  const [, clearCart] = useAtom(clearCartAtom);
  const items = useAtomValue(cartItemsAtom);
  const total = useAtomValue(cartTotalAtom);
  const [walking , setwalking] = useAtom(visibleWalkingAtom)
  const [, removeFromCart] = useAtom(removeFromCartAtom);
  // const dispatch = useAppDispatch();
  // const items = useAppSelector((state) => state.cart.items);
  // const total = useAppSelector((state) => state.cart.total);
  // const isVisible = useSelector((state: RootState) => state.walking.visible);

  const handleCustomerSelect = (customer: {
    id: number;
    name: string;
    phone: string;
    address: string;
  }) => {
    setCustomerId(customer.id)
    setCustomerName(customer.name);
    setCustomerNumber(customer.phone);
    setCustomerAddress(customer.address);
  };

  const handleQuantityChange = (name: string, quantity: number) => {
    if (quantity >= 0) {
      updateQuantity({ name, quantity })
    }
  };

  const handleCheckboxChange = () => {
    // dispatch(toggleWalking());
    setwalking(!walking)
  };

  const resetForm = () => {
    setCustomerId(0);
    setCustomerName("");
    setCustomerNumber("");
    setCustomerAddress("");
     setInvoiceType("cash");
    setOrderType("delivery");
    clearCart()
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    try {
      const data: any = {
        walking: walking,
        customer_id:customerid,
        customer_number:customerNumber,
        customer_name:customerName,
        customer_address:customerAddress,
        payment_type:invoiceType,
        order_type:orderType,
        moreFields:items.map((v) => ({product_id:v.id,quantity:v.quantity,rate:v.price})),
        payment:total,
        
      };
      const response = await axios.post(
        "https://app.chickenfriedhub.com/api/order",
        data,{
          headers:{
            Authorization: "Bearer " + Cookies.get('token')
          }
        }
      );
      console.log("order-submit", response);
      resetForm();
      toast.success("Order submitted successfully!");
    } catch (error) {
      console.error("Error submitting order:", error);
      toast.error("Failed to submit order.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-3xl mx-auto p-6 bg-white rounded-xl shadow-sm">
      <form className="space-y-6" onSubmit={handleSubmit}>
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-5">
            <Checkbox
              id="toggleVisibility"
              onCheckedChange={handleCheckboxChange}
              checked={walking}
            />
            <Label htmlFor="toggleVisibility">Walking</Label>
          </div>
          <SearchCustomars onSelectCustomer={handleCustomerSelect} />
        </div>

        {!walking && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              placeholder="Customer Name"
              value={customerName}
              onChange={(e) => setCustomerName(e.target.value)}
            />
            <Input
              placeholder="Customer Number"
              value={customerNumber}
              onChange={(e) => setCustomerNumber(e.target.value)}
            />
            <Input
              placeholder="Customer Address"
              value={customerAddress}
              onChange={(e) => setCustomerAddress(e.target.value)}
              className="md:col-span-2"
            />
          </div>
        )}

        {/* Invoice and Order Type */}
        <div className="flex flex-col space-y-4">
          <RadioGroup
            defaultValue="cash"
            value={invoiceType}
            onValueChange={setInvoiceType}
          >
            <Label>Invoice Type:</Label>
            <div className="flex space-x-4">
              {["cash", "pending", "transfer"].map((type) => (
                <div key={type} className="flex items-center space-x-2">
                  <RadioGroupItem value={type} id={type} />
                  <Label htmlFor={type}>
                    {type.charAt(0).toUpperCase() + type.slice(1)}
                  </Label>
                </div>
              ))}
            </div>
          </RadioGroup>

          <RadioGroup
            defaultValue="delivery"
            value={orderType}
            onValueChange={setOrderType}
          >
            <Label>Order Type:</Label>
            <div className="flex space-x-4">
              {["delivery", "takeaway", "dinein"].map((type) => (
                <div key={type} className="flex items-center space-x-2">
                  <RadioGroupItem value={type} id={type} />
                  <Label htmlFor={type}>
                    {type.charAt(0).toUpperCase() + type.slice(1)}
                  </Label>
                </div>
              ))}
            </div>
          </RadioGroup>
        </div>

        {/* Items Table */}
        <div className="rounded-md border">
          <ScrollArea className=" h-[calc(100vh-_350px)] overflow-y-auto">
            <Table>
              <TableHeader>
                <TableRow className="">
                  <TableHead>Item</TableHead>
                  <TableHead>Price</TableHead>
                  <TableHead>Quantity</TableHead>
                  <TableHead>Total</TableHead>
                  <TableHead>Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {items.map((item:any) => (
                  <TableRow key={item.name}>
                    <TableCell>{item.name}</TableCell>
                    <TableCell>{item.price.toFixed(2)}</TableCell>
                    <TableCell>
                      <div className="flex items-center">
                        <Button
                          size="sm"
                          type="button"
                          onClick={() =>
                            handleQuantityChange(item.name, item.quantity - 1)
                          }
                        >
                          <Minus />
                        </Button>
                        <span className="mx-2">{item.quantity}</span>
                        <Button

                          size="sm"
                          type="button"
                          onClick={() =>
                            handleQuantityChange(item.name, item.quantity + 1)
                          }
                        >
                          <Plus />
                        </Button>
                      </div>
                    </TableCell>
                    <TableCell>{item.total.toFixed(2)}</TableCell>
                    <TableCell>
                      <Button
                        variant="ghost"
                        onClick={() => removeFromCart(item.name)}
                      >
                        <Trash2 className="text-red-600" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
               
              </TableBody>
            </Table>
          </ScrollArea>
        </div>

        {/* Form Actions */}
        <div className="flex justify-between">
          <Button variant="outline" type="button" onClick={resetForm}>
            Reset
          </Button>
          <div className="flex justify-center items-center">
            <p className="mx-4 text-xl font-bold">Total: Rs-/ {total.toFixed(2)}</p>
          
          <Button type="submit" disabled={loading}>
            {loading ? "Submitting..." : "Submit"}
          </Button>
          </div>
        </div>
      </form>
    </div>
  );
}


const data = {
  walking: true,
  moreFields: [
    {
      product_id: 1,
      quantity: 2,
      rate: 40
    }
  ]
}