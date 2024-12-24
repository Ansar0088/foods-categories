import Image from "next/image";
import Categories from "./components/categories";
import OrderForm from "./components/orderForm";

export default function Home() {
  return (
    <div className="flex">
     <Categories/>
     <OrderForm/>
    </div>
  );
}
