import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { register as registerUser } from "../../services/authService";
import type { RegisterRequest } from "../../types/auth";

export default function Register() {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterRequest>();

  const onSubmit = async (data: RegisterRequest) => {
    try {
      await registerUser(data);

      toast.success(
        "Registration successful. Please verify your email."
      );

      navigate("/verify-otp", {
        state: {
          email: data.email,
        },
      });
    } catch (error: any) {
      toast.error(
        error.response?.data?.message ??
          "Registration failed."
      );
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-100">
      <div className="w-full max-w-3xl bg-white rounded-xl shadow-xl p-8">

        <h1 className="text-3xl font-bold text-center text-blue-600">
          Create Account
        </h1>

        <p className="text-center text-gray-500 mt-2">
          Register to continue
        </p>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="mt-8 space-y-6"
        >

          <div className="grid grid-cols-2 gap-4">

            <div>
              <label className="block mb-2 font-medium">
                First Name
              </label>

              <input
                {...register("firstName", {
                  required: "First name is required",
                })}
                className="w-full border rounded-lg p-3"
              />

              {errors.firstName && (
                <p className="text-red-500 text-sm">
                  {errors.firstName.message}
                </p>
              )}
            </div>

            <div>
              <label className="block mb-2 font-medium">
                Last Name
              </label>

              <input
                {...register("lastName", {
                  required: "Last name is required",
                })}
                className="w-full border rounded-lg p-3"
              />

              {errors.lastName && (
                <p className="text-red-500 text-sm">
                  {errors.lastName.message}
                </p>
              )}
            </div>

          </div>

          <div className="grid grid-cols-2 gap-4">

            <div>
              <label className="block mb-2 font-medium">
                Username
              </label>

              <input
                {...register("userName", {
                  required: "Username is required",
                })}
                className="w-full border rounded-lg p-3"
              />

              {errors.userName && (
                <p className="text-red-500 text-sm">
                  {errors.userName.message}
                </p>
              )}
            </div>

            <div>
              <label className="block mb-2 font-medium">
                Phone Number
              </label>

              <input
                {...register("phoneNumber", {
                  required: "Phone number is required",
                })}
                className="w-full border rounded-lg p-3"
              />

              {errors.phoneNumber && (
                <p className="text-red-500 text-sm">
                  {errors.phoneNumber.message}
                </p>
              )}
            </div>

          </div>

          <div className="grid grid-cols-2 gap-4">

            <div>
              <label className="block mb-2 font-medium">
                Email
              </label>

              <input
                type="email"
                {...register("email", {
                  required: "Email is required",
                })}
                className="w-full border rounded-lg p-3"
              />

              {errors.email && (
                <p className="text-red-500 text-sm">
                  {errors.email.message}
                </p>
              )}
            </div>

            <div>
              <label className="block mb-2 font-medium">
                Password
              </label>

              <input
                type="password"
                {...register("password", {
                  required: "Password is required",
                  minLength: {
                    value: 6,
                    message:
                      "Password must be at least 6 characters",
                  },
                })}
                className="w-full border rounded-lg p-3"
              />

              {errors.password && (
                <p className="text-red-500 text-sm">
                  {errors.password.message}
                </p>
              )}
            </div>

          </div>

          <div className="grid grid-cols-2 gap-4">

            <div>
              <label className="block mb-2 font-medium">
                Date of Birth
              </label>

              <input
                type="date"
                {...register("dateOfBirth", {
                  required: "Date of birth is required",
                })}
                className="w-full border rounded-lg p-3"
              />

              {errors.dateOfBirth && (
                <p className="text-red-500 text-sm">
                  {errors.dateOfBirth.message}
                </p>
              )}
            </div>

            <div>
              <label className="block mb-2 font-medium">
                Gender
              </label>

              <select
                {...register("gender", {
                  required: "Gender is required",
                })}
                className="w-full border rounded-lg p-3"
              >
                <option value="">Select Gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
              </select>

              {errors.gender && (
                <p className="text-red-500 text-sm">
                  {errors.gender.message}
                </p>
              )}
            </div>

          </div>

          <div>
            <label className="block mb-2 font-medium">
              Address
            </label>

            <textarea
              rows={3}
              {...register("address", {
                required: "Address is required",
              })}
              className="w-full border rounded-lg p-3"
            />

            {errors.address && (
              <p className="text-red-500 text-sm">
                {errors.address.message}
              </p>
            )}
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white rounded-lg py-3"
          >
            Register
          </button>

          <div className="text-center">
            <button
              type="button"
              onClick={() => navigate("/login")}
              className="text-blue-600 hover:underline"
            >
              Already have an account? Login
            </button>
          </div>

        </form>

      </div>
    </div>
  );
}