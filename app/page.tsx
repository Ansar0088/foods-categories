import Categories from "./components/categories";
import OrderForm from "./components/orderForm";
import ProtectedRoute from "./login/components/ProtectedRoute";

export default function Home() {
  return (
     <ProtectedRoute>
    <div className="flex">
     <Categories/>
     <OrderForm/>
    </div>
    </ProtectedRoute>
  );
}
