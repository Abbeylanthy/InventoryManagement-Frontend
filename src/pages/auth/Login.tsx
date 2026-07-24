import { login } from "../../services/authService";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useForm } from "react-hook-form";
import type { LoginRequest } from "../../types/auth";

function Login() {
    const { login: saveLogin } = useAuth();

const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginRequest>();

  const onSubmit = async (data: LoginRequest) => {
  try {
    const response = await login(data);

    saveLogin(response);

    toast.success("Login Successful");

    navigate("/dashboard");
  } catch (error: any) {
  const message =
    error.response?.data?.message ?? "Login failed";

  toast.error(message);

  if (
    message.toLowerCase().includes("verify your email")
  ) {
    navigate("/verify-otp", {
      state: {
        email: data.email,
      },
    });
  }
}
};

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-100">
      <div className="w-full max-w-md bg-white rounded-xl shadow-xl p-8">

        <h1 className="text-3xl font-bold text-center text-blue-600">
          Inventory Management
        </h1>

        <p className="text-center text-gray-500 mt-2">
          Sign in to continue
        </p>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="mt-8 space-y-5"
        >

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
              <p className="text-red-500 text-sm mt-1">
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
              })}
              className="w-full border rounded-lg p-3"
            />

            {errors.password && (
              <p className="text-red-500 text-sm mt-1">
                {errors.password.message}
              </p>
            )}
          </div>

          <div className="flex justify-end">
  <button
    type="button"
    onClick={() => navigate("/forgot-password")}
    className="text-sm text-blue-600 hover:underline"
  >
    Forgot Password?
  </button>
</div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white rounded-lg py-3"
          >
            Login
          </button>

          <div className="text-center mt-6">
  <span className="text-gray-600">
    Don't have an account?{" "}
  </span>

  <button
    type="button"
    onClick={() => navigate("/register")}
    className="text-blue-600 hover:underline font-medium"
  >
    Register
  </button>
</div>

        </form>

      </div>
    </div>
  );
  
}

export default Login;