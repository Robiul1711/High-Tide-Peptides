import { useForm } from "react-hook-form";
import logo from "@/assets/images/logo.png";
import { Link } from "react-router-dom";
import CommonButton from "../../components/common/CommonButton";

interface SignInForm {
  email: string;
  
}

export default function ForgetPassword() {

  const {
    register,
    handleSubmit,
    formState: { errors },
  
  } = useForm<SignInForm>();


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
        Reset your password
        </h1>

        <p className="text-gray-500 text-center mt-2 mb-6">
  Enter the verification code sent to your number.
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

   

          {/* LOGIN BUTTON */}
          <CommonButton className="w-full flex items-center justify-center bg-Primary hover:bg-cyan-800 text-white rounded-lg py-2 font-medium mt-4">
            Send Code
          </CommonButton>

        </form>
      </div>
    </div>
  );
}
