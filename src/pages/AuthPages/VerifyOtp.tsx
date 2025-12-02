// @ts-ignore
import OTPInput from "otp-input-react";

import { Controller, useForm } from "react-hook-form";
import logo from "@/assets/images/logo.png";
import { Link} from "react-router-dom";
import CommonButton from "../../components/common/CommonButton";

interface VerifyOtpForm {
  otp: string;
}
export default function VerifyOtp() {

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<VerifyOtpForm>();

const onSubmit = (data: VerifyOtpForm) => {
    console.log("OTP Data:", data);
};

  return (
   <div className="min-h-screen max-w-md w-full flex items-center justify-center bg-white px-4">
   <div className="w-full  flex flex-col gap-4 items-center">
      {/* Header */}
              <Link to="/" className="">
        <img src={logo} alt="" className="" />
        </Link>
      <div className=" mb-5 sm:mb-8 text-center">
        <h1 className="text-2xl font-semibold  mb-2">Verify OTP</h1>
        <p className=" text-sm">Enter the ETP code that we sent your email m******y@gmail.com,
Be careful not to share code with anyone</p>
      </div>
        <p className=" text-sm text-center">We've sent a 6-digit verification code to your email. Check your spam folder in case you didn't receive the code. </p>

      {/* Form */}
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="space-y-3 sm:space-y-6 w-full"
      >
        <Controller
          control={control}
          name="otp"
          rules={{
            required: "OTP is required",
            minLength: { value: 5, message: "OTP must be 5 digits" },
            maxLength: { value: 5, message: "OTP must be 5 digits" },
          }}
          render={({ field }) => (
            <div className="flex justify-center">
              <OTPInput
                value={field.value}
                onChange={field.onChange}
                autoFocus
                OTPLength={5}
                otpType="number"
                disabled={false}
                inputStyles={{
                  width: "3rem",
                  height: "3rem",
                  margin: "0 0.5rem",
                  fontSize: "1.5rem",
                  color: "#3b82f6",
                  borderRadius: "0.5rem",
                  border: "2px solid #d1d5db",
                  background: "#ffff dark:bg-transparent",
                  textAlign: "center",
                  outline: "none",
                }}
                focusStyles={{
                  border: "2px solid #3b82f6",
                  boxShadow: "0 0 0 3px rgba(59, 130, 256, 0.5)",
                }}
                className="otp-input-container"
              />
            </div>
          )}
        />
        {errors.otp && (
          <p className="text-center text-sm text-red-500">
            {errors.otp.message}
          </p>
        )}
        {/* Submit Button */}
          <CommonButton className="w-full flex items-center justify-center bg-Primary hover:bg-cyan-800 text-white rounded-lg py-2 font-medium mt-4">
        Verify Code
          </CommonButton>
      </form>
    </div>
    </div>
  );
}