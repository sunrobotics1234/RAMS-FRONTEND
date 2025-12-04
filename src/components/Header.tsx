import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Menu, 
  X, 
  Sparkles, 
  Utensils,
  Brain,
  User,
  LogIn
} from "lucide-react";

export const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = [
    { label: "Features", href: "#features", icon: Sparkles },
    { label: "AI Analytics", href: "#analytics", icon: Brain },
    { label: "Restaurant POS", href: "#pos", icon: Utensils },
    { label: "Pricing", href: "#pricing", icon: null },
  ];

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
    setIsMobileMenuOpen(false);
  };

  return (
    <header 
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        isScrolled 
          ? 'backdrop-blur-md bg-background/80 border-b border-border/50 shadow-lg' 
          : 'bg-transparent'
      }`}
    >
      <div className="container mx-auto px-6">
        <div className="flex items-center justify-between h-16 lg:h-24">
          {/* Logo */}
          <div className="flex items-center space-x-3 group cursor-pointer" onClick={() => navigate("/")}>
            <div className="relative">
              <Utensils className="h-9 w-9 lg:h-10 lg:w-10 text-foreground group-hover:text-primary transition-colors duration-300" />
            </div>
            <div>
              <h1 className="text-xl lg:text-2xl font-bold text-foreground tracking-tight">
                DaddyRestro
              </h1>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-8">
            {navItems.map((item) => (
              <button
                key={item.label}
                onClick={() => scrollToSection(item.href)}
                className="flex items-center space-x-2 text-muted-foreground hover:text-primary transition-colors duration-200 group"
              >
                {item.icon && (
                  <item.icon className="w-4 h-4 group-hover:text-primary transition-colors duration-200" />
                )}
                <span className="font-medium">{item.label}</span>
              </button>
            ))}
          </nav>

          {/* Desktop CTA */}
          <div className="hidden lg:flex items-center space-x-4">
            <Button 
              variant="ghost" 
              size="sm" 
              className="text-muted-foreground hover:text-primary"
              onClick={() => navigate("/auth")}
            >
              <LogIn className="w-4 h-4 mr-2" />
              Sign In
            </Button>
            <Button 
              size="sm" 
              className="btn-primary"
              onClick={() => navigate("/auth")}
            >
              <User className="w-4 h-4 mr-2" />
              Get Started
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="sm"
            className="lg:hidden"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </Button>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="lg:hidden absolute top-full left-0 w-full backdrop-blur-md bg-background/95 border-b border-border/50 shadow-xl">
            <div className="p-6 space-y-6">
              <nav className="space-y-4">
                {navItems.map((item) => (
                  <button
                    key={item.label}
                    onClick={() => scrollToSection(item.href)}
                    className="flex items-center space-x-3 text-muted-foreground hover:text-primary transition-colors duration-200 p-3 rounded-xl hover:bg-muted/50 w-full text-left"
                  >
                    {item.icon && <item.icon className="w-5 h-5" />}
                    <span className="font-medium">{item.label}</span>
                  </button>
                ))}
              </nav>
              
              <div className="space-y-3 pt-4 border-t border-border/50">
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="w-full justify-start"
                  onClick={() => navigate("/auth")}
                >
                  <LogIn className="w-4 h-4 mr-2" />
                  Sign In
                </Button>
                <Button 
                  size="sm" 
                  className="w-full btn-primary"
                  onClick={() => navigate("/auth")}
                >
                  <User className="w-4 h-4 mr-2" />
                  Get Started Free
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};