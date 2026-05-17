import type { ButtonHTMLAttributes, ReactNode } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant?: "primary" | "secondary" | "danger";
}

export const Button = ({
  children,
  variant = "primary",
  className = "",
  ...props
}: ButtonProps) => {
  const variants = {
    primary:
      "bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-200",
    secondary:
      "bg-slate-100 text-slate-700 hover:bg-slate-200 focus:ring-slate-200",
    danger:
      "bg-red-600 text-white hover:bg-red-700 focus:ring-red-200",
  };

  return (
    <button
      className={`rounded-lg px-4 py-2 text-sm font-semibold transition-all duration-200 hover:scale-[1.01] focus:outline-none focus:ring-4 disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:scale-100 ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};