'use client'
import Categories from "./components/categories";
import OrderForm from "./components/orderForm";
import Navbar from "./login/components/Navbar";

export default function Home() {
  
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
