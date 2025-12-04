import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ShapeBlur } from "@/components/ui/shape-blur";
import { useToast } from "@/hooks/use-toast";
import {
  Sparkles,
  Mail,
  Lock,
  ArrowRight,
  Utensils,
  Eye,
  EyeOff,
  User,
  ChefHat
} from "lucide-react";

export default function Auth() {
  const navigate = useNavigate();
  const { login, isAuthenticated } = useAuth();
  const [isSignUp, setIsSignUp] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/dashboard');
    }
  }, [isAuthenticated, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const success = await login(formData.email, formData.password);
      
      if (success) {
        toast({
          title: "Welcome back!",
          description: "Successfully logged in as Super Admin",
        });
        navigate("/dashboard");
      } else {
        toast({
          title: "Authentication failed",
          description: "Invalid credentials. Please check your email and password.",
          variant: "destructive"
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "An error occurred during login",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden">
      {/* Enchanted Background */}
      <div className="absolute inset-0" style={{ background: 'var(--gradient-nebula)' }}>
        <div className="absolute inset-0" style={{ 
          background: 'var(--gradient-hero)',
          animation: 'nebula-drift 15s ease-in-out infinite',
          backgroundSize: '200% 200%'
        }} />
        <div className="absolute inset-0 opacity-40">
          <div className="absolute top-20 left-20 w-96 h-96 rounded-full blur-3xl animate-float" 
               style={{ background: 'radial-gradient(circle, hsl(300 90% 65% / 0.6), transparent)' }} />
          <div className="absolute bottom-20 right-20 w-[500px] h-[500px] rounded-full blur-3xl animate-float" 
               style={{ 
                 background: 'radial-gradient(circle, hsl(180 100% 55% / 0.6), transparent)',
                 animationDelay: '1.5s' 
               }} />
        </div>
        
        <div className="absolute inset-0 opacity-30">
          <ShapeBlur 
            shapeSize={1.5}
            roundness={0.6}
            borderSize={0.08}
            circleSize={0.4}
            circleEdge={0.8}
          />
        </div>
      </div>

      {/* Auth Card */}
      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-md mx-auto">
          <div className="text-center mb-8 space-y-6">
            <div className="flex items-center justify-center space-x-3 mb-2 cursor-pointer" onClick={() => navigate("/")}>
              <Utensils className="h-10 w-10 text-foreground" />
              <h1 className="text-3xl font-bold text-foreground">DaddyRestro</h1>
            </div>
            
            <div className="flex justify-center">
              <Badge className="border-2 border-primary/50 px-8 py-3 backdrop-blur-md bg-primary/10 shimmer text-base font-medium">
                <Sparkles className="w-4 h-4 mr-2" />
                {isSignUp ? "Join the Enchanted Kitchen" : "Welcome Back"}
              </Badge>
            </div>
            
            <h2 className="text-4xl font-bold mt-4">
              <span className="text-gradient-primary">
                {isSignUp ? "Begin Your" : "Continue Your"}
              </span>
              <br />
              <span className="text-gradient-secondary text-3xl font-light">
                {isSignUp ? "Magical Journey" : "Culinary Adventure"}
              </span>
            </h2>
          </div>

          <Card className="card-premium p-8 space-y-6">
            <form onSubmit={handleSubmit} className="space-y-6">
              {isSignUp && (
                <div className="space-y-2">
                  <Label htmlFor="name" className="text-foreground font-medium flex items-center gap-2">
                    <User className="w-4 h-4" />
                    Full Name
                  </Label>
                  <Input
                    id="name"
                    name="name"
                    type="text"
                    placeholder="Enter your name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required={isSignUp}
                    className="h-12 rounded-2xl bg-muted/50 border-border/50 focus:border-primary transition-all"
                  />
                </div>
              )}

              <div className="space-y-2">
                <Label htmlFor="email" className="text-foreground font-medium flex items-center gap-2">
                  <Mail className="w-4 h-4" />
                  Email Address
                </Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="chef@restaurant.com"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  className="h-12 rounded-2xl bg-muted/50 border-border/50 focus:border-primary transition-all"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="password" className="text-foreground font-medium flex items-center gap-2">
                  <Lock className="w-4 h-4" />
                  Password
                </Label>
                <div className="relative">
                  <Input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter your password"
                    value={formData.password}
                    onChange={handleInputChange}
                    required
                    className="h-12 rounded-2xl bg-muted/50 border-border/50 focus:border-primary transition-all pr-12"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
              </div>

              {!isSignUp && (
                <div className="flex items-center justify-between text-sm">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input type="checkbox" className="rounded border-border" />
                    <span className="text-muted-foreground">Remember me</span>
                  </label>
                  <button type="button" className="text-primary hover:underline">
                    Forgot password?
                  </button>
                </div>
              )}

              <Button
                type="submit"
                className="w-full h-12 btn-primary text-lg"
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <Sparkles className="w-5 h-5 mr-2 animate-spin" />
                    {isSignUp ? "Creating Account..." : "Signing In..."}
                  </>
                ) : (
                  <>
                    <ChefHat className="w-5 h-5 mr-2" />
                    {isSignUp ? "Create Account" : "Sign In"}
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </>
                )}
              </Button>
            </form>

            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-border/50"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-4 bg-card text-muted-foreground">Or continue with</span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <Button
                type="button"
                variant="outline"
                className="h-11 rounded-2xl border-border/50 hover:border-primary/50 transition-all"
                onClick={() => toast({ title: "Google sign-in", description: "Feature coming soon!" })}
              >
                <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
                  <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                  <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                  <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                  <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                </svg>
                Google
              </Button>
              <Button
                type="button"
                variant="outline"
                className="h-11 rounded-2xl border-border/50 hover:border-primary/50 transition-all"
                onClick={() => toast({ title: "Apple sign-in", description: "Feature coming soon!" })}
              >
                <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.54 4.09l.01-.01zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z"/>
                </svg>
                Apple
              </Button>
            </div>
          </Card>

          <div className="text-center mt-6">
            <button
              onClick={() => setIsSignUp(!isSignUp)}
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              {isSignUp ? (
                <>
                  Already have an account?{" "}
                  <span className="text-primary font-semibold">Sign In</span>
                </>
              ) : (
                <>
                  Don't have an account?{" "}
                  <span className="text-primary font-semibold">Sign Up</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
