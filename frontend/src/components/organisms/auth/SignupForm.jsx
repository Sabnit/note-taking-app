import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import Button from "../../atoms/Button";
import FormField from "../../molecules/FormField";
import { signup } from "../../../services/authService";

import { showToast } from "../../../utils/toast";

import { REGEX } from "../../../constants/regex";
import { ERROR_MESSAGES } from "../../../constants/errorMessages";
import { CLIENT_ROUTES } from "../../../constants/clientRoutes";

const SignupForm = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  function handleChange(e) {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    // Clear error when typing
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  }

  // Validate form before signup
  function validateForm() {
    const newErrors = {};

    if (!formData.firstName) {
      newErrors.firstName = ERROR_MESSAGES.AUTH_FORM.FIRST_NAME_REQUIRED;
    }
    if (!formData.lastName) {
      newErrors.lastName = ERROR_MESSAGES.AUTH_FORM.LAST_NAME_REQUIRED;
    }
    if (!formData.email) {
      newErrors.email = ERROR_MESSAGES.AUTH_FORM.EMAIL_REQUIRED;
    }
    if (!REGEX.password.test(formData.password)) {
      newErrors.password = ERROR_MESSAGES.AUTH_FORM.PASSWORD_INVALID_PATTERN;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }

  // Handle form submission
  async function handleSubmit(e) {
    e.preventDefault();

    if (!validateForm()) return;

    setIsSubmitting(true);

    try {
      const response = await signup(formData);
      showToast.success(response.message);
      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
      });
      navigate(`${CLIENT_ROUTES.AUTH_ROUTES.LOGIN}`);
    } catch (error) {
      showToast.error(error.response.data.message);
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-200 px-4 py-15">
      <div className="w-full max-w-md space-y-8 rounded-xl bg-white p-8 shadow-xl">
        <div>
          <h2 className="text-center text-3xl font-bold tracking-tight text-gray-500">
            Register in <span className="text-orange-400">Notezy</span>
          </h2>
          <p className="mt-2 text-center text-sm text-gray-400">
            Sign up to get started
          </p>
        </div>

        <form onSubmit={handleSubmit} className="mt-6 space-y-6">
          <FormField
            label="First Name"
            type="text"
            id="firstName"
            name="firstName"
            value={formData.firstName}
            placeholder="Enter your first name"
            onChange={handleChange}
            error={errors.firstName}
          />
          <FormField
            label="Last Name"
            type="text"
            id="lastName"
            name="lastName"
            value={formData.lastName}
            placeholder="Enter your last name"
            onChange={handleChange}
            error={errors.lastName}
          />
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

          <Button
            type="submit"
            variant="primary"
            disabled={isSubmitting}
            className="w-full"
          >
            {isSubmitting ? "Signing up..." : "Sign Up"}
          </Button>

          <div className="text-center text-sm text-gray-600">
            Already have an account?{" "}
            <Link to={CLIENT_ROUTES.AUTH_ROUTES.LOGIN}>
              <span className="font-semibold text-orange-400 hover:text-orange-300">
                Log in
              </span>
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignupForm;
