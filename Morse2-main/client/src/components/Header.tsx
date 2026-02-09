import { SignInButton, useUser } from "@clerk/clerk-react";
import { Button } from "@/components/ui/button";
import { Link, useLocation } from "wouter";
import { useEffect } from "react";

export const Header = (): JSX.Element => {
  const [location, setLocation] = useLocation();
  const { isSignedIn } = useUser();
  
  const navLinks = [
    { label: "about us", href: "/about" },
    { label: "pricing", href: "/pricing" },
    { label: "blog", href: "/blog" },
  ];

  useEffect(() => {
    if (isSignedIn) {
      // Use replace to prevent back button going to OAuth page
      setLocation("/dashboard", { replace: true });
    }
  }, [isSignedIn, setLocation]);

  if (isSignedIn) {
    return <></>;
  }

  return (
    <header className="w-full px-8 py-6 flex items-center justify-between">
      {/* Logo - .--. in Arimo font */}
      <Link href="/">
        <div className="text-white text-5xl font-bold cursor-pointer" style={{ fontFamily: "'Arimo', sans-serif" }}>
          .--.
        </div>
      </Link>

      <nav className="flex items-center gap-12">
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

      <SignInButton mode="modal">
        <Button
          variant="outline"
          className="bg-gray-700 text-white border-gray-600 hover:bg-gray-600 rounded-full px-6 h-auto py-2"
        >
          log in/sign up
        </Button>
      </SignInButton>
    </header>
  );
};
