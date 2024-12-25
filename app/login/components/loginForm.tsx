"use client";

import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store/store";
import { loginStart, loginSuccess, loginFailure } from "../../store/authSlice";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useRouter } from "next/navigation";
import axios from "axios";

const loginSchema = z.object({
  email: z
    .string()
    .email("Invalid email address")
    .nonempty("Email is required"),
  password: z
    .string()
    .min(6, "Password must be at least 6 characters")
    .nonempty("Password is required"),
});

type FormData = z.infer<typeof loginSchema>;

export default function LoginPage() {
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();
  const { loading, error } = useSelector((state: RootState) => state.auth);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: FormData) => {
    dispatch(loginStart());
    try {
      const response = await axios.post(
        "https://app.chickenfriedhub.com/api/login",
        data
      );
      console.log("agya----", data);
      dispatch(loginSuccess(response.data));
      router.push("/");
    } catch (err: unknown) {
      const errorMessage =
        (err as any)?.response?.data?.message || "Login failed";
      dispatch(loginFailure(errorMessage));
    }
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-gray-50 w-full">
      {/* Left Panel - Login Form */}
      <div className="flex-1 flex items-center justify-center px-6 py-12 bg-white">
        <div className="w-full max-w-md">
          <h2 className="text-2xl font-semibold mb-4">Log in</h2>
          <p className="text-gray-500 mb-8">Please enter your details below.</p>
          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-2 rounded mb-4 text-center">
              {error}
            </div>
          )}
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div>
              <label
                htmlFor="email"
                className="block text-gray-600 font-medium mb-2"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                {...register("email")}
                className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:outline-none transition ${
                  errors.email
                    ? "border-red-500 focus:ring-red-300"
                    : "border-gray-300 focus:ring-orange-500"
                }`}
                placeholder="Enter Your Email"
              />
              {errors.email && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.email.message}
                </p>
              )}
            </div>
            <div>
              <label
                htmlFor="password"
                className="block text-gray-600 font-medium mb-2"
              >
                Password
              </label>
              <input
                type="password"
                id="password"
                {...register("password")}
                className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:outline-none transition ${
                  errors.password
                    ? "border-red-500 focus:ring-red-300"
                    : "border-gray-300 focus:ring-orange-500"
                }`}
                placeholder="Enter Your Password"
              />
              {errors.password && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.password.message}
                </p>
              )}
            </div>
            <div className="flex items-center justify-between text-sm">
              <label className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  className="w-4 h-4 text-orange-500 border-gray-300 rounded"
                />
                <span>Remember me</span>
              </label>
              {/* <a href="#" className="text-orange-500 hover:underline">
                Forgot Password?
              </a> */}
            </div>
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-orange-500 hover:bg-orange-600 text-white font-medium py-2 rounded-lg transition disabled:opacity-50"
            >
              {loading ? "Logging in..." : "Sign in"}
            </button>
          </form>
        </div>
      </div>

      {/* Right Panel - Image Section */}
      <div className="flex-1 hidden md:flex items-center justify-center relative">
        <img src="/back.jpg" alt="Food Banner" className="w-full h-full " />
        <div className="absolute inset-0 bg-black/40 flex flex-col items-center justify-center text-center text-white px-4">
          <h2 className="text-3xl font-bold mb-2">Craving Something?</h2>
          <p className="mb-6">Let's get you started!</p>
          {/* <button className="bg-orange-500 text-white py-2 px-6 rounded-lg hover:bg-orange-600">
            Get Started
          </button> */}
        </div>
      </div>
    </div>
  );
}
