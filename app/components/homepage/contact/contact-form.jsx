"use client";
// @flow strict
import { isValidEmail } from "@/utils/check-email";
import axios from "axios";
import { useState } from "react";
import { TbMailForward } from "react-icons/tb";
import { toast } from "react-toastify";

function ContactForm() {
  const [error, setError] = useState({ email: false, required: false });
  const [isLoading, setIsLoading] = useState(false);
  const [userInput, setUserInput] = useState({
    name: "",
    email: "",
    message: "",
  });

  const hasRequiredFields = userInput.name && userInput.email && userInput.message;
  const hasEmailError = userInput.email && !isValidEmail(userInput.email);

  const handleSendMail = async (e) => {
    e.preventDefault();

    if (!hasRequiredFields) {
      setError({ email: false, required: true });
      return;
    }

    if (hasEmailError) {
      setError({ email: true, required: false });
      return;
    }

    setError({ email: false, required: false });

    try {
      setIsLoading(true);
      await axios.post(
        `${process.env.NEXT_PUBLIC_APP_URL}/api/contact`,
        userInput
      );

      toast.success("Gửi tin nhắn thành công!");
      setUserInput({
        name: "",
        email: "",
        message: "",
      });
    } catch (error) {
      toast.error(error?.response?.data?.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <p className="mb-5 text-xl font-medium uppercase text-[#16f2b3]">Liên hệ với tôi</p>
      <form
        onSubmit={handleSendMail}
        className="max-w-3xl rounded-lg border border-[#464c6a] p-3 text-white lg:p-5"
      >
        <p className="text-sm text-[#d3d8e8]">
          Nếu bạn có bất kỳ câu hỏi hoặc thắc mắc nào, xin vui lòng liên hệ với tôi. Tôi luôn sẵn sàng đón nhận các cơ hội công việc phù hợp với kỹ năng và sở thích của mình.
        </p>
        <div className="mt-6 flex flex-col gap-4">
          <div className="flex flex-col gap-2">
            <label htmlFor="contact-name" className="text-base">Họ và tên: </label>
            <input
              id="contact-name"
              className="w-full rounded-md border border-[#353a52] bg-[#10172d] px-3 py-2 outline-none ring-0 transition-all duration-300 focus:border-[#16f2b3] focus-visible:ring-2 focus-visible:ring-blue-400/40"
              type="text"
              maxLength="100"
              required
              aria-invalid={error.required && !userInput.name}
              aria-describedby={error.required && !userInput.name ? "contact-required-error" : undefined}
              onChange={(e) => setUserInput({ ...userInput, name: e.target.value })}
              value={userInput.name}
            />
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="contact-email" className="text-base">Email: </label>
            <input
              id="contact-email"
              className="w-full rounded-md border border-[#353a52] bg-[#10172d] px-3 py-2 outline-none ring-0 transition-all duration-300 focus:border-[#16f2b3] focus-visible:ring-2 focus-visible:ring-blue-400/40"
              type="email"
              maxLength="100"
              required
              value={userInput.email}
              aria-invalid={Boolean(error.email || (error.required && !userInput.email))}
              aria-describedby={error.email ? "contact-email-error" : error.required && !userInput.email ? "contact-required-error" : undefined}
              onChange={(e) => setUserInput({ ...userInput, email: e.target.value })}
              onBlur={() => setError({ ...error, email: Boolean(hasEmailError) })}
            />
            {error.email && (
              <p id="contact-email-error" className="text-sm text-red-400">
                Vui lòng nhập email hợp lệ!
              </p>
            )}
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="contact-message" className="text-base">Lời nhắn: </label>
            <textarea
              id="contact-message"
              className="w-full rounded-md border border-[#353a52] bg-[#10172d] px-3 py-2 outline-none ring-0 transition-all duration-300 focus:border-[#16f2b3] focus-visible:ring-2 focus-visible:ring-blue-400/40"
              maxLength="500"
              name="message"
              required
              aria-invalid={error.required && !userInput.message}
              aria-describedby={error.required && !userInput.message ? "contact-required-error" : undefined}
              onChange={(e) => setUserInput({ ...userInput, message: e.target.value })}
              rows="4"
              value={userInput.message}
            />
          </div>
          <div className="flex flex-col items-center gap-3">
            {error.required && (
              <p id="contact-required-error" className="text-sm text-red-400">
                Vui lòng điền đầy đủ thông tin!
              </p>
            )}
            <button
              className="flex items-center gap-1 rounded-full bg-gradient-to-r from-blue-500 to-violet-600 px-5 py-2.5 text-center text-xs font-medium uppercase tracking-wider text-white no-underline outline-none transition-all duration-200 ease-out hover:text-white hover:no-underline focus-visible:ring-2 focus-visible:ring-blue-400/50 disabled:cursor-not-allowed disabled:opacity-70 md:px-12 md:py-3 md:text-sm md:font-semibold"
              type="submit"
              disabled={isLoading}
            >
              {isLoading ? (
                <span>Đang gửi...</span>
              ) : (
                <span className="flex items-center gap-1">
                  Gửi tin nhắn
                  <TbMailForward size={20} aria-hidden="true" />
                </span>
              )}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default ContactForm;
