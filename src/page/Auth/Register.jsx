import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Eye, EyeOff } from "lucide-react";

// Fake database for demo
const existingUsers = ["test@example.com", "demo@wavora.com"];

// Zod schema
const signupSchema = z
  .object({
    name: z.string().min(3, "Name is required"),
    email: z
      .string()
      .min(1, "Email is required")
      .email("Invalid email format")
      .refine((val) => !existingUsers.includes(val), {
        message: "Email already exists. Please login.",
      }),
    password: z.string().min(6, "Password must be at least 6 characters"),
    confirmPassword: z.string().min(1, "Please confirm your password"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

const Register = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [fieldErrors, setFieldErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    watch,
  } = useForm({
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = async (data) => {
    setFieldErrors({});
    setSuccessMessage("");
    setIsSubmitting(true);

    try {
      // Validate with Zod
      const validatedData = signupSchema.parse(data);
      
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500));
      
      setSuccessMessage("✅ Signup successful! Redirecting...");
      reset();
    } catch (error) {
      // Handle Zod validation errors
      if (error instanceof z.ZodError) {
        const errors = {};
        error.errors.forEach((err) => {
          errors[err.path[0]] = err.message;
        });
        setFieldErrors(errors);
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const formData = watch();

  return (
    <div className="w-full flex items-center justify-center p-4 sm:p-6 min-h-screen bg-gray-50">
      <div className="w-full sm:max-w-lg bg-white rounded-2xl p-6 sm:p-8 border border-gray-200 shadow-2xl">
        {/* Logo */}
        <div className="w-16 sm:w-20 mx-auto mb-4 bg-gradient-to-br from-green-500 to-green-700 rounded-lg flex items-center justify-center">
          <span className="text-white font-bold text-xl">W</span>
        </div>

        {/* Title */}
        <h2 className="text-2xl sm:text-3xl font-bold text-center text-gray-800 mb-2">
          Create Your Account
        </h2>
        <p className="text-center text-gray-600 mb-6 text-sm sm:text-base">
          Fill in the details below to get started
        </p>

        {/* Social Signup */}
        <div className="flex justify-center gap-4 items-center mb-4">
          <button type="button" className="w-10 h-10 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-50 transition">
            G
          </button>
          <button type="button" className="w-10 h-10 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-50 transition">
            f
          </button>
        </div>

        {/* Divider */}
        <div className="flex items-center my-6">
          <hr className="flex-grow border-gray-300" />
          <span className="px-3 text-gray-500 text-sm">Or Sign Up with</span>
          <hr className="flex-grow border-gray-300" />
        </div>

        {/* Signup Form */}
        <div onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          {/* Name */}
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-semibold text-gray-700 mb-2"
            >
              Enter Name
            </label>
            <input
              type="text"
              id="name"
              placeholder="Enter your full name"
              {...register("name")}
              className={`w-full px-4 py-2 rounded-lg border ${
                fieldErrors.name ? "border-red-500 bg-red-50" : "border-gray-300"
              } focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none transition`}
            />
            {fieldErrors.name && (
              <p className="text-red-500 text-sm mt-1">
                {fieldErrors.name}
              </p>
            )}
          </div>

          {/* Email */}
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-semibold text-gray-700 mb-2"
            >
              Email Address
            </label>
            <input
              type="email"
              id="email"
              placeholder="Enter your email"
              {...register("email")}
              className={`w-full px-4 py-2 rounded-lg border ${
                fieldErrors.email ? "border-red-500 bg-red-50" : "border-gray-300"
              } focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none transition`}
            />
            {fieldErrors.email && (
              <p className="text-red-500 text-sm mt-1">
                {fieldErrors.email}
              </p>
            )}
          </div>

          {/* Password */}
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-semibold text-gray-700 mb-2"
            >
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                placeholder="Enter your password"
                {...register("password")}
                className={`w-full px-4 py-2 pr-10 rounded-lg border ${
                  fieldErrors.password ? "border-red-500 bg-red-50" : "border-gray-300"
                } focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none transition`}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-2.5 text-gray-500 hover:text-gray-700 transition"
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
            {fieldErrors.password && (
              <p className="text-red-500 text-sm mt-1">
                {fieldErrors.password}
              </p>
            )}
          </div>

          {/* Confirm Password */}
          <div>
            <label
              htmlFor="confirmPassword"
              className="block text-sm font-semibold text-gray-700 mb-2"
            >
              Confirm Password
            </label>
            <div className="relative">
              <input
                type={showConfirmPassword ? "text" : "password"}
                id="confirmPassword"
                placeholder="Re-enter your password"
                {...register("confirmPassword")}
                className={`w-full px-4 py-2 pr-10 rounded-lg border ${
                  fieldErrors.confirmPassword ? "border-red-500 bg-red-50" : "border-gray-300"
                } focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none transition`}
              />
              <button
                type="button"
                onClick={() =>
                  setShowConfirmPassword(!showConfirmPassword)
                }
                className="absolute right-3 top-2.5 text-gray-500 hover:text-gray-700 transition"
              >
                {showConfirmPassword ? (
                  <EyeOff size={20} />
                ) : (
                  <Eye size={20} />
                )}
              </button>
            </div>
            {fieldErrors.confirmPassword && (
              <p className="text-red-500 text-sm mt-1">
                {fieldErrors.confirmPassword}
              </p>
            )}
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={isSubmitting}
            onClick={handleSubmit(onSubmit)}
            className="w-full py-2 px-4 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 transition disabled:bg-green-300 disabled:cursor-not-allowed"
          >
            {isSubmitting ? "Signing up..." : "Sign Up"}
          </button>

          {/* Success Message */}
          {successMessage && (
            <p className="text-green-600 text-center mt-3 text-sm font-medium">
              {successMessage}
            </p>
          )}
        </div>

        {/* Extra Links */}
        <div className="text-center mt-6 text-sm text-gray-600">
          <p>
            Already have an account?{" "}
            <a href="/login" className="text-green-600 hover:underline font-medium">
              Login
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;