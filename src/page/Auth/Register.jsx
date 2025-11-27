// File: Register.jsx
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { motion, AnimatePresence } from "framer-motion";

import Wavora from "../../assets/Treva.svg";
import Google from "../../assets/Googleicon.svg";
import Facebook from "../../assets/Facebook.svg";
import regImg from "../../assets/register.jpeg";

// Fake database
const existingUsers = ["test@example.com", "demo@wavora.com"];

const signupSchema = z
  .object({
    name: z.string().min(3, "Name is required"),
    email: z
      .string()
      .min(1, "Email is required")
      .email("Invalid email")
      .refine((val) => !existingUsers.includes(val), {
        message: "Email already exists. Please login.",
      }),
    password: z.string().min(6, "Password must be at least 6 characters"),
    confirmPassword: z.string().min(1, "Please confirm your password"),
  })
  .refine((v) => v.password === v.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

const fieldVariants = {
  hidden: { opacity: 0, y: 10 },
  show: (i = 1) => ({ opacity: 1, y: 0, transition: { delay: i * 0.08 } }),
};

export default function Register() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm({ resolver: zodResolver(signupSchema) });

  const onSubmit = async (data) => {
    setSuccessMessage("");
    await new Promise((res) => setTimeout(res, 1200));
    setSuccessMessage("✅ Signup successful! Redirecting...");
    reset();
  };

  const neuStyle = {
    boxShadow:
      "12px 12px 24px rgba(14, 30, 37, 0.08), -8px -8px 18px rgba(255,255,255,0.9)",
  };

  return (
    <div className="w-full h-screen flex items-center justify-center bg-gray-50 p-4">
      <div className="w-full flex flex-col md:flex-row gap-6 items-stretch">

        {/* LEFT IMAGE PANEL */}
        <div className="w-full md:w-1/2 lg:w-1/2 min-h-[280px] md:min-h-screen relative hidden md:block overflow-hidden rounded-2xl">
          <img
            src={regImg}
            alt="Register"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/20"></div>
          <div className="absolute bottom-6 left-6 text-white max-w-xs">
            <h2 className="text-2xl lg:text-3xl font-bold">Join Our Community</h2>
            <p className="text-xs lg:text-sm mt-2">
              Connect with professionals, access premium tools, and grow your career.
            </p>
          </div>
        </div>

        {/* RIGHT FORM PANEL */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex items-center justify-center w-full md:w-1/2 md:py-5 "
        >
          <div
            className="w-full max-w-lg sm:max-w-lg lg:max-w-xl p-4 sm:p-6 rounded-2xl md: bg-white"
            style={neuStyle}
          >
            {/* Header */}
            <div className="flex flex-col items-center justify-between mb-4 space-y-4">
              <img src={Wavora} alt="logo" className="w-16 md:w-24" />
              <h2 className="text-xl font-bold text-center">Create Your Account</h2>
              <p className="text-xs text-gray-600 text-center">Fill in your details to get started</p>
            </div>

            {/* Social Auth Buttons */}
            <motion.div
              initial="hidden"
              animate="show"
              className="flex  gap-3 mb-6"
            >
              <motion.button
                variants={fieldVariants}
                custom={1}
                className="flex items-center justify-center gap-2 w-full px-4 py-2 rounded-lg border-slate-200 shadow-md transition bg-white"
              >
                <img src={Google} alt="google" className="w-6" />
                <span className="text-sm font-medium">Google</span>
              </motion.button>

              <motion.button
                variants={fieldVariants}
                custom={1.2}
                className="flex items-center justify-center gap-2 w-full px-4 py-2 rounded-lg border-slate-200 shadow-md transition bg-white"
              >
                <img src={Facebook} alt="facebook" className="w-6" />
                <span className="text-sm font-medium">Facebook</span>
              </motion.button>
            </motion.div>

            {/* Divider */}
            <div className="flex items-center gap-3 mb-4">
              <div className="flex-grow h-px bg-gray-200" />
              <div className="text-xs text-gray-500">or continue with email</div>
              <div className="flex-grow h-px bg-gray-200" />
            </div>

            {/* FORM */}
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              {/* Name */}
              <motion.div variants={fieldVariants} custom={0.8}>
                <label className="text-sm font-semibold text-gray-700">Full Name</label>
                <input
                  type="text"
                  placeholder="Enter your full name"
                  {...register("name")}
                  className={`w-full px-4 py-2 rounded-lg border ${
                    errors.name ? "border-red-500" : "border-gray-300"
                  } focus:ring-2 focus:ring-green-500 outline-none`}
                />
                {errors.name && (
                  <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>
                )}
              </motion.div>

              {/* Email */}
              <motion.div variants={fieldVariants} custom={0.9}>
                <label className="text-sm font-semibold text-gray-700">Email Address</label>
                <input
                  type="text"
                  placeholder="Enter your email"
                  {...register("email")}
                  className={`w-full px-4 py-2 rounded-lg border ${
                    errors.email ? "border-red-500" : "border-gray-300"
                  } focus:ring-2 focus:ring-green-500 outline-none`}
                />
                {errors.email && (
                  <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>
                )}
              </motion.div>

              {/* Password */}
              <motion.div variants={fieldVariants} custom={1.0}>
                <label className="text-sm font-semibold text-gray-700">Password</label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter password"
                    {...register("password")}
                    className={`w-full px-4 py-2 rounded-lg border ${
                      errors.password ? "border-red-500" : "border-gray-300"
                    } focus:ring-2 focus:ring-green-500 outline-none`}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-2.5 text-gray-600"
                  >
                    {showPassword ? <FiEyeOff size={20} /> : <FiEye size={20} />}
                  </button>
                </div>
                {errors.password && (
                  <p className="text-red-500 text-xs mt-1">{errors.password.message}</p>
                )}
              </motion.div>

              {/* Confirm Password */}
              <motion.div variants={fieldVariants} custom={1.1}>
                <label className="text-sm font-semibold text-gray-700">Confirm Password</label>
                <div className="relative">
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    placeholder="Re-enter password"
                    {...register("confirmPassword")}
                    className={`w-full px-4 py-2 rounded-lg border ${
                      errors.confirmPassword ? "border-red-500" : "border-gray-300"
                    } focus:ring-2 focus:ring-green-500 outline-none`}
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3 top-2.5 text-gray-600"
                  >
                    {showConfirmPassword ? <FiEyeOff size={20} /> : <FiEye size={20} />}
                  </button>
                </div>
                {errors.confirmPassword && (
                  <p className="text-red-500 text-xs mt-1">{errors.confirmPassword.message}</p>
                )}
              </motion.div>

              {/* Submit */}
              <motion.div variants={fieldVariants} custom={1.2}>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3 rounded-lg bg-gradient-to-r from-green-600 to-emerald-500 text-white font-semibold shadow-md hover:scale-[1.01] active:scale-100 transition"
                >
                  {isSubmitting ? "Signing up..." : "Sign Up"}
                </button>
              </motion.div>

              {/* Success Message */}
              <AnimatePresence>
                {successMessage && (
                  <motion.p
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 6 }}
                    className="text-center text-green-600 text-sm"
                  >
                    {successMessage}
                  </motion.p>
                )}
              </AnimatePresence>
            </form>

            {/* Login Link */}
            <p className="mt-4 text-center text-sm text-gray-600">
              Already have an account?{" "}
              <a href="/login" className="text-green-600 font-medium hover:underline">
                Login
              </a>
            </p>
          </div>
        </motion.div>

      </div>
    </div>
  );
}
