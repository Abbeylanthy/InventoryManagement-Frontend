import { useLocation, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { resetPassword } from "../../services/authService";

type ResetPasswordRequest = {
  otp: string;
  newPassword: string;
};

export default function ResetPassword() {
  const navigate = useNavigate();
  const location = useLocation();

  const email = location.state?.email;

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ResetPasswordRequest>();

  const onSubmit = async (data: ResetPasswordRequest) => {
    try {
      await resetPassword(
        email,
        data.otp,
        data.newPassword
      );

      toast.success("Password reset successful.");

      navigate("/");
    } catch (error: any) {
      toast.error(
        error.response?.data?.message ??
        "Password reset failed."
      );
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-100">
      <div className="bg-white rounded-xl shadow-xl p-8 w-full max-w-md">

        <h1 className="text-3xl font-bold text-center text-blue-600">
          Reset Password
        </h1>

        <p className="text-center text-gray-500 mt-2 mb-6">
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
              <p className="text-red-500 text-sm">
                {errors.otp.message}
              </p>
            )}
          </div>

          <div>
            <label className="block mb-2 font-medium">
              New Password
            </label>

            <input
              type="password"
              {...register("newPassword", {
                required: "New password is required",
              })}
              className="w-full border rounded-lg p-3"
            />

            {errors.newPassword && (
              <p className="text-red-500 text-sm">
                {errors.newPassword.message}
              </p>
            )}
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white rounded-lg py-3"
          >
            Reset Password
          </button>
        </form>

      </div>
    </div>
  );
}