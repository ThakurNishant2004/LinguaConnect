// AuthModal.tsx
import React, { useEffect, useState } from "react";
import { X } from "lucide-react";
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
  const [mounted, setMounted] = useState(false);
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

  useEffect(() => setMounted(true), []);

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

  // lock body scroll while modal open
  useEffect(() => {
    if (!isOpen) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [isOpen]);

  useEffect(() => {
  if (!isOpen) return;
  // add class and mark main app as hidden for screen readers
  document.body.classList.add("modal-open");
  document.getElementById("root")?.setAttribute("aria-hidden", "true");
  return () => {
    document.body.classList.remove("modal-open");
    document.getElementById("root")?.removeAttribute("aria-hidden");
  };
}, [isOpen]);


  if (!isOpen || !mounted) return null;

  const target = document.getElementById("modal-root") ?? document.body;

  const validateEmail = (email: string) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const handleLogin = async () => {
    setError("");
    if (!validateEmail(loginEmail)) {
      setError("Please enter a valid email.");
      return;
    }
    if (!loginPassword || loginPassword.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }
    setLoading(true);
    try {
      await new Promise((r) => setTimeout(r, 600)); // simulate
      onSuccess?.(); // notify parent
      onClose();
    } finally {
      setLoading(false);
    }
  };

  const handleSendOtp = async () => {
    setError("");
    if (!signupFullName.trim()) {
      setError("Full name is required.");
      return;
    }
    if (!validateEmail(signupEmail)) {
      setError("Please enter a valid email.");
      return;
    }
    if (!signupPassword || signupPassword.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }
    setLoading(true);
    try {
      await new Promise((r) => setTimeout(r, 700)); // simulate
      setOtpSent(true);
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOtp = async () => {
    setError("");
    if (!otpInput.trim()) {
      setError("Enter the OTP sent to your email.");
      return;
    }
    if (!(otpInput === "000000" || otpInput.length >= 6)) {
      setError("Invalid OTP. Try 000000 for demo.");
      return;
    }
    setLoading(true);
    try {
      await new Promise((r) => setTimeout(r, 500));
      onSuccess?.(signupFullName.trim());
      onClose();
    } finally {
      setLoading(false);
    }
  };

  const overlay = (
    <div
      id="auth-modal-overlay"
      className="fixed inset-0 z-[2147483647] flex"
      style={{
        background: "rgba(0,0,0,0.45)",
        backdropFilter: "blur(6px)",
        WebkitBackdropFilter: "blur(6px)",
        position: "fixed",
        top: 0,
        right: 0,
        bottom: 0,
        left: 0,
      }}
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      {/* Right corner container */}
      <div
        role="dialog"
        aria-modal="true"
        className="pointer-events-auto"
        style={{
          position: "fixed",
          top: "4rem",
          right: "1.25rem",
          width: "360px",
          maxWidth: "calc(100% - 2rem)",
          borderRadius: "12px",
          background: "white",
          boxShadow: "0 10px 30px rgba(2,6,23,0.2)",
          padding: "1.25rem",
          transform: "none",
          willChange: "transform",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          aria-label="Close"
          onClick={onClose}
          style={{
            position: "absolute",
            top: 12,
            right: 12,
            background: "transparent",
            border: "none",
            cursor: "pointer",
            color: "#6b7280",
          }}
        >
          <X />
        </button>

        <h2 style={{ fontSize: "1.125rem", fontWeight: 600, marginBottom: 6 }}>
          {mode === "login" ? "Login to LinguaConnect" : "Create an account"}
        </h2>

        <p style={{ color: "#6b7280", marginBottom: 12, fontSize: "0.875rem" }}>
          {mode === "login"
            ? "Welcome back — enter your details to continue."
            : otpSent
            ? "Enter the OTP sent to your email to verify."
            : "Create an account to unlock access."}
        </p>

        {error && (
          <div style={{ color: "#dc2626", marginBottom: 10, fontSize: "0.875rem" }}>
            {error}
          </div>
        )}

        {mode === "login" ? (
          <>
            <label style={{ display: "block", marginBottom: 6, fontSize: "0.875rem" }}>
              Email
              <input
                type="email"
                value={loginEmail}
                onChange={(e) => setLoginEmail(e.target.value)}
                style={{
                  display: "block",
                  width: "100%",
                  padding: "0.5rem",
                  marginTop: 6,
                  borderRadius: 8,
                  border: "1px solid #e5e7eb",
                }}
                autoComplete="email"
              />
            </label>

            <label style={{ display: "block", marginBottom: 6, fontSize: "0.875rem" }}>
              Password
              <input
                type="password"
                value={loginPassword}
                onChange={(e) => setLoginPassword(e.target.value)}
                style={{
                  display: "block",
                  width: "100%",
                  padding: "0.5rem",
                  marginTop: 6,
                  borderRadius: 8,
                  border: "1px solid #e5e7eb",
                }}
                autoComplete="current-password"
              />
            </label>

            <div style={{ display: "flex", gap: 8, marginTop: 12 }}>
              <button
                type="button"
                onClick={handleLogin}
                disabled={loading}
                style={{
                  flex: 1,
                  padding: "0.6rem",
                  borderRadius: 8,
                  background: "#007BFF",
                  color: "white",
                  border: "none",
                  cursor: loading ? "not-allowed" : "pointer",
                }}
              >
                {loading ? "Logging in..." : "Login"}
              </button>

              <button
                type="button"
                onClick={() => {
                  setMode("signup");
                  setError("");
                  setOtpSent(false);
                }}
                disabled={loading}
                style={{
                  flex: 1,
                  padding: "0.6rem",
                  borderRadius: 8,
                  background: "transparent",
                  border: "1px solid #d1d5db",
                  color: "#111827",
                  cursor: loading ? "not-allowed" : "pointer",
                }}
              >
                Create account
              </button>
            </div>
          </>
        ) : (
          <>
            {!otpSent ? (
              <>
                <label style={{ display: "block", marginBottom: 6, fontSize: "0.875rem" }}>
                  Full Name
                  <input
                    value={signupFullName}
                    onChange={(e) => setSignupFullName(e.target.value)}
                    style={{
                      display: "block",
                      width: "100%",
                      padding: "0.5rem",
                      marginTop: 6,
                      borderRadius: 8,
                      border: "1px solid #e5e7eb",
                    }}
                    autoComplete="name"
                  />
                </label>

                <label style={{ display: "block", marginBottom: 6, fontSize: "0.875rem" }}>
                  Email
                  <input
                    type="email"
                    value={signupEmail}
                    onChange={(e) => setSignupEmail(e.target.value)}
                    style={{
                      display: "block",
                      width: "100%",
                      padding: "0.5rem",
                      marginTop: 6,
                      borderRadius: 8,
                      border: "1px solid #e5e7eb",
                    }}
                    autoComplete="email"
                  />
                </label>

                <label style={{ display: "block", marginBottom: 6, fontSize: "0.875rem" }}>
                  Password
                  <input
                    type="password"
                    value={signupPassword}
                    onChange={(e) => setSignupPassword(e.target.value)}
                    style={{
                      display: "block",
                      width: "100%",
                      padding: "0.5rem",
                      marginTop: 6,
                      borderRadius: 8,
                      border: "1px solid #e5e7eb",
                    }}
                    autoComplete="new-password"
                  />
                </label>

                <div style={{ display: "flex", gap: 8, marginTop: 12 }}>
                  <button
                    type="button"
                    onClick={handleSendOtp}
                    disabled={loading}
                    style={{
                      flex: 1,
                      padding: "0.6rem",
                      borderRadius: 8,
                      background: "#007BFF",
                      color: "white",
                      border: "none",
                      cursor: loading ? "not-allowed" : "pointer",
                    }}
                  >
                    {loading ? "Sending..." : "Send OTP"}
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      setMode("login");
                      setError("");
                      setOtpSent(false);
                    }}
                    disabled={loading}
                    style={{
                      flex: 1,
                      padding: "0.6rem",
                      borderRadius: 8,
                      background: "transparent",
                      border: "1px solid #d1d5db",
                      color: "#111827",
                      cursor: loading ? "not-allowed" : "pointer",
                    }}
                  >
                    Back to Login
                  </button>
                </div>
              </>
            ) : (
              <>
                <label style={{ display: "block", marginBottom: 6, fontSize: "0.875rem" }}>
                  Enter OTP (try 000000)
                  <input
                    value={otpInput}
                    onChange={(e) => setOtpInput(e.target.value)}
                    style={{
                      display: "block",
                      width: "100%",
                      padding: "0.5rem",
                      marginTop: 6,
                      borderRadius: 8,
                      border: "1px solid #e5e7eb",
                    }}
                  />
                </label>

                <div style={{ display: "flex", gap: 8, marginTop: 12 }}>
                  <button
                    type="button"
                    onClick={handleVerifyOtp}
                    disabled={loading}
                    style={{
                      flex: 1,
                      padding: "0.6rem",
                      borderRadius: 8,
                      background: "#007BFF",
                      color: "white",
                      border: "none",
                      cursor: loading ? "not-allowed" : "pointer",
                    }}
                  >
                    {loading ? "Verifying..." : "Verify OTP"}
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      setOtpSent(false);
                      setOtpInput("");
                    }}
                    disabled={loading}
                    style={{
                      flex: 1,
                      padding: "0.6rem",
                      borderRadius: 8,
                      background: "transparent",
                      border: "1px solid #d1d5db",
                      color: "#111827",
                      cursor: loading ? "not-allowed" : "pointer",
                    }}
                  >
                    Resend
                  </button>
                </div>
              </>
            )}
          </>
        )}
      </div>
    </div>
  );

  return createPortal(overlay, target);
}
