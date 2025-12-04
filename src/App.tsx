import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "next-themes";
import { lazy, Suspense } from "react";
import { AuthProvider } from "@/contexts/AuthContext";

// Lazy load route components for code splitting
const Index = lazy(() => import("./pages/Index"));
const Kitchen = lazy(() => import("./pages/Kitchen"));
const Inventory = lazy(() => import("./pages/Inventory"));
const Auth = lazy(() => import("./pages/Auth"));
const Dashboard = lazy(() => import("./pages/Dashboard"));
const StaffPanel = lazy(() => import("./pages/StaffPanel"));
const NotFound = lazy(() => import("./pages/NotFound"));

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
      <AuthProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Suspense fallback={
              <div className="min-h-screen flex items-center justify-center bg-background">
                <div className="text-center space-y-4">
                  <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto" />
                  <p className="text-muted-foreground">Loading...</p>
                </div>
              </div>
            }>
              <Routes>
                <Route path="/" element={<Index />} />
                <Route path="/auth" element={<Auth />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/kitchen" element={<Kitchen />} />
                <Route path="/inventory" element={<Inventory />} />
                <Route path="/staff" element={<StaffPanel />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </Suspense>
          </BrowserRouter>
        </TooltipProvider>
      </AuthProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
