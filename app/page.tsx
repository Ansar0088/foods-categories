'use client'
import { useAtomValue } from "jotai";
import Categories from "./components/categories";
import OrderForm from "./components/orderForm";
import ProtectedRoute from "./login/components/ProtectedRoute";
import { authUser } from "./state/atom";
import Cookies from "js-cookie";
import Navbar from "./login/components/Navbar";

export default function Home() {
  const valueAuthUser = useAtomValue(authUser)
  
  return (
    //  <ProtectedRoute>
    <>
      <Navbar></Navbar>
    <div className="flex">
     <Categories/>
     <OrderForm/>
    </div>
    </>
    // </ProtectedRoute>
  );
}
