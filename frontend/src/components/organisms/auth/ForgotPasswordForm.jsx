import React, { useState } from "react";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";

import Button from "../../atoms/Button";
import { ERROR_MESSAGES } from "../../../constants/errorMessages";
import { API_ENDPOINTS } from "../../../constants/apiEndpoints";
import api from "../../../utils/api";
import { CLIENT_ROUTES } from "../../../constants/clientRoutes";
import FormField from "../../molecules/FormField";

const ForgotPasswordForm = () => {
  const [formData, setFormData] = useState({
    email: "",
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  function handleChange(e) {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    // Clear error when typing
    setErrors((prev) => ({ ...prev, [name]: "" }));
  }

  function validateForm() {
    const newErrors = {};

    if (!formData.email) {
      newErrors.email = ERROR_MESSAGES.AUTH_FORM.EMAIL_REQUIRED;
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  }

  async function handleSubmit(e) {
    e.preventDefault();

    if (!validateForm()) return;
    setIsSubmitting(true);

    try {
      await api.post(API_ENDPOINTS.AUTH_ROUTES.FORGOT_PASSWORD, formData);
      toast.success("Reset link sent in your email");
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
          <h2 className="text-center text-3xl font-bold tracking-tight text-gray-600">
            Forgot Password?
          </h2>
          <p className="mt-2 text-center text-sm text-gray-400">
            Enter your email and we'll send you a reset link
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

          <Button
            type="submit"
            className="w-full"
            variant="primary"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Sending..." : "Send Reset Link"}
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

export default ForgotPasswordForm;
