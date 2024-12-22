
"use client";

import React, { useState } from "react";

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    phone: "",
    message: "",
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(null);
  const [error, setError] = useState(null);
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name) newErrors.name = "Name is required";
    if (!formData.email) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email is invalid";
    }
    if (!formData.subject) newErrors.subject = "Subject is required";
    if (!formData.phone) {
      newErrors.phone = "Phone is required";
    } else if (!/^\+?[0-9\s\-]+$/.test(formData.phone)) {
      newErrors.phone = "Phone number is invalid";
    }
    if (!formData.message) newErrors.message = "Message is required";
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setSuccess(null);
    setError(null);

    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      setLoading(false);
      return;
    }

    try {
      const response = await fetch("http://127.0.0.1:8000/api/contact-form", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error("Failed to submit the form.");
      }

      const data = await response.json();
      console.log("data send", data);
      setSuccess("Your message has been sent successfully!");
      setFormData({
        name: "",
        email: "",
        subject: "",
        phone: "",
        message: "",
      });
      setErrors({});
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h3 className="text-2xl font-bold uppercase relative pb-4 mb-8 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-8 after:h-0.5 after:bg-black">
        send us an email
      </h3>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Contact Form Grid */}
        <div className="grid md:grid-cols-2 gap-6">
          {/* Name Input */}
          <div className="relative">
            <input
              type="text"
              id="name"
              className="w-full border-b border-gray-300 py-2 bg-transparent focus:border-black transition-colors peer"
              placeholder=" "
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              required
            />
            <label
              htmlFor="name"
              className="absolute left-0 -top-3.5 text-gray-600 text-sm transition-all 
              peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-2
              peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm"
            >
              Name
            </label>
            {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}
          </div>

          {/* Subject Input */}
          <div className="relative">
            <input
              type="text"
              id="subject"
              className="w-full border-b border-gray-300 py-2 bg-transparent focus:border-black transition-colors peer"
              placeholder=" "
              value={formData.subject}
              onChange={(e) =>
                setFormData({ ...formData, subject: e.target.value })
              }
              required
            />
            <label
              htmlFor="subject"
              className="absolute left-0 -top-3.5 text-gray-600 text-sm transition-all 
              peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-2
              peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm"
            >
              Subject
            </label>
            {errors.subject && <p className="text-red-500 text-sm">{errors.subject}</p>}
          </div>
        </div>

        {/* Second row of inputs */}
        <div className="grid md:grid-cols-2 gap-6">
          {/* Email Input */}
          <div className="relative">
            <input
              type="email"
              id="email"
              className="w-full border-b border-gray-300 py-2 bg-transparent focus:border-black transition-colors peer"
              placeholder=" "
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
              required
            />
            <label
              htmlFor="email"
              className="absolute left-0 -top-3.5 text-gray-600 text-sm transition-all 
              peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-2
              peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm"
            >
              Email
            </label>
            {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
          </div>

          {/* Phone Input */}
          <div className="relative">
            <input
              type="tel"
              id="phone"
              className="w-full border-b border-gray-300 py-2 bg-transparent focus:border-black transition-colors peer"
              placeholder=" "
              value={formData.phone}
              onChange={(e) =>
                setFormData({ ...formData, phone: e.target.value })
              }
              required
            />
            <label
              htmlFor="phone"
              className="absolute left-0 -top-3.5 text-gray-600 text-sm transition-all 
              peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-2
              peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm"
            >
              Phone
            </label>
            {errors.phone && <p className="text-red-500 text-sm">{errors.phone}</p>}
          </div>
        </div>

        <div className="relative">
          <textarea
            id="message"
            rows={4}
            className="w-full border-b border-gray-300 py-2 bg-transparent focus:border-black transition-colors peer resize-none"
            placeholder=" "
            value={formData.message}
            onChange={(e) =>
              setFormData({ ...formData, message: e.target.value })
            }
            required
          />
          <label
            htmlFor="message"
            className="absolute left-0 -top-3.5 text-gray-600 text-sm transition-all
            peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-2
            peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm"
          >
            Message
          </label>
          {errors.message && <p className="text-red-500 text-sm">{errors.message}</p>}
        </div>

        <button
          type="submit"
          className="bg-black text-white px-8 py-3 uppercase text-sm tracking-wider hover:bg-gray-800 transition-colors"
          disabled={loading}
        >
          {loading ? "Sending..." : "Send Message"}
        </button>
      </form>

      {success && <p className="text-green-500 mt-4">{success}</p>}
      {error && <p className="text-red-500 mt-4">{error}</p>}
    </div>
  );
}