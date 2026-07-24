import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { changePassword } from "../../services/authService";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

type ChangePasswordRequest = {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
};

export default function ChangePassword() {
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm<ChangePasswordRequest>();

  const navigate = useNavigate();
const { logout } = useAuth();

  const onSubmit = async (
    data: ChangePasswordRequest
  ) => {
    try {
      await changePassword(
        data.currentPassword,
        data.newPassword
      );

     toast.success(
  "Password changed successfully. Please log in again."
);

logout();

navigate("/login");

      reset();
    } catch (error: any) {
      toast.error(
        error.response?.data?.message ??
          "Failed to change password."
      );
    }
  };

  return (
    <div className="max-w-xl mx-auto bg-white rounded-xl shadow p-8">

      <h1 className="text-3xl font-bold mb-8">
        Change Password
      </h1>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="space-y-6"
      >

        <div>
          <label className="block mb-2 font-medium">
            Current Password
          </label>

          <input
            type="password"
            {...register("currentPassword", {
              required: "Current password is required",
            })}
            className="w-full border rounded-lg p-3"
          />

          {errors.currentPassword && (
            <p className="text-red-500 text-sm">
              {errors.currentPassword.message}
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
              minLength: {
                value: 6,
                message:
                  "Password must be at least 6 characters",
              },
            })}
            className="w-full border rounded-lg p-3"
          />

          {errors.newPassword && (
            <p className="text-red-500 text-sm">
              {errors.newPassword.message}
            </p>
          )}
        </div>

        <div>
          <label className="block mb-2 font-medium">
            Confirm Password
          </label>

          <input
            type="password"
            {...register("confirmPassword", {
              validate: (value) =>
                value === watch("newPassword") ||
                "Passwords do not match",
            })}
            className="w-full border rounded-lg p-3"
          />

          {errors.confirmPassword && (
            <p className="text-red-500 text-sm">
              {errors.confirmPassword.message}
            </p>
          )}
        </div>

        <button
          type="submit"
          className="bg-blue-600 text-white px-6 py-3 rounded-lg"
        >
          Change Password
        </button>

      </form>

    </div>
  );
}