// src/components/SignUpForm.tsx
import { useForm, SubmitHandler, FieldError } from "react-hook-form";
import { createUserWithEmailAndPassword, auth } from "../../firebase/firebase";
import { useState } from "react";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";

interface IFormInput {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
  terms: boolean;
  role: "student" | "instructor";
}

const SignUpForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<IFormInput>();

  const [errorMessage, setErrorMessage] = useState("");

  const onSubmit: SubmitHandler<IFormInput> = async (data) => {
    const { email, password, role } = data;
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;
      console.log("User signed up as:", role);
      // Optionally store in Firestore here
    } catch (error: unknown) {
      if (error instanceof Error) {
        setErrorMessage(error.message);
      } else {
        setErrorMessage("An unknown error occurred.");
      }
    }
  };

  return (
    <div className="flex flex-col justify-center items-center min-h-screen bg-gradient-to-tr from-blue-100 via-purple-100 to-pink-100 px-4">
      <div className="w-full max-w-md bg-white shadow-xl rounded-2xl px-8 py-10">
        <div className="mb-6 flex justify-center">
          <DotLottieReact
            src="https://lottie.host/1032048f-8992-434d-9f44-c9b613e4fe36/XoURIWIcaG.lottie"
            loop
            autoplay
            style={{ width: 120, height: 120 }}
          />
        </div>
        <h1 className="text-center text-3xl font-bold mb-6 text-gray-700 underline">
          Sign Up
        </h1>
        {errorMessage && (
          <p className="text-red-600 text-sm mb-4 text-center">
            {errorMessage}
          </p>
        )}

        <form className="space-y-5" onSubmit={handleSubmit(onSubmit)}>
          {/* Name */}
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Name
            </label>
            <input
              type="text"
              id="name"
              {...register("name", { required: "Name is required" })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            {errors.name && (
              <p className="text-red-500 text-sm mt-1">
                {(errors.name as FieldError).message}
              </p>
            )}
          </div>

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
                minLength: {
                  value: 6,
                  message: "Password must be at least 6 characters",
                },
              })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            {errors.password && (
              <p className="text-red-500 text-sm mt-1">
                {(errors.password as FieldError).message}
              </p>
            )}
          </div>

          {/* Confirm Password */}
          <div>
            <label
              htmlFor="confirmPassword"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Retype Password
            </label>
            <input
              type="password"
              id="confirmPassword"
              {...register("confirmPassword", {
                required: "Please retype your password",
                validate: (value, { password }) =>
                  value === password || "Passwords do not match",
              })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            {errors.confirmPassword && (
              <p className="text-red-500 text-sm mt-1">
                {(errors.confirmPassword as FieldError).message}
              </p>
            )}
          </div>

          {/* Role Dropdown */}
          <div>
            <label
              htmlFor="role"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Register as
            </label>
            <select
              id="role"
              {...register("role", { required: "Please select a role" })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-blue-400"
              defaultValue=""
            >
              <option value="" disabled>
                Select a role
              </option>
              <option value="student">Student</option>
              <option value="instructor">Instructor</option>
            </select>
            {errors.role && (
              <p className="text-red-500 text-sm mt-1">
                {(errors.role as FieldError).message}
              </p>
            )}
          </div>

          {/* Terms */}
          <div className="flex items-start gap-2">
            <input
              type="checkbox"
              id="terms"
              {...register("terms", { required: "You must accept the terms" })}
              className="mt-1"
            />
            <label htmlFor="terms" className="text-sm text-gray-700">
              I accept the{" "}
              <a href="#" className="text-blue-600 underline">
                terms and conditions
              </a>
            </label>
          </div>
          {errors.terms && (
            <p className="text-red-500 text-sm">
              {(errors.terms as FieldError).message}
            </p>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-blue-600 text-white font-semibold py-2 rounded-lg hover:bg-blue-700 transition"
          >
            {isSubmitting ? "Submitting..." : "Sign Up"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default SignUpForm;
