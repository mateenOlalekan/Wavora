// File: LoginStyled.jsx
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { motion, AnimatePresence } from "framer-motion";

import Wavora from "../../assets/Treva.svg";
import Google from "../../assets/Googleicon.svg";
import Facebook from "../../assets/Facebook.svg";
import loginImg from "../../assets/login.webp";

// Mock database
const existingUsers = ["test@example.com", "demo@wavora.com"];

const loginSchema = z.object({
  email: z.string().min(1, "Email is required").email("Invalid email format"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

const fieldVariants = {
  hidden: { opacity: 0, y: 10 },
  show: (i = 1) => ({ opacity: 1, y: 0, transition: { delay: i * 0.08 } }),
};

export default function LoginStyled() {
  const [theme, setTheme] = useState("glass");
  const [showPassword, setShowPassword] = useState(false);
  const [loginMessage, setLoginMessage] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm({ resolver: zodResolver(loginSchema) });

  const onSubmit = async (data) => {
    setLoginMessage("");
    await new Promise((res) => setTimeout(res, 900));

    if (existingUsers.includes(data.email)) {
      setLoginMessage("✅ Login successful! Redirecting...");
    } else {
      setLoginMessage("❌ Account not found. Please sign up.");
    }

    reset({ password: "" });
  };

  // Neumorphism extra shadow
  const neuStyle = {
    boxShadow:
      "12px 12px 24px rgba(14, 30, 37, 0.08), -8px -8px 18px rgba(255,255,255,0.9)",
  };

  return (
    <div className="w-full h-screen  flex  items-center justify-center">
              <div className="w-full hidden md:w-1/2 lg:w-1/2 h-screen relative md:block overflow-hidden ">
          <img
            src={loginImg}
            alt="login visual"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-black/10" />

          <div className="absolute left-6 bottom-8 text-white max-w-xs">
            <h3 className="text-2xl lg:text-3xl font-extrabold">Join Our Community</h3>
            <p className="mt-2 text-xs lg:text-sm">
              Connect — build — grow with top professionals.
            </p>
          </div>
        </div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex items-center justify-center w-full md:w-1/2 py-10 md:py-0"
        >
          <div
            className="w-full max-w-lg sm:max-w-lg lg:max-w-2xl p-6 sm:p-8 rounded-2xl"
            style={theme === "neo" ? neuStyle : {}}
          >
            {/* Header */}
            <div className="flex flex-col items-center justify-between mb-4 space-y-4">
              <img src={Wavora} alt="logo" className="w-16 md:w-24" />
              <h2 className="text-xl font-bold">Welcome Back</h2>
              <p className="text-xs text-gray-600">Login to your account</p>
            </div>

            {/* Social Auth Buttons */}
            <motion.div
              initial="hidden"
              animate="show"
              className="flex flex-col sm:flex-row gap-3 mb-6"
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
              <motion.div initial="hidden" animate="show" className="space-y-3">
                
                {/* Email */}
                <motion.div variants={fieldVariants} custom={0.9}>
                  <label className="block text-lg font-medium text-gray-700 mb-1">Email</label>
                  <input
                    type="text"
                    placeholder="you@mail.com"
                    {...register("email")}
                    className={`w-full px-4 py-3 rounded-lg border ${
                      errors.email ? "border-red-400" : "border-gray-200"
                    } bg-white/60 focus:ring-2 focus:ring-green-400 outline-none transition`}
                  />
                  {errors.email && (
                    <p className="text-xs text-red-500 mt-1">{errors.email.message}</p>
                  )}
                </motion.div>

                {/* Password */}
                <motion.div variants={fieldVariants} custom={1.05}>
                  <label className="block text-lg font-medium text-gray-700 mb-1">
                    Password
                  </label>
                  <div className="relative">
                    <input
                      type={showPassword ? "text" : "password"}
                      placeholder="••••••••"
                      {...register("password")}
                      className={`w-full px-4 py-3 rounded-lg border ${
                        errors.password ? "border-red-400" : "border-gray-200"
                      } bg-white/60 focus:ring-2 focus:ring-green-400 outline-none transition`}
                    />

                    <button
                      type="button"
                      onClick={() => setShowPassword((s) => !s)}
                      className="absolute right-3 top-3 text-gray-600 hover:text-gray-800"
                    >
                      {showPassword ? <FiEyeOff /> : <FiEye />}
                    </button>
                  </div>
                  {errors.password && (
                    <p className="text-xs text-red-500 mt-1">{errors.password.message}</p>
                  )}
                </motion.div>

                <motion.div variants={fieldVariants} custom={1.2} className="flex items-center justify-between">
                  <a href="/forgot-password" className="text-green-600 text-sm hover:underline">
                    Forgot password?
                  </a>
                  <span className="text-sm text-gray-500">Safe & Secure</span>
                </motion.div>

                {/* Submit */}
                <motion.div variants={fieldVariants} custom={1.35}>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-3 rounded-lg bg-gradient-to-r from-green-600 to-emerald-500 text-white font-semibold shadow-md hover:scale-[1.01] active:scale-100 transition"
                  >
                    {isSubmitting ? "Logging in..." : "Login"}
                  </button>
                </motion.div>

                <AnimatePresence>
                  {loginMessage && (
                    <motion.p
                      initial={{ opacity: 0, y: 6 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 6 }}
                      className={`text-center text-sm ${
                        loginMessage.startsWith("✅") ? "text-green-600" : "text-red-500"
                      }`}
                    >
                      {loginMessage}
                    </motion.p>
                  )}
                </AnimatePresence>

              </motion.div>
            </form>

            <div className="mt-2 text-center text-sm text-gray-600">
              Don't have an account?{" "}
              <a href="/login" className="text-green-600 font-medium hover:underline">
                Sign up
              </a>
            </div>
          </div>
        </motion.div>

      {/* Neumorphism shadow class */}
      <style>{`
        .shadow-neu {
          box-shadow: 10px 10px 20px rgba(14,30,37,0.06), -8px -8px 20px rgba(255,255,255,0.9);
        }
      `}</style>
    </div>
  );
}
