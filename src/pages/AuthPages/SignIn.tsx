import { useState } from "react";
import { useForm } from "react-hook-form";
import { Eye, EyeOff, ShieldCheck } from "lucide-react";
import logo from "@/assets/images/logo.png";
import { Link } from "react-router-dom";
import CommonButton from "../../components/common/CommonButton";

interface SignInForm {
  email: string;
  password: string;
  
}

export default function SignIn() {
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<SignInForm>();

  const passwordValue = watch("password") || "";

  const onSubmit = (data: SignInForm) => {
    console.log("Login Data:", data);
  };

  return (
    <div className="min-h-screen max-w-md w-full flex items-center justify-center bg-white px-4">
      <div className="w-full  flex flex-col items-center">

        {/* LOGO */}
        <Link to="/">
        <img  src={logo} alt="Logo" className="w-20 h-20 object-contain mb-6" />
        </Link>

        {/* TITLE */}
        <h1 className="text-3xl font-semibold text-center">
          Welcome Back 
        </h1>

        <p className="text-gray-500 text-center mt-2 mb-6">
          Login your account
        </p>

        {/* FORM */}
        <form onSubmit={handleSubmit(onSubmit)} className="w-full space-y-4">

          {/* EMAIL */}
          <div>
            <label className="text-sm font-medium">Email</label>
            <input
              type="email"
              {...register("email", { required: true })}
              className="mt-1 w-full border rounded-lg px-4 py-2 outline-none"
              placeholder="Enter your email"
            />
            {errors.email && (
              <p className="text-red-500 text-xs mt-1">Email is required.</p>
            )}
          </div>

          {/* PASSWORD */}
          <div>
            <label className="text-sm font-medium">Password</label>
            <div className="relative mt-1">
              <input
                type={showPassword ? "text" : "password"}
                {...register("password", { required: true })}
                className="w-full border rounded-lg px-4 py-2 outline-none"
                placeholder="********"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-2.5 text-gray-500"
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
              {errors.password && (
                <p className="text-red-500 text-xs mt-1">
                  Password is required.
                </p>
              )}
            </div>

            <div className="flex items-center justify-between mt-1">
              <p className="text-xs text-gray-400">
                Enter your secure password
              </p>

              {passwordValue.length >= 8 && (
                <span className="flex items-center text-green-500 text-sm">
                  <ShieldCheck size={16} className="mr-1" /> Strong
                </span>
              )}
            </div>

            {/* FORGOT PASSWORD */}
            <div className="text-right mt-2">
              <Link
                to="/auth/forget-password"
                className="text-Primary text-sm cursor-pointer"
              >
                Forgot Password?
              </Link>
            </div>
          </div>

          {/* LOGIN BUTTON */}
          <CommonButton className="w-full flex items-center justify-center bg-Primary hover:bg-cyan-800 text-white rounded-lg py-2 font-medium mt-4">
            Login
          </CommonButton>

          {/* OR WITH */}
          <div className="flex items-center mt-3 mb-3">
            <div className="h-px flex-1 bg-gray-300"></div>
            <span className="px-3 text-gray-500 text-sm">Or Login With</span>
            <div className="h-px flex-1 bg-gray-300"></div>
          </div>

          {/* GOOGLE BUTTON */}
          <CommonButton
            as="a"
            href="https://google.com"
            target="_blank"
            className="w-full flex items-center justify-center gap-3 border rounded-lg py-2 bg-gray-100 hover:bg-gray-200"
          >
            <img
              src="https://www.svgrepo.com/show/475656/google-color.svg"
              className="w-5 h-5"
            />
            Continue with Google
          </CommonButton>

          {/* REGISTER LINK */}
          <p className="text-center text-sm mt-4">
            Don't have an account?{" "}
            <Link to="/auth/sign-up" className="text-Primary cursor-pointer">
              Register
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}
