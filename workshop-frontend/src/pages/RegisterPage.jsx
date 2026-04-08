import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import api from "../services/api";
import { showSuccess, showError } from "../utils/notifications";
import Layout from "../components/Navigation/Layout";
import {
  TITLE_CHOICES,
  DEPARTMENT_CHOICES,
  STATE_CHOICES,
  SOURCE_CHOICES,
} from "../constants";

export default function RegisterPage() {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password1: "",
    password2: "",
    title: "",
    first_name: "",
    last_name: "",
    phone_number: "",
    institute: "",
    department: "",
    location: "",
    state: "",
    how_did_you_hear_about_us: "",
  });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.password1 !== formData.password2) {
      showError("Passwords do not match");
      return;
    }
    setLoading(true);
    try {
      await api.post("/auth/register/", formData);
      showSuccess(
        "Registration successful! Please check your email to activate your account.",
      );
      navigate("/login");
    } catch (error) {
      showError(error.response?.data?.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout>
      <div className="flex items-center justify-center flex-1 bg-gray-100">
        <div className="bg-white p-4 md:p-8 rounded-lg shadow-md w-full max-w-2xl mx-auto">
          <h2 className="text-2xl font-bold text-center mb-6 text-[rgb(23,162,184)]">
            Register
          </h2>
          <form onSubmit={handleSubmit}>
            {/* Username */}
            <div className="mb-4">
              <label className="block text-gray-700 mb-2">Username*</label>
              <input
                type="text"
                name="username"
                value={formData.username}
                onChange={handleChange}
                placeholder="Letters, digits, period and underscore only"
                className="w-full border rounded-lg p-4 focus:outline-none focus:border-blue-500"
                required
              />
            </div>

            {/* Email */}
            <div className="mb-4">
              <label className="block text-gray-700 mb-2">Email*</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full border rounded-lg p-4 focus:outline-none focus:border-blue-500"
                required
              />
            </div>

            {/* Password */}
            <div className="mb-4">
              <label className="block text-gray-700 mb-2">Password*</label>
              <input
                type="password"
                name="password1"
                value={formData.password1}
                onChange={handleChange}
                className="w-full border rounded-lg p-4 focus:outline-none focus:border-blue-500"
                required
              />
            </div>

            {/* Confirm Password */}
            <div className="mb-4">
              <label className="block text-gray-700 mb-2">
                Confirm Password*
              </label>
              <input
                type="password"
                name="password2"
                value={formData.password2}
                onChange={handleChange}
                className="w-full border rounded-lg p-4 focus:outline-none focus:border-blue-500"
                required
              />
            </div>

            {/* Title */}
            <div className="mb-4">
              <label className="block text-gray-700 mb-2">Title*</label>
              <select
                name="title"
                value={formData.title}
                onChange={handleChange}
                className="w-full border rounded-lg p-4 focus:outline-none focus:border-blue-500"
                required
              >
                <option value="">Select Title</option>
                {TITLE_CHOICES.map((choice) => (
                  <option key={choice.value} value={choice.value}>
                    {choice.label}
                  </option>
                ))}
              </select>
            </div>

            {/* First Name */}
            <div className="mb-4">
              <label className="block text-gray-700 mb-2">First Name*</label>
              <input
                type="text"
                name="first_name"
                value={formData.first_name}
                onChange={handleChange}
                className="w-full border rounded-lg p-4 focus:outline-none focus:border-blue-500"
                required
              />
            </div>

            {/* Last Name */}
            <div className="mb-4">
              <label className="block text-gray-700 mb-2">Last Name*</label>
              <input
                type="text"
                name="last_name"
                value={formData.last_name}
                onChange={handleChange}
                className="w-full border rounded-lg p-4 focus:outline-none focus:border-blue-500"
                required
              />
            </div>

            {/* Phone Number */}
            <div className="mb-4">
              <label className="block text-gray-700 mb-2">Phone Number*</label>
              <input
                type="text"
                name="phone_number"
                value={formData.phone_number}
                onChange={handleChange}
                placeholder="10 digits only"
                maxLength="10"
                className="w-full border rounded-lg p-4 focus:outline-none focus:border-blue-500"
                required
              />
            </div>

            {/* Institute */}
            <div className="mb-4">
              <label className="block text-gray-700 mb-2">Institute*</label>
              <input
                type="text"
                name="institute"
                value={formData.institute}
                onChange={handleChange}
                placeholder="Full name of your Institute/Organization"
                className="w-full border rounded-lg p-4 focus:outline-none focus:border-blue-500"
                required
              />
            </div>

            {/* Department */}
            <div className="mb-4">
              <label className="block text-gray-700 mb-2">Department*</label>
              <select
                name="department"
                value={formData.department}
                onChange={handleChange}
                className="w-full border rounded-lg p-4 focus:outline-none focus:border-blue-500"
                required
              >
                <option value="">Select Department</option>
                {DEPARTMENT_CHOICES.map((choice) => (
                  <option key={choice.value} value={choice.value}>
                    {choice.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Location */}
            <div className="mb-4">
              <label className="block text-gray-700 mb-2">Location*</label>
              <input
                type="text"
                name="location"
                value={formData.location}
                onChange={handleChange}
                placeholder="Place/City"
                className="w-full border rounded-lg p-4 focus:outline-none focus:border-blue-500"
                required
              />
            </div>

            {/* State */}
            <div className="mb-4">
              <label className="block text-gray-700 mb-2">State*</label>
              <select
                name="state"
                value={formData.state}
                onChange={handleChange}
                className="w-full border rounded-lg p-4 focus:outline-none focus:border-blue-500"
                required
              >
                {STATE_CHOICES.map((choice) => (
                  <option key={choice.value} value={choice.value}>
                    {choice.label}
                  </option>
                ))}
              </select>
            </div>

            {/* How did you hear about us */}
            <div className="mb-6">
              <label className="block text-gray-700 mb-2">
                How did you hear about us?*
              </label>
              <select
                name="how_did_you_hear_about_us"
                value={formData.how_did_you_hear_about_us}
                onChange={handleChange}
                className="w-full border rounded-lg p-4 focus:outline-none focus:border-blue-500"
                required
              >
                <option value="">Select Option</option>
                {SOURCE_CHOICES.map((choice) => (
                  <option key={choice.value} value={choice.value}>
                    {choice.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-500 text-white py-4 rounded-lg hover:bg-blue-600 disabled:opacity-50 font-semibold"
            >
              {loading ? "Registering..." : "Register"}
            </button>
          </form>

          <p className="text-center mt-4 text-gray-600">
            Already have an account?{" "}
            <Link
              to="/login"
              className="text-[rgb(23,162,184)] hover:underline"
            >
              Login
            </Link>
          </p>
        </div>
      </div>
    </Layout>
  );
}
