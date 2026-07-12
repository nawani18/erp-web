import React, { forwardRef, useState } from "react";
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { User } from "lucide-react"; // Fallback icon if no name or image is provided

/**
 * Utility function to merge tailwind classes safely.
 */
function cn(...inputs) {
    return twMerge(clsx(inputs));
}

/**
 * Extracts up to two initials from a given name string.
 * e.g. "John Doe" -> "JD", "Jane" -> "J"
 */
const getInitials = (name) => {
    if (!name) return "";
    const parts = name.trim().split(/\s+/);
    if (parts.length === 0) return "";
    if (parts.length === 1) return parts[0].charAt(0).toUpperCase();
    return (
        parts[0].charAt(0) + parts[parts.length - 1].charAt(0)
    ).toUpperCase();
};

/**
 * Reusable Avatar component for user profiles, headers, and lists.
 */
const Avatar = forwardRef(
    ({ src, alt, name, size = "md", className, ...props }, ref) => {
        const [imgError, setImgError] = useState(false);

        // Base styles ensuring it remains a perfect circle and doesn't get squished in flex containers
        const baseStyles =
            "relative inline-flex items-center justify-center shrink-0 rounded-full bg-slate-100 text-slate-600 font-medium overflow-hidden";

        // Defined size variations
        const sizes = {
            sm: "h-8 w-8 text-xs",
            md: "h-10 w-10 text-sm",
            lg: "h-12 w-12 text-base",
            xl: "h-16 w-16 text-lg",
        };

        // Calculate icon sizes dynamically based on the avatar size
        const iconSizes = {
            sm: "h-4 w-4",
            md: "h-5 w-5",
            lg: "h-6 w-6",
            xl: "h-8 w-8",
        };

        return (
            <div
                ref={ref}
                className={cn(baseStyles, sizes[size], className)}
                {...props}
            >
                {/* Render Image if src is provided and hasn't failed to load */}
                {src && !imgError ? (
                    <img
                        src={src}
                        alt={alt || name || "User Avatar"}
                        className="h-full w-full object-cover"
                        onError={() => setImgError(true)}
                    />
                ) : name ? (
                    /* Render Initials if image fails or isn't provided, but a name is */
                    <span className="uppercase tracking-wider">
                        {getInitials(name)}
                    </span>
                ) : (
                    /* Render Generic User Icon if neither src nor name is available */
                    <User
                        className={cn("text-slate-400", iconSizes[size])}
                        aria-hidden="true"
                    />
                )}
            </div>
        );
    },
);

Avatar.displayName = "Avatar";

export default Avatar;
