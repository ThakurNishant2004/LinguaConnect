import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { X } from "lucide-react";

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialMode?: "login" | "signup";
  onSuccess: () => void; // 🔥 Alert LandingPage after success
}

export function AuthModal({ isOpen, onClose, initialMode = "login", onSuccess }: AuthModalProps) {
  const [mode, setMode] = useState<"login" | "signup">(initialMode);

  useEffect(() => {
    if (isOpen) setMode(initialMode);
  }, [isOpen, initialMode]);

  // ------------------ LOGIN STATE ------------------
  const [loginData, setLoginData] = useState({
    username: "",
    password: "",
  });

  const handleLogin = () => {
    // ✔ Example validation
    if (loginData.username === "demo" && loginData.password === "demo123") {
      onSuccess(); // Unlock features
    } else {
      alert("Invalid login.\nUse:\nUsername: demo\nPassword: demo123");
    }
  };

  // ------------------ SIGNUP STATE ------------------
  const [signupData, setSignupData] = useState({
    fullName: "",
    username: "",
    email: "",
    password: "",
  });

  const [showOtpPopup, setShowOtpPopup] = useState(false);
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [otpSuccess, setOtpSuccess] = useState(false);

  const sendOtp = () => {
    if (!signupData.fullName || !signupData.username || !signupData.email || !signupData.password) {
      alert("Please fill all fields before sending OTP.");
      return;
    }

    setShowOtpPopup(true);
  };

  const handleOtpChange = (value: string, index: number) => {
    if (isNaN(Number(value))) return;

    const copy = [...otp];
    copy[index] = value;
    setOtp(copy);

    if (value && index < 5) {
      const next = document.getElementById(`otp-${index + 1}`);
      next?.focus();
    }
  };

  const verifyOtp = () => {
    const finalOtp = otp.join("");

    if (finalOtp === "123456") {
      setOtpSuccess(true);

      setTimeout(() => {
        setOtpSuccess(false);
        setShowOtpPopup(false);
        onSuccess(); // 🔥 Complete signup success
      }, 1000);
    } else {
      alert("Invalid OTP! Use: 123456");
    }
  };

  // ------------------ MODAL UI (PORTAL) ------------------
  const modalContent = (
    <>
      {/* BACKDROP */}
      <div
        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[500]"
        onClick={onClose}
      />

      {/* MAIN MODAL */}
      <div className="fixed inset-0 z-[510] flex items-center justify-center p-4">
        <div
          className="bg-white rounded-2xl shadow-xl max-w-md w-full animate-fade-in"
          onClick={(e) => e.stopPropagation()}
        >
          {/* HEADER */}
          <div className="flex items-center justify-between p-6 border-b">
            <h2 className="text-xl font-semibold">
              {mode === "login" ? "Login" : "Create Account"}
            </h2>
            <button onClick={onClose} className="hover:bg-gray-200 p-1 rounded">
              <X size={20} />
            </button>
          </div>

          {/* BODY */}
          <div className="p-6">
            {/* --------------- LOGIN FORM --------------- */}
            {mode === "login" && (
              <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
                <div>
                  <label className="text-sm font-medium">Username</label>
                  <input
                    className="w-full border rounded-lg px-3 py-2"
                    value={loginData.username}
                    onChange={(e) =>
                      setLoginData({ ...loginData, username: e.target.value })
                    }
                  />
                </div>

                <div>
                  <label className="text-sm font-medium">Password</label>
                  <input
                    type="password"
                    className="w-full border rounded-lg px-3 py-2"
                    value={loginData.password}
                    onChange={(e) =>
                      setLoginData({ ...loginData, password: e.target.value })
                    }
                  />
                </div>

                {/* LOGIN BUTTON */}
                <button
                  type="button"
                  onClick={handleLogin}
                  className="w-full border border-blue-600 text-blue-600 py-2 rounded-lg hover:bg-blue-50"
                >
                  Login
                </button>

                <p className="text-center text-sm">
                  Don’t have an account?{" "}
                  <span
                    onClick={() => setMode("signup")}
                    className="text-blue-600 cursor-pointer"
                  >
                    Sign Up
                  </span>
                </p>
              </form>
            )}

            {/* --------------- SIGNUP FORM --------------- */}
            {mode === "signup" && (
              <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
                <div>
                  <label className="text-sm font-medium">Full Name</label>
                  <input
                    className="w-full border rounded-lg px-3 py-2"
                    value={signupData.fullName}
                    onChange={(e) =>
                      setSignupData({ ...signupData, fullName: e.target.value })
                    }
                  />
                </div>

                <div>
                  <label className="text-sm font-medium">Username</label>
                  <input
                    className="w-full border rounded-lg px-3 py-2"
                    value={signupData.username}
                    onChange={(e) =>
                      setSignupData({ ...signupData, username: e.target.value })
                    }
                  />
                </div>

                <div>
                  <label className="text-sm font-medium">Email</label>
                  <input
                    type="email"
                    className="w-full border rounded-lg px-3 py-2"
                    value={signupData.email}
                    onChange={(e) =>
                      setSignupData({ ...signupData, email: e.target.value })
                    }
                  />
                </div>

                <div>
                  <label className="text-sm font-medium">Password</label>
                  <input
                    type="password"
                    className="w-full border rounded-lg px-3 py-2"
                    value={signupData.password}
                    onChange={(e) =>
                      setSignupData({ ...signupData, password: e.target.value })
                    }
                  />
                </div>

                <button
                  type="button"
                  onClick={sendOtp}
                  className="w-full border border-blue-600 text-blue-600 py-2 rounded-lg hover:bg-blue-50"
                >
                  Send OTP
                </button>
              </form>
            )}
          </div>
        </div>
      </div>

      {/* OTP POPUP */}
      {showOtpPopup &&
        createPortal(
          <div className="fixed inset-0 bg-black/50 z-[600] flex items-center justify-center">
            <div className="bg-white rounded-xl shadow-lg p-6 w-80">
              <h3 className="text-xl font-semibold text-center mb-4">Enter OTP</h3>

              <div className="flex justify-between mb-4">
                {otp.map((digit, index) => (
                  <input
                    id={`otp-${index}`}
                    key={index}
                    maxLength={1}
                    value={digit}
                    onChange={(e) => handleOtpChange(e.target.value, index)}
                    className="w-10 h-12 border rounded-lg text-center text-lg"
                  />
                ))}
              </div>

              <button
                onClick={verifyOtp}
                className="w-full bg-blue-600 text-white py-2 rounded-lg"
              >
                Verify OTP
              </button>
            </div>
          </div>,
          document.body
        )}

      {/* SUCCESS POPUP */}
      {otpSuccess &&
        createPortal(
          <div className="fixed inset-0 bg-black/40 z-[700] flex items-center justify-center">
            <div className="bg-white p-4 rounded-lg text-green-600 font-semibold shadow-lg">
              ✔ Signup Completed Successfully!
            </div>
          </div>,
          document.body
        )}

      {/* Animation */}
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: scale(.95); }
          to { opacity: 1; transform: scale(1); }
        }
        .animate-fade-in { animation: fadeIn .25s ease-out; }
      `}</style>
    </>
  );

  if (!isOpen) return null;

  return createPortal(modalContent, document.body);
}
