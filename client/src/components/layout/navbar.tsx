import { useState, useEffect } from "react";
import { useLocation, Link } from "wouter";
import { Button } from "../ui/button";
import { Sheet, SheetContent, SheetTrigger } from "../ui/sheet";
import { Menu, X, Clock } from "lucide-react";
import { formatTime } from "@/lib/utils";
import { useCaseState } from "@/hooks/use-case-state";

const Navbar = () => {
  const [location] = useLocation();
  const [isScrolled, setIsScrolled] = useState(false);
  const { timeRemaining: initialTimeRemaining, setTimeRemaining } = useCaseState(); // Assuming `setTimeRemaining` exists
  const [timeRemaining, setLocalTimeRemaining] = useState(initialTimeRemaining);

  // Check if scrolled for navbar styling
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Countdown logic
  useEffect(() => {
    const timer = setInterval(() => {
      setLocalTimeRemaining((prev) => {
        if (prev > 0) {
          const newTime = prev - 1;
          setTimeRemaining?.(newTime); // Update global state if `setTimeRemaining` exists
          return newTime;
        } else {
          clearInterval(timer); // Stop the timer when it reaches 0
          return 0;
        }
      });
    }, 1000);

    return () => clearInterval(timer); // Cleanup the timer on unmount
  }, [setTimeRemaining]);

  const navLinks = [
    { path: "/case-file", label: "CASE FILE" },
    { path: "/evidence", label: "EVIDENCE" },
    { path: "/suspects", label: "SUSPECTS" },
    { path: "/tools", label: "TOOLS" },
    { path: "/resources", label: "RESOURCES" },
  ];

  return (
    <nav className={`sticky top-0 z-50 bg-dark-200 ${isScrolled ? "shadow-md" : ""}`}>
      <div className="container mx-auto px-4 py-3">
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <Link href="/">
              <a className="flex items-center">
                <span className="text-primary text-2xl font-bold font-mono">
                  Ransom<span className="text-secondary">Track</span>
                </span>
                <span className="ml-2 px-2 py-1 text-xs font-mono bg-dark-100 rounded-md text-light-300">
                  Sim v1.0
                </span>
              </a>
            </Link>
          </div>

          <div className="hidden md:flex space-x-6 items-center">
            {navLinks.map((link) => (
              <Link key={link.path} href={link.path}>
                <a
                  className={`text-light-200 hover:text-primary transition font-medium ${
                    location === link.path ? "text-primary" : ""
                  }`}
                >
                  {link.label}
                </a>
              </Link>
            ))}
          </div>

          <div className="flex items-center space-x-4">
            <div className="flex items-center bg-dark-100 px-3 py-2 rounded-lg">
              <Clock className="text-secondary mr-2 h-4 w-4" />
              <span className="font-mono text-light-200">{formatTime(timeRemaining)}</span>
            </div>

            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="md:hidden text-light-200 hover:text-primary">
                  <Menu className="h-6 w-6" />
                </Button>
              </SheetTrigger>
              <SheetContent className="bg-dark-200 border-dark-100">
                <div className="flex flex-col space-y-4 mt-8">
                  {navLinks.map((link) => (
                    <Link key={link.path} href={link.path}>
                      <a
                        className={`text-xl font-medium ${
                          location === link.path ? "text-primary" : "text-light-200"
                        } hover:text-primary transition py-2`}
                      >
                        {link.label}
                      </a>
                    </Link>
                  ))}
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;