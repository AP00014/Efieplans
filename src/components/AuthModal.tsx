import React, { useState, useEffect } from "react";
import {
  X,
  Mail,
  Lock,
  User,
  Eye,
  EyeOff,
  XCircle,
  AlertTriangle,
  CheckCircle,
} from "lucide-react";
import "./AuthModal.css";

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface ValidationResult {
  isValid: boolean;
  message: string;
}

interface PasswordStrength {
  score: number; // 0-4
  feedback: string[];
  color: string;
}

const AuthModal: React.FC<AuthModalProps> = ({ isOpen, onClose }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  // Validation states
  const [emailError, setEmailError] = useState<string | null>(null);
  const [emailSuccess, setEmailSuccess] = useState(false);
  const [passwordError, setPasswordError] = useState<string | null>(null);
  const [fullNameError, setFullNameError] = useState<string | null>(null);
  const [fullNameSuccess, setFullNameSuccess] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState<PasswordStrength>({
    score: 0,
    feedback: [],
    color: "#ef4444",
  });

  // Email validation
  const validateEmail = (email: string): ValidationResult => {
    if (!email.trim()) {
      return { isValid: false, message: "Email is required" };
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return { isValid: false, message: "Please enter a valid email address" };
    }

    return { isValid: true, message: "" };
  };

  // Full name validation
  const validateFullName = (fullName: string): ValidationResult => {
    if (!fullName.trim()) {
      return { isValid: false, message: "Full name is required" };
    }

    if (fullName.trim().length < 2) {
      return {
        isValid: false,
        message: "Full name must be at least 2 characters long",
      };
    }

    const nameParts = fullName.trim().split(/\s+/);
    if (nameParts.length < 2) {
      return {
        isValid: false,
        message: "Please enter both first and last name",
      };
    }

    // Check if each word starts with a capital letter
    const capitalizedParts = nameParts.map(
      (part) => part.charAt(0).toUpperCase() + part.slice(1).toLowerCase()
    );

    const expectedName = capitalizedParts.join(" ");
    if (fullName.trim() !== expectedName) {
      return {
        isValid: false,
        message: "Each word should start with a capital letter",
      };
    }

    return { isValid: true, message: "" };
  };

  // Password strength validation
  const validatePasswordStrength = (password: string): PasswordStrength => {
    const feedback: string[] = [];
    const requirements = [
      { test: password.length >= 8, label: "At least 8 characters" },
      { test: /[a-z]/.test(password), label: "One lowercase letter" },
      { test: /[A-Z]/.test(password), label: "One uppercase letter" },
      { test: /\d/.test(password), label: "One number" },
      { test: /[!@#$%^&*()_+\-=[\]{};':"\\|,.<>?/]/.test(password), label: "One special character" }
    ];

    let score = 0;
    requirements.forEach(req => {
      if (req.test) {
        score += 1;
      } else {
        feedback.push(req.label);
      }
    });

    let color = "#ef4444"; // red
    if (score >= 4) color = "#10b981"; // green
    else if (score >= 3) color = "#f59e0b"; // yellow
    else if (score >= 2) color = "#f97316"; // orange

    return { score, feedback, color };
  };

  // Real-time validation effects
  useEffect(() => {
    if (email) {
      const result = validateEmail(email);
      setEmailError(result.isValid ? null : result.message);
      setEmailSuccess(result.isValid);
    } else {
      setEmailError(null);
      setEmailSuccess(false);
    }
  }, [email]);

  useEffect(() => {
    if (password) {
      const strength = validatePasswordStrength(password);
      setPasswordStrength(strength);
      setPasswordError(
        strength.score < 4 ? "Password does not meet requirements" : null
      );
    } else {
      setPasswordError(null);
      setPasswordStrength({ score: 0, feedback: [], color: "#ef4444" });
    }
  }, [password]);


  useEffect(() => {
    if (fullName && !isLogin) {
      const result = validateFullName(fullName);
      setFullNameError(result.isValid ? null : result.message);
      setFullNameSuccess(result.isValid);
    } else {
      setFullNameError(null);
      setFullNameSuccess(false);
    }
  }, [fullName, isLogin]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccessMessage(null);

    // Comprehensive validation
    const emailValidation = validateEmail(email);
    const passwordValidation = passwordStrength.score >= 4;
    const fullNameValidation = isLogin
      ? { isValid: true, message: "" }
      : validateFullName(fullName);

    if (!emailValidation.isValid) {
      setError(emailValidation.message);
      setLoading(false);
      return;
    }

    if (!passwordValidation) {
      setError("Please ensure your password meets all requirements");
      setLoading(false);
      return;
    }

    if (!fullNameValidation.isValid) {
      setError(fullNameValidation.message);
      setLoading(false);
      return;
    }

    // Simulate API call delay
    setTimeout(() => {
      setSuccessMessage(
        isLogin ? "Login successful!" : "Account created successfully!"
      );
      setLoading(false);

      // Close modal after success
      setTimeout(() => {
        onClose();
        resetForm();
      }, 1500);
    }, 1000);
  };

  const resetForm = () => {
    setEmail("");
    setPassword("");
    setFullName("");
    setError(null);
    setSuccessMessage(null);
  };

  const switchMode = () => {
    setIsLogin(!isLogin);
    setError(null);
    setSuccessMessage(null);
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="close-button" onClick={onClose}>
          <X size={20} />
        </button>

        <div className="modal-header">
          <h2>{isLogin ? "Welcome Back" : "Join Our Community"}</h2>
          <p>{isLogin ? "Sign in to your account" : "Create your account"}</p>
        </div>

        {error && <div className="error-message">{error}</div>}

        {successMessage && (
          <div className="success-message">{successMessage}</div>
        )}

        <form onSubmit={handleSubmit} className="auth-form">
          {!isLogin && (
            <div className="input-group">
              <User className="input-icon" size={20} />
              <input
                type="text"
                placeholder="Full Name (First Last)"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                required={!isLogin}
                className={`auth-input ${fullNameError ? "error" : fullNameSuccess ? "success" : ""} ${fullNameSuccess ? "input-valid" : fullNameError ? "input-invalid" : ""}`}
                disabled={loading}
              />
              {fullNameError && (
                <div className="field-error">
                  <XCircle size={16} />
                  <span>{fullNameError}</span>
                </div>
              )}
              {fullNameSuccess && !fullNameError && (
                <div className="field-success">
                  <CheckCircle size={16} />
                  <span>Full name looks good!</span>
                </div>
              )}
            </div>
          )}

          <div className="input-group">
            <Mail className="input-icon" size={20} />
            <input
              type="email"
              placeholder="Email Address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className={`auth-input ${emailError ? "error" : emailSuccess ? "success" : ""} ${emailSuccess ? "input-valid" : emailError ? "input-invalid" : ""}`}
              disabled={loading}
            />
            {emailError && (
              <div className="field-error">
                <XCircle size={16} />
                <span>{emailError}</span>
              </div>
            )}
            {emailSuccess && !emailError && (
              <div className="field-success">
                <CheckCircle size={16} />
                <span>Email format is valid!</span>
              </div>
            )}
          </div>

          <div className="input-group">
            <Lock className="input-icon" size={20} />
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className={`auth-input ${passwordError ? "error" : ""} ${
                password && !passwordError
                  ? passwordStrength.score < 2
                    ? "password-weak"
                    : passwordStrength.score >= 2 && passwordStrength.score < 4
                    ? "password-medium"
                    : "password-strong"
                  : ""
              }`}
              disabled={loading}
            />
            <button
              type="button"
              className="password-toggle"
              onClick={() => setShowPassword(!showPassword)}
              disabled={loading}
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
            {passwordError && (
              <div className="field-error">
                <AlertTriangle size={16} />
                <span>{passwordError}</span>
              </div>
            )}
          </div>

          <button
            type="submit"
            className="auth-button primary"
            disabled={
              loading ||
              !!emailError ||
              !!passwordError ||
              (!isLogin && !!fullNameError)
            }
          >
            {loading ? "Processing..." : isLogin ? "Sign In" : "Sign Up"}
          </button>
        </form>

        <div className="auth-switch">
          <p>
            {isLogin ? "Don't have an account? " : "Already have an account? "}
            <button
              type="button"
              className="switch-button"
              onClick={switchMode}
              disabled={loading}
            >
              {isLogin ? "Sign Up" : "Sign In"}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default AuthModal;
