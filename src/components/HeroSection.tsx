import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion, useScroll, useTransform, useSpring, AnimatePresence } from "framer-motion";
import { ShapeBlur } from "@/components/ui/shape-blur";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Brain, 
  TrendingUp, 
  Shield, 
  Sparkles, 
  ArrowRight, 
  Play,
  BarChart3,
  Clock,
  Users,
  Utensils
} from "lucide-react";
import minimalDashboard from "@/assets/minimal-dashboard.jpg";

export const HeroSection = () => {
  const [isHovered, setIsHovered] = useState(false);
  const [orders, setOrders] = useState(127);
  const [avgTime, setAvgTime] = useState(8);
  const [isImageHovered, setIsImageHovered] = useState(false);
  const navigate = useNavigate();
  
  const { scrollYProgress } = useScroll();
  const smoothProgress = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });
  
  const y = useTransform(smoothProgress, [0, 1], [0, -100]);
  const opacity = useTransform(smoothProgress, [0, 0.5], [1, 0]);
  const scale = useTransform(smoothProgress, [0, 0.3], [1, 0.95]);

  // Simulate live updates
  useEffect(() => {
    const interval = setInterval(() => {
      setOrders(prev => prev + Math.floor(Math.random() * 3) - 1);
      setAvgTime(prev => Math.max(5, Math.min(12, prev + (Math.random() > 0.5 ? 1 : -1))));
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const scrollToFeatures = () => {
    const element = document.querySelector('#features');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-24 pb-12">
      {/* Enchanted Nebula Background */}
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
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 rounded-full blur-3xl animate-float" 
               style={{ 
                 background: 'radial-gradient(circle, hsl(300 90% 65% / 0.5), hsl(180 100% 55% / 0.3), transparent)',
                 animationDelay: '3s' 
               }} />
        </div>
        
        {/* Shape Blur Effect */}
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

      <motion.div 
        className="container mx-auto px-6 relative z-10"
        style={{ y, opacity, scale }}
      >
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Hero Content */}
          <motion.div 
            className="space-y-12"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          >
            {/* Magical Headline */}
            <motion.div className="space-y-6">
              <motion.h1 
                className="text-5xl lg:text-7xl font-bold leading-tight"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
              >
                <motion.span 
                  className="block text-gradient-primary mb-3 font-display tracking-tight" 
                  style={{ 
                    textShadow: 'var(--glow-primary)',
                  }}
                  animate={{ 
                    textShadow: [
                      'var(--glow-primary)',
                      '0 0 40px hsl(var(--primary) / 0.6), 0 0 80px hsl(var(--primary) / 0.3)',
                      'var(--glow-primary)'
                    ]
                  }}
                  transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                >
                  Where Magic Meets Mastery
                </motion.span>
              </motion.h1>
              <motion.p 
                className="text-xl lg:text-2xl text-muted-foreground max-w-2xl leading-relaxed font-light"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
              >
                Step into the future of culinary operations. Experience real-time orchestration that transforms your restaurant into a seamless, enchanted workspace.
              </motion.p>
            </motion.div>

            <motion.div 
              className="grid grid-cols-2 gap-3"
              initial="hidden"
              animate="visible"
              variants={{
                hidden: { opacity: 0 },
                visible: {
                  opacity: 1,
                  transition: {
                    delayChildren: 0.6,
                    staggerChildren: 0.1
                  }
                }
              }}
            >
              {[
                { icon: Clock, label: "Orders", color: "text-foreground" },
                { icon: Users, label: "Staff", color: "text-foreground" },
                { icon: BarChart3, label: "Reports", color: "text-foreground" },
                { icon: Utensils, label: "Menu", color: "text-foreground" }
              ].map((feature, index) => (
                <motion.div 
                  key={index}
                  variants={{
                    hidden: { opacity: 0, y: 20, scale: 0.8 },
                    visible: { 
                      opacity: 1, 
                      y: 0, 
                      scale: 1,
                      transition: { type: "spring", stiffness: 100, damping: 12 }
                    }
                  }}
                  whileHover={{ scale: 1.05, transition: { duration: 0.2 } }}
                  whileTap={{ scale: 0.95 }}
                  className="flex items-center gap-3 p-4 rounded-2xl bg-muted/30 hover:bg-muted/50 transition-colors cursor-pointer"
                >
                  <motion.div
                    animate={{ rotate: [0, 5, -5, 0] }}
                    transition={{ duration: 2, repeat: Infinity, delay: index * 0.2 }}
                  >
                    <feature.icon className={`w-5 h-5 ${feature.color}`} />
                  </motion.div>
                  <p className="text-sm font-medium">{feature.label}</p>
                </motion.div>
              ))}
            </motion.div>

            <motion.div 
              className="flex flex-col sm:flex-row gap-6 mt-12"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8, ease: [0.22, 1, 0.36, 1] }}
            >
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button 
                  size="lg" 
                  className="btn-primary"
                  onMouseEnter={() => setIsHovered(true)}
                  onMouseLeave={() => setIsHovered(false)}
                  onClick={() => navigate("/auth")}
                >
                  <motion.div
                    animate={{ rotate: [0, 360] }}
                    transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                  >
                    <Sparkles className="w-6 h-6 mr-3" />
                  </motion.div>
                  Begin Your Journey
                  <motion.div
                    animate={{ x: isHovered ? 8 : 0 }}
                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                  >
                    <ArrowRight className="w-6 h-6 ml-3" />
                  </motion.div>
                </Button>
              </motion.div>
              
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button 
                  size="lg" 
                  className="btn-glass"
                  onClick={scrollToFeatures}
                >
                  <Play className="w-6 h-6 mr-3" />
                  See the Magic
                </Button>
              </motion.div>
            </motion.div>

            <motion.div 
              className="flex gap-8 pt-6"
              initial="hidden"
              animate="visible"
              variants={{
                hidden: { opacity: 0 },
                visible: {
                  opacity: 1,
                  transition: {
                    delayChildren: 1,
                    staggerChildren: 0.2
                  }
                }
              }}
            >
              {[
                { value: "200+", label: "Restaurants" },
                { value: "24/7", label: "Support" },
                { value: "99%", label: "Uptime" }
              ].map((stat, index) => (
                <motion.div 
                  key={index} 
                  className="text-left"
                  variants={{
                    hidden: { opacity: 0, y: 20 },
                    visible: { 
                      opacity: 1, 
                      y: 0,
                      transition: { type: "spring", stiffness: 100 }
                    }
                  }}
                  whileHover={{ y: -5, transition: { duration: 0.2 } }}
                >
                  <motion.div 
                    className="text-2xl font-medium text-foreground"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 1.2 + index * 0.2, type: "spring", stiffness: 200 }}
                  >
                    {stat.value}
                  </motion.div>
                  <div className="text-sm text-muted-foreground">{stat.label}</div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>

          {/* Interactive Dashboard Preview */}
          <motion.div 
            className="relative"
            initial={{ opacity: 0, x: 50, rotateY: -15 }}
            animate={{ opacity: 1, x: 0, rotateY: 0 }}
            transition={{ duration: 1, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
          >
            <motion.div 
              className="relative group cursor-pointer"
              onMouseEnter={() => setIsImageHovered(true)}
              onMouseLeave={() => setIsImageHovered(false)}
              whileHover={{ scale: 1.02 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
            >
              <motion.img 
                src={minimalDashboard} 
                alt="AI-powered restaurant management dashboard with modern POS interface"
                className="w-full h-auto rounded-3xl shadow-2xl"
                loading="eager"
                animate={{
                  boxShadow: isImageHovered 
                    ? '0 25px 50px -12px rgba(var(--primary-rgb), 0.25)' 
                    : '0 20px 25px -5px rgba(0, 0, 0, 0.1)'
                }}
                transition={{ duration: 0.3 }}
              />
              
              {/* Live Indicator */}
              <motion.div 
                className="absolute top-4 right-4 bg-card/95 backdrop-blur-sm rounded-full px-4 py-2 shadow-lg border border-border/50 flex items-center gap-2"
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 1, type: "spring", stiffness: 200 }}
              >
                <motion.div 
                  className="w-2 h-2 rounded-full bg-green-500"
                  animate={{ scale: [1, 1.2, 1], opacity: [1, 0.7, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
                <span className="text-xs font-medium text-foreground">LIVE</span>
              </motion.div>

              {/* Today's Orders Card */}
              <motion.div 
                className="absolute -top-6 -left-6 bg-card/95 backdrop-blur-sm rounded-2xl p-4 shadow-lg border border-border/50"
                initial={{ opacity: 0, x: -20, y: -20 }}
                animate={{ opacity: 1, x: 0, y: 0 }}
                transition={{ delay: 1.2, type: "spring", stiffness: 100 }}
                whileHover={{ scale: 1.1, rotateZ: 2 }}
              >
                <div className="flex items-center gap-3">
                  <motion.div 
                    className="w-2 h-2 rounded-full bg-green-500"
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  />
                  <div>
                    <div className="text-sm font-medium text-muted-foreground">Today&apos;s Orders</div>
                    <AnimatePresence mode="wait">
                      <motion.div 
                        key={orders}
                        className="text-lg font-semibold text-foreground"
                        initial={{ y: 10, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        exit={{ y: -10, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        {orders}
                      </motion.div>
                    </AnimatePresence>
                  </div>
                </div>
              </motion.div>

              {/* Average Time Card */}
              <motion.div 
                className="absolute -bottom-6 -right-6 bg-card/95 backdrop-blur-sm rounded-2xl p-4 shadow-lg border border-border/50"
                initial={{ opacity: 0, x: 20, y: 20 }}
                animate={{ opacity: 1, x: 0, y: 0 }}
                transition={{ delay: 1.4, type: "spring", stiffness: 100 }}
                whileHover={{ scale: 1.1, rotateZ: -2 }}
              >
                <div className="flex items-center gap-3">
                  <motion.div 
                    className="w-2 h-2 rounded-full bg-blue-500"
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 1.5, repeat: Infinity, delay: 0.5 }}
                  />
                  <div>
                    <div className="text-sm font-medium text-muted-foreground">Average Time</div>
                    <AnimatePresence mode="wait">
                      <motion.div 
                        key={avgTime}
                        className="text-lg font-semibold text-foreground"
                        initial={{ y: 10, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        exit={{ y: -10, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        {avgTime} min
                      </motion.div>
                    </AnimatePresence>
                  </div>
                </div>
              </motion.div>

              {/* Hover Overlay */}
              <motion.div 
                className="absolute inset-0 rounded-3xl bg-gradient-to-t from-primary/20 to-transparent pointer-events-none"
                initial={{ opacity: 0 }}
                animate={{ opacity: isImageHovered ? 1 : 0 }}
                transition={{ duration: 0.3 }}
              />
            </motion.div>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
};