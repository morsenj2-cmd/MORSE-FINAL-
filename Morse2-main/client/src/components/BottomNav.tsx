import { UserButton } from "@clerk/clerk-react";
import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Menu, X, Home, MessageSquare, Users, User, Radio, Rocket } from "lucide-react";
import { useState, useRef, useEffect } from "react";

interface BottomNavProps {
  activePage?: string;
}

export const BottomNav = ({ activePage }: BottomNavProps): JSX.Element => {
  const [location] = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  const hamburgerItems = [
    { name: "Broadcast", path: "/broadcast", icon: Radio },
    { name: "New launches", path: "/launches", icon: Rocket },
  ];

  const directTabs = [
    { name: "Home", path: "/dashboard", icon: Home },
    { name: "Messages", path: "/messages", icon: MessageSquare },
    { name: "Communities", path: "/communities", icon: Users },
  ];

  const isActive = (path: string) => {
    return activePage === path || location === path;
  };

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setMenuOpen(false);
      }
    };
    if (menuOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [menuOpen]);

  const isHamburgerActive = hamburgerItems.some((item) => isActive(item.path));

  return (
    <>
      <footer className="fixed bottom-0 left-0 right-0 z-50 bg-[#1a1a1a] w-full border-t border-gray-800">
        {/* Mobile bottom nav */}
        <div className="sm:hidden flex items-center justify-around px-1 py-2 relative">
          {/* Hamburger */}
          <div ref={menuRef} className="relative">
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className={`flex flex-col items-center gap-0.5 px-2 py-1 rounded-lg transition-colors ${
                isHamburgerActive ? "text-teal-400" : "text-gray-400"
              }`}
            >
              {menuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              <span className="text-[10px]">More</span>
            </button>

            {menuOpen && (
              <div
                className="absolute bottom-full mb-2 left-0 rounded-xl border border-white/15 px-4 py-3 flex flex-col gap-3 min-w-[160px] shadow-lg"
                style={{
                  background: "rgba(30, 30, 30, 0.7)",
                  backdropFilter: "blur(12px)",
                  WebkitBackdropFilter: "blur(12px)",
                }}
              >
                {hamburgerItems.map((item) => (
                  <Link key={item.name} href={item.path}>
                    <div
                      className={`flex items-center gap-3 px-2 py-2 rounded-lg transition-colors cursor-pointer ${
                        isActive(item.path) ? "text-teal-400 bg-white/10" : "text-white hover:bg-white/5"
                      }`}
                      onClick={() => setMenuOpen(false)}
                    >
                      <item.icon className="w-5 h-5" />
                      <span className="text-sm">{item.name}</span>
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </div>

          {/* Home */}
          <Link href="/dashboard">
            <div className={`flex flex-col items-center gap-0.5 px-2 py-1 rounded-lg transition-colors ${
              isActive("/dashboard") ? "text-teal-400" : "text-gray-400"
            }`}>
              <Home className="w-5 h-5" />
              <span className="text-[10px]">Home</span>
            </div>
          </Link>

          {/* Messages */}
          <Link href="/messages">
            <div className={`flex flex-col items-center gap-0.5 px-2 py-1 rounded-lg transition-colors ${
              isActive("/messages") ? "text-teal-400" : "text-gray-400"
            }`}>
              <MessageSquare className="w-5 h-5" />
              <span className="text-[10px]">Messages</span>
            </div>
          </Link>

          {/* Communities */}
          <Link href="/communities">
            <div className={`flex flex-col items-center gap-0.5 px-2 py-1 rounded-lg transition-colors ${
              isActive("/communities") ? "text-teal-400" : "text-gray-400"
            }`}>
              <Users className="w-5 h-5" />
              <span className="text-[10px]">Groups</span>
            </div>
          </Link>

          {/* Profile */}
          <Link href="/profile">
            <div className={`flex flex-col items-center gap-0.5 px-2 py-1 rounded-lg transition-colors ${
              isActive("/profile") ? "text-teal-400" : "text-gray-400"
            }`}>
              <User className="w-5 h-5" />
              <span className="text-[10px]">Profile</span>
            </div>
          </Link>

          {/* Profile Picture */}
          <div className="flex flex-col items-center gap-0.5 px-1">
            <UserButton afterSignOutUrl="/" />
          </div>
        </div>

        {/* Desktop bottom nav - unchanged */}
        <div className="hidden sm:flex items-center justify-center px-8 py-4 gap-4">
          {[
            { name: "Broadcast", path: "/broadcast" },
            { name: "Messages", path: "/messages" },
            { name: "New launches", path: "/launches" },
            { name: "Communities", path: "/communities" },
          ].map((tab) => (
            <Link key={tab.name} href={tab.path}>
              <Button
                variant="outline"
                className={`${
                  isActive(tab.path) ? "bg-teal-700 border-teal-600" : "bg-[#3a3a3a] border-gray-600"
                } text-white hover:bg-gray-600 rounded-lg px-6 py-2 text-sm whitespace-nowrap`}
                data-testid={`button-nav-${tab.name.toLowerCase().replace(/\s/g, "-")}`}
              >
                {tab.name}
              </Button>
            </Link>
          ))}
          <Link href="/profile">
            <span
              className={`text-white cursor-pointer hover:text-gray-300 text-sm whitespace-nowrap ${
                isActive("/profile") ? "border-b-2 border-teal-500 pb-1" : ""
              }`}
              data-testid="link-profile"
            >
              Profile
            </span>
          </Link>
          <UserButton afterSignOutUrl="/" />
        </div>
      </footer>

      {/* Spacer for fixed footer */}
      <div className="h-16 sm:h-20"></div>
    </>
  );
};
