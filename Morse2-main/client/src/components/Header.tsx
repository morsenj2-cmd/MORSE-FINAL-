import { SignInButton, useUser } from "@clerk/clerk-react";
import { Button } from "@/components/ui/button";
import { Link, useLocation } from "wouter";
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";

export const Header = (): JSX.Element => {
  const [location, setLocation] = useLocation();
  const { isSignedIn } = useUser();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  const navLinks = [
    { label: "about us", href: "/about" },
    { label: "pricing", href: "/pricing" },
    { label: "blog", href: "/blog" },
  ];

  useEffect(() => {
    if (isSignedIn) {
      setLocation("/dashboard", { replace: true });
    }
  }, [isSignedIn, setLocation]);

  if (isSignedIn) {
    return <></>;
  }

  return (
    <header className="w-full px-4 sm:px-8 py-4 sm:py-6">
      <div className="flex items-center justify-between">
        <Link href="/">
          <div className="text-white text-3xl sm:text-5xl font-bold cursor-pointer" style={{ fontFamily: "'Arimo', sans-serif" }}>
            .--.
          </div>
        </Link>

        <nav className="hidden sm:flex items-center gap-12">
          {navLinks.map((link, index) => (
            <Link key={index} href={link.href}>
              <span
                className={`text-white text-base font-normal hover:opacity-80 transition-opacity cursor-pointer ${
                  location === link.href ? "underline underline-offset-4" : ""
                }`}
              >
                {link.label}
              </span>
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <SignInButton mode="modal">
            <Button
              variant="outline"
              className="bg-gray-700 text-white border-gray-600 hover:bg-gray-600 rounded-full px-4 sm:px-6 h-auto py-2 text-sm sm:text-base"
            >
              log in/sign up
            </Button>
          </SignInButton>

          <button
            className="sm:hidden text-white p-1"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {mobileMenuOpen && (
        <nav className="sm:hidden flex flex-col gap-4 pt-4 pb-2">
          {navLinks.map((link, index) => (
            <Link key={index} href={link.href}>
              <span
                className={`text-white text-base font-normal hover:opacity-80 transition-opacity cursor-pointer ${
                  location === link.href ? "underline underline-offset-4" : ""
                }`}
                onClick={() => setMobileMenuOpen(false)}
              >
                {link.label}
              </span>
            </Link>
          ))}
        </nav>
      )}
    </header>
  );
};
