import { useLocation, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { verifyOtp, resendOtp } from "../../services/authService";

type VerifyOtpRequest = {
  otp: string;
};

export default function VerifyOtp() {
  const navigate = useNavigate();
  const location = useLocation();

  const email = location.state?.email;
  console.log(email);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<VerifyOtpRequest>();

  const onSubmit = async (data: VerifyOtpRequest) => {
    try {
      await verifyOtp(email, data.otp);

      toast.success("Email verified successfully.");

      navigate("/");
    } catch (error: any) {
      toast.error(
        error.response?.data ??
          error.response?.data?.message ??
          "Verification failed."
      );
    }
  };

  const handleResend = async () => {
    try {
      await resendOtp(email);

      toast.success("OTP sent successfully.");
    } catch (error: any) {
      toast.error(
        error.response?.data ??
          error.response?.data?.message ??
          "Unable to resend OTP."
      );
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-100">
      <div className="bg-white rounded-xl shadow-xl p-8 w-full max-w-md">

        <h1 className="text-3xl font-bold text-center text-blue-600">
          Verify Email
        </h1>

        <p className="text-center text-gray-500 mt-2">
          Enter the OTP sent to
        </p>

        <p className="text-center font-semibold mb-6">
          {email}
        </p>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-5"
        >

          <div>
            <label className="block mb-2 font-medium">
              OTP
            </label>

            <input
              {...register("otp", {
                required: "OTP is required",
              })}
              className="w-full border rounded-lg p-3"
            />

            {errors.otp && (
              <p className="text-red-500 text-sm mt-1">
                {errors.otp.message}
              </p>
            )}
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white rounded-lg py-3"
          >
            Verify OTP
          </button>

        </form>

        <button
          onClick={handleResend}
          className="w-full mt-4 text-blue-600 hover:underline"
        >
          Resend OTP
        </button>

      </div>
    </div>
  );
}