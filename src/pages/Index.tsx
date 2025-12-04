import { lazy, Suspense } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Header } from "@/components/Header";
import { HeroSection } from "@/components/HeroSection";
import { SmoothScrollProgress } from "@/components/ui/smooth-scroll";

// Lazy load below-the-fold components
const FeaturesSection = lazy(() => import("@/components/FeaturesSection").then(m => ({ default: m.FeaturesSection })));
const InteractiveFeatures = lazy(() => import("@/components/InteractiveFeatures").then(m => ({ default: m.InteractiveFeatures })));
const InteractiveDemo = lazy(() => import("@/components/InteractiveDemo").then(m => ({ default: m.InteractiveDemo })));

const Index = () => {
  return (
    <AnimatePresence mode="wait">
      <motion.div 
        className="min-h-screen bg-background"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5 }}
      >
        <SmoothScrollProgress />
        <Header />
        <main>
          <HeroSection />
          <Suspense fallback={
            <motion.div 
              className="h-32 flex items-center justify-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              <motion.div
                className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full"
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
              />
            </motion.div>
          }>
            <FeaturesSection />
          </Suspense>
          <Suspense fallback={
            <motion.div 
              className="h-32 flex items-center justify-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              <motion.div
                className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full"
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
              />
            </motion.div>
          }>
            <InteractiveFeatures />
          </Suspense>
          <Suspense fallback={
            <motion.div 
              className="h-32 flex items-center justify-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              <motion.div
                className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full"
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
              />
            </motion.div>
          }>
            <InteractiveDemo />
          </Suspense>
        </main>
      </motion.div>
    </AnimatePresence>
  );
};

export default Index;
