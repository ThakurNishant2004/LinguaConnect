// AuthModal.tsx
import React, { useEffect, useState } from "react";
import { X } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { createPortal } from "react-dom";

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialMode?: "login" | "signup";
  onSuccess?: (fullName?: string) => void;
}

export function AuthModal({
  isOpen,
  onClose,
  initialMode = "login",
  onSuccess,
}: AuthModalProps) {
  const [mode, setMode] = useState<"login" | "signup">(initialMode);

  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");

  const [signupFullName, setSignupFullName] = useState("");
  const [signupEmail, setSignupEmail] = useState("");
  const [signupPassword, setSignupPassword] = useState("");

  const [otpSent, setOtpSent] = useState(false);
  const [otpInput, setOtpInput] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    setMode(initialMode);
    if (!isOpen) {
      setLoginEmail("");
      setLoginPassword("");
      setSignupFullName("");
      setSignupEmail("");
      setSignupPassword("");
      setOtpSent(false);
      setOtpInput("");
      setError("");
      setLoading(false);
    }
  }, [isOpen, initialMode]);

  if (!isOpen) return null;

  return createPortal(
<div className="auth-modal fixed inset-0 z-[999999] bg-black/50 backdrop-blur-sm flex items-center justify-center">
      <div className="bg-white rounded-xl w-full max-w-md p-6 shadow-xl relative">

        <button
          className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
          onClick={onClose}
        >
          <X />
        </button>

        <h2 className="text-lg font-semibold mb-1">
          {mode === "login" ? "Login to LinguaConnect" : "Create an account"}
        </h2>

        <p className="text-sm text-gray-500 mb-4">
          {mode === "login"
            ? "Welcome back — enter your details to continue."
            : "Create an account to unlock access."}
        </p>

        {/* LOGIN */}
        {mode === "login" && (
          <div className="space-y-3">
            <Input
              placeholder="Email"
              value={loginEmail}
              onChange={(e) => setLoginEmail(e.target.value)}
            />

            <Input
              placeholder="Password"
              type="password"
              value={loginPassword}
              onChange={(e) => setLoginPassword(e.target.value)}
            />

            {error && <div className="text-red-600 text-sm">{error}</div>}

            <div className="flex gap-3 mt-4">
              <Button className="flex-1">Login</Button>
              <Button variant="outline" className="flex-1" onClick={() => setMode("signup")}>
                Create account
              </Button>
            </div>
          </div>
        )}

        {/* SIGNUP */}
        {mode === "signup" && (
          <div className="space-y-3">
            <Input
              placeholder="Full Name"
              value={signupFullName}
              onChange={(e) => setSignupFullName(e.target.value)}
            />

            <Input
              placeholder="Email"
              value={signupEmail}
              onChange={(e) => setSignupEmail(e.target.value)}
            />

            <Input
              type="password"
              placeholder="Password"
              value={signupPassword}
              onChange={(e) => setSignupPassword(e.target.value)}
            />

            {error && <div className="text-red-600 text-sm">{error}</div>}

            <div className="flex gap-3 mt-4">
              <Button className="flex-1">Send OTP</Button>

              <Button variant="outline" className="flex-1" onClick={() => setMode("login")}>
                Back to Login
              </Button>
            </div>
          </div>
        )}

      </div>
    </div>,

    document.getElementById("modal-root")!
  );
}
