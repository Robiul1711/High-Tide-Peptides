import { useState } from "react";
import { useForm } from "react-hook-form";
import { Eye, EyeOff, ShieldCheck } from "lucide-react";
import CommonButton from "../../components/common/CommonButton";
import logo from "@/assets/images/logo.png";
import { Link } from "react-router-dom";

interface NewPasswordForm {
  password: string;
  confirmPassword: string;
}

export default function NewPasswordSet() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<NewPasswordForm>();

  const passwordValue = watch("password") || "";

  const onSubmit = (data: NewPasswordForm) => {
    console.log("New Password:", data);
  };

  return (
    <div className="min-h-screen flex w-full items-center justify-center bg-white px-4">
      <div className="w-full max-w-md  flex flex-col items-center">

        {/* LOGO */}
        <Link to="/">
        <img src={logo} alt="Logo" className="w-20 h-20 object-contain mb-6" />
        </Link>

        {/* TITLE */}
        <p className="text-3xl font-semibold text-center">
          Reset your password
        </p>

        <p className="text-gray-500 text-center mt-2 mb-6">
          Enter a new password to continue using your account
        </p>

        {/* FORM */}
        <form onSubmit={handleSubmit(onSubmit)} className="w-full space-y-4">

          {/* NEW PASSWORD */}
          <div>
            <label className="text-sm font-medium">New Password</label>
            <div className="relative mt-1">
              <input
                type={showPassword ? "text" : "password"}
                {...register("password", { required: true, minLength: 8 })}
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
                  Password must be at least 8 characters.
                </p>
              )}
            </div>

            <div className="flex items-center justify-between mt-1">
              <p className="text-xs text-gray-400">
                Must be at least 8 characters
              </p>

              {passwordValue.length >= 8 && (
                <span className="flex items-center text-green-500 text-sm">
                  <ShieldCheck size={16} className="mr-1" /> Strong
                </span>
              )}
            </div>
          </div>

          {/* CONFIRM PASSWORD */}
          <div>
            <label className="text-sm font-medium">Confirm Password</label>
            <div className="relative mt-1">
              <input
                type={showConfirm ? "text" : "password"}
                {...register("confirmPassword", { required: true })}
                className="w-full border rounded-lg px-4 py-2 outline-none"
                placeholder="********"
              />
              <button
                type="button"
                onClick={() => setShowConfirm(!showConfirm)}
                className="absolute right-3 top-2.5 text-gray-500"
              >
                {showConfirm ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>

              {errors.confirmPassword && (
                <p className="text-red-500 text-xs mt-1">
                  Confirm Password is required.
                </p>
              )}
            </div>

            <div className="flex items-center justify-between mt-1">
              <p className="text-xs text-gray-400">
                Must match your new password
              </p>

              {passwordValue.length >= 8 && (
                <span className="flex items-center text-green-500 text-sm">
                  <ShieldCheck size={16} className="mr-1" /> Strong
                </span>
              )}
            </div>
          </div>

          {/* SUBMIT BUTTON */}
          <CommonButton className="w-full flex items-center justify-center bg-Primary hover:bg-cyan-800 text-white rounded-lg py-2 font-medium mt-4">
            Save Password
          </CommonButton>

        </form>
      </div>
    </div>
  );
}
