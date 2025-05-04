// src/components/LoginForm.tsx
import { useForm, FieldError } from "react-hook-form";
import { signInWithEmailAndPassword, auth } from "../../firebase/firebase";
import { useState } from "react";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";

interface LoginFormInputs {
  email: string;
  password: string;
}

const LoginForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormInputs>();

  const [errorMessage, setErrorMessage] = useState("");

  const onSubmit = async (data: LoginFormInputs) => {
    const { email, password } = data;
    try {
      await signInWithEmailAndPassword(auth, email, password);
      console.log("User logged in successfully!");
    } catch (error: unknown) {
      if (error instanceof Error) {
        setErrorMessage(error.message);
      } else {
        setErrorMessage("An unknown error occurred.");
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-tr from-blue-100 via-purple-100 to-pink-100 px-4 flex flex-col lg:flex-row items-center justify-center gap-10">
      {/* Lottie Animation */}
      <div className="w-full lg:w-1/2 flex justify-center items-center">
        <DotLottieReact
          src="https://lottie.host/1032048f-8992-434d-9f44-c9b613e4fe36/XoURIWIcaG.lottie"
          loop
          autoplay
          style={{ width: 250, height: 250 }}
        />
      </div>

      {/* Form Section */}
      <div className="w-full max-w-md bg-white shadow-xl rounded-2xl px-8 py-10">
        <h1 className="text-center text-3xl font-bold mb-6 text-gray-700 underline">
          Login
        </h1>
        {errorMessage && (
          <p className="text-red-600 text-sm mb-4 text-center">
            {errorMessage}
          </p>
        )}
        <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
          {/* Email */}
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                  message: "Invalid email address",
                },
              })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">
                {(errors.email as FieldError).message}
              </p>
            )}
          </div>

          {/* Password */}
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              {...register("password", {
                required: "Password is required",
              })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            {errors.password && (
              <p className="text-red-500 text-sm mt-1">
                {(errors.password as FieldError).message}
              </p>
            )}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-blue-600 text-white font-semibold py-2 rounded-lg hover:bg-blue-700 transition"
          >
            {isSubmitting ? "Logging in..." : "Login"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginForm;
