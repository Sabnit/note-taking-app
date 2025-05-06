import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";

import api from "../../../utils/api";

import Button from "../../atoms/Button";
import FormField from "../../molecules/FormField";

import { REGEX } from "../../../constants/regex";
import { API_ENDPOINTS } from "../../../constants/apiEndpoints";
import { ERROR_MESSAGES } from "../../../constants/errorMessages";
import { CLIENT_ROUTES } from "../../../constants/clientRoutes";

const ResetPasswordForm = () => {
  const [formData, setFormData] = useState({
    password: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isTokenValid, setIsTokenValid] = useState(false);
  const [tokenError, setTokenError] = useState("");
  const { token } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const verifyToken = async () => {
      try {
        await api.get(API_ENDPOINTS.AUTH_ROUTES.RESET_PASSWORD(token));
        setIsTokenValid(true);
      } catch (error) {
        setTokenError("Invalid or expired token");
      }
    };
    verifyToken();
  }, [token]);

  function handleChange(e) {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    // Clear error when typing
    setErrors((prev) => ({ ...prev, [name]: "" }));
  }

  function validateForm() {
    const newErrors = {};

    if (!REGEX.password.test(formData.password)) {
      newErrors.password = ERROR_MESSAGES.AUTH_FORM.PASSWORD_INVALID_PATTERN;
    }

    if (!REGEX.password.test(formData.confirmPassword)) {
      newErrors.confirmPassword =
        ERROR_MESSAGES.AUTH_FORM.PASSWORD_INVALID_PATTERN;
    }

    if (formData.password !== formData.confirmPassword) {
      newErrors.password = ERROR_MESSAGES.AUTH_FORM.PASSWORD_INCORRECT;
      newErrors.confirmPassword = ERROR_MESSAGES.AUTH_FORM.PASSWORD_INCORRECT;
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  }

  async function handleSubmit(e) {
    e.preventDefault();

    if (!validateForm()) return;

    setIsSubmitting(true);

    try {
      const data = await api.post(
        API_ENDPOINTS.AUTH_ROUTES.RESET_PASSWORD,
        formData.password
      );
      toast.success("Password has been reset");
      navigate(`${CLIENT_ROUTES.AUTH_ROUTES.LOGIN}`);
    } catch (error) {
      console.log(error);
      // toast.error(error.response.data.message);
    } finally {
      setIsSubmitting(false);
    }
  }
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-200 px-4 py-12">
      <div className="w-full max-w-md space-y-8 rounded-xl bg-white p-8 shadow-xl">
        <div>
          <h2 className="text-center text-3xl font-bold tracking-tight text-gray-900">
            Reset Password
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Enter a new password.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="mt-6 space-y-6">
          <FormField
            label="Password"
            type="password"
            id="password"
            name="password"
            value={formData.password}
            placeholder="Enter your new password"
            onChange={handleChange}
            error={errors.password}
          />

          <FormField
            label="Confirm Password"
            type="password"
            id="confirmPassword"
            name="confirmPassword"
            value={formData.confirmPassword}
            placeholder="Re-enter your new password"
            onChange={handleChange}
            error={errors.confirmPassword}
          />

          <Button
            type="submit"
            variant="primary"
            disabled={isSubmitting}
            className="w-full"
          >
            {isSubmitting ? "Resetting..." : "Reset Password"}
          </Button>
        </form>
        <div className="text-center text-sm text-gray-600">
          Go to{" "}
          <Link to={CLIENT_ROUTES.AUTH_ROUTES.LOGIN}>
            <span className="font-semibold text-orange-400 hover:text-orange-300">
              Log in
            </span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ResetPasswordForm;
