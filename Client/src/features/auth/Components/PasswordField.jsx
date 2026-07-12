import React, { useState, forwardRef } from "react";
import { Eye, EyeOff } from "lucide-react";
import Input from "../../../components/ui/Input";

/**
 * PasswordField.jsx
 * Reusable password input with integrated show/hide toggle.
 * Forwards all props to the base Input component.
 */
const PasswordField = forwardRef((props, ref) => {
    const [showPassword, setShowPassword] = useState(false);

    const toggleVisibility = () => {
        setShowPassword((prev) => !prev);
    };

    const Icon = showPassword ? EyeOff : Eye;

    return (
        <Input
            type={showPassword ? "text" : "password"}
            ref={ref}
            rightIcon={
                <button
                    type="button"
                    onClick={toggleVisibility}
                    className="text-slate-400 hover:text-slate-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 rounded p-1 transition-colors"
                    aria-label={
                        showPassword ? "Hide password" : "Show password"
                    }
                    aria-pressed={showPassword}
                >
                    <Icon className="w-5 h-5" aria-hidden="true" />
                </button>
            }
            {...props}
        />
    );
});

PasswordField.displayName = "PasswordField";

export default PasswordField;
