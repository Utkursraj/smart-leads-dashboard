import type { ReactNode } from "react";
import { Link, useNavigate } from "react-router-dom";
import { LogOut, Sparkles } from "lucide-react";

import { Button } from "../components/ui/Button";

interface DashboardLayoutProps {
  children: ReactNode;
}

export const DashboardLayout = ({ children }: DashboardLayoutProps) => {
  const navigate = useNavigate();
  const token = localStorage.getItem("smart_leads_token");
  const isLoggedIn = Boolean(token);

  const handleLogout = () => {
    localStorage.removeItem("smart_leads_token");
    localStorage.removeItem("smart_leads_user");
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <header className="sticky top-0 z-20 border-b border-slate-200 bg-white/90 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4">
          <Link to="/" className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-600 text-white">
              <Sparkles size={20} />
            </div>

            <div>
              <h1 className="text-lg font-bold leading-none text-slate-900">
                GigFlow
              </h1>
              <p className="mt-1 text-xs text-slate-500">
                Smart Lead Management
              </p>
            </div>
          </Link>

          <div className="flex items-center gap-3">
            {!isLoggedIn ? (
              <>
                <Link to="/login">
                  <Button variant="secondary">Login</Button>
                </Link>

                <Link to="/register">
                  <Button>Register</Button>
                </Link>
              </>
            ) : (
              <Button variant="secondary" onClick={handleLogout}>
                <span className="flex items-center gap-2">
                  <LogOut size={16} />
                  Logout
                </span>
              </Button>
            )}
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-4 py-8">{children}</main>
    </div>
  );
};