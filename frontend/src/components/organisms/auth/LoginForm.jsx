import { useContext, useState } from "react";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";

import FormField from "../../molecules/FormField";
import Button from "../../atoms/Button";
import { ERROR_MESSAGES } from "../../../constants/errorMessages";
import { API_ENDPOINTS } from "../../../constants/apiEndpoints";
import { login } from "../../../services/authService";
import { AuthContext } from "../../../context/AuthContext";
import { getCurrentUser } from "../../../services/user";
import { CLIENT_ROUTES } from "../../../constants/clientRoutes";

const LoginForm = () => {
  const navigate = useNavigate();
  const { setUser, setIsAuthenticated } = useContext(AuthContext);

  // Initialize states
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Handle form input data
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    // Clear error when typing
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  // Validate form before submitting
  const validateForm = () => {
    const newErrors = {};

    if (!formData.email) {
      newErrors.email = ERROR_MESSAGES.AUTH_FORM.FORM.EMAIL_REQUIRED;
    }
    if (!formData.password) {
      newErrors.password = ERROR_MESSAGES.AUTH_FORM.PASSWORD_REQUIRED;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle form submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsSubmitting(true);
    try {
      // Login
      await login(formData);

      // Using cookies -  accessToken we fetch the user profile
      const userResponse = await getCurrentUser();
      setUser(userResponse.data);
      setIsAuthenticated(true);

      toast.success("Login successful! Welcome.");

      navigate(`${CLIENT_ROUTES.APP_ROUTE.NOTES}`);
    } catch (error) {
      // toast.error(error.response.data.message);
      console.log("error found", error);
    } finally {
      setIsSubmitting(false);
      setFormData({
        email: "",
        password: "",
      });
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-200 px-4 py-12">
      <div className="w-full max-w-md space-y-8 rounded-xl bg-white p-8 shadow-xl">
        <div>
          <h2 className="text-center text-3xl font-bold tracking-tight text-gray-500">
            Welcome back to <span className="text-orange-400">Notezy</span>
          </h2>
          <p className="mt-2 text-center text-sm text-gray-400">
            Sign in to stay on top of your notes
          </p>
        </div>

        <form onSubmit={handleSubmit} className="mt-6 space-y-6">
          <FormField
            label="Email"
            type="email"
            id="email"
            name="email"
            value={formData.email}
            placeholder="Enter your email"
            onChange={handleChange}
            error={errors.email}
          />
          <FormField
            label="Password"
            type="password"
            id="password"
            name="password"
            value={formData.password}
            placeholder="Enter your password"
            onChange={handleChange}
            error={errors.password}
          />

          <div className="flex items-center justify-between">
            <label className="flex items-center">
              <input
                id="remember"
                type="checkbox"
                className="h-4 w-4 text-orange-500 border-gray-300 rounded"
              />
              <span className="ml-2 text-sm text-gray-600">Remember me</span>
            </label>
            <Link to={CLIENT_ROUTES.AUTH_ROUTES.FORGOT_PASSWORD}>
              <span className="font-semibold text-orange-400 hover:text-orange-300">
                Forgot password?
              </span>
            </Link>
          </div>

          <Button type="submit" variant="primary" disabled={isSubmitting}>
            {isSubmitting ? "Logging in..." : "Log In"}
          </Button>

          <div className="text-center text-sm text-gray-600">
            Don’t have an account?{" "}
            <Link to={CLIENT_ROUTES.AUTH_ROUTES.SIGNUP}>
              <span className="font-semibold text-orange-400 hover:text-orange-300">
                Sign up
              </span>
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginForm;
