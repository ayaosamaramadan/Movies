import React, { useState, useRef } from "react";

import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { z } from "zod";
import emailjs from "@emailjs/browser";

const formSchema = z.object({
  name: z.string().min(1, "Name is required").max(50, "Name is too long"),
  email: z.string().email("Invalid email address"),
  message: z
    .string()
    .min(1, "Message is required")
    .max(500, "Message is too long"),
});

const Form = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isLoading, setIsLoading] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
    setErrors({ ...errors, [e.target.id]: "" });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const validationResult = formSchema.safeParse(formData);

    setIsLoading(true);
    if (!validationResult.success) {
      const fieldErrors: Record<string, string> = {};
      validationResult.error.errors.forEach((error) => {
        if (error.path[0]) {
          fieldErrors[error.path[0] as string] = error.message;
        }
      });
      setErrors(fieldErrors);
      setIsLoading(false);

      return;
    }



    if (!formRef.current) return;

    emailjs
      .sendForm(
        process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID!,
        process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID!,
        formRef.current,
        process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY
      )
      .then(
        () => {
          toast("Message sent successfully!", {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });

          setIsLoading(false);
          setFormData({ name: "", email: "", message: "" });
          setErrors({});
        },
        (error) => {
          console.error("Failed to send message:", error);
          toast.error("Failed to send message. Please try again later.", {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
          setIsLoading(false);
        }
      );
  };

  return (
    <>
      <form
        ref={formRef}
        className="text-sm md:text-base"
        onSubmit={handleSubmit}
      >
        <div className="flex flex-col mb-4">
          <input
            type="text"
            id="name"
            name="from_name"
            placeholder="Name"
            value={formData.name}
            onChange={handleChange}
            className={`playfair-display border ${
              errors.name ? "border-red-500" : "border-gray-300"
            } rounded-lg p-2 text-black font-MyFont placeholder-gray-700`}
          />
          {errors.name && (
            <p className="playfair-display text-red-500 text-sm mt-1">
              {errors.name}
            </p>
          )}
        </div>
        <div className="flex flex-col mb-4">
          <input
            type="email"
            id="email"
            name="reply_to"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            className={`playfair-display border ${
              errors.email ? "border-red-500" : "border-gray-300"
            } rounded-lg p-2 text-black placeholder-gray-700`}
          />
          {errors.email && (
            <p className="playfair-display text-red-500 text-sm mt-1">
              {errors.email}
            </p>
          )}
        </div>
        <div className="flex flex-col mb-4 playfair-display">
          <textarea
            id="message"
            name="message"
            rows={4}
            placeholder="Message"
            value={formData.message}
            onChange={handleChange}
            className={`border ${
              errors.message ? "border-red-500" : "border-gray-300"
            } rounded-lg p-2 text-black placeholder-gray-700`}
          ></textarea>
          {errors.message && (
            <p className="text-red-500 text-sm mt-1">{errors.message}</p>
          )}
        </div>

        <button
          type="submit"
          className="playfair-display w-full bg-gradient-to-r from-[#9005DE] to-[#7A04B3] text-white hover:bg-gradient-to-l focus:ring-4 focus:outline-none focus:ring-[#7A04B3] focus:ring-opacity-50 shadow-lg shadow-[#7A04B3] font-bold rounded-lg py-2 px-4 transition duration-200"
        >
          {isLoading ? (
            <>
              <svg
                aria-hidden="true"
                role="status"
                className="inline w-4 h-4 me-3 text-white animate-spin"
                viewBox="0 0 100 101"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                  fill="#E5E7EB"
                />
                <path
                  d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                  fill="currentColor"
                />
              </svg>
              Sending...
            </>
          ) : (
            "Send Message"
          )}
        </button>
      </form>
    </>
  );
};

export default Form;
