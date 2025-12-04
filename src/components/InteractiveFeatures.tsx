import { useState, useRef } from "react";
import { motion, useInView, useScroll, useTransform } from "framer-motion";
import { ShapeBlur } from "@/components/ui/shape-blur";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Brain,
  Calendar,
  CreditCard,
  Smartphone,
  Zap,
  TrendingUp,
  Bell,
  BarChart3,
  Users,
  Shield,
  Clock,
  Utensils,
  Sparkles
} from "lucide-react";
import { Link } from "react-router-dom";
import minimalAnalytics from "@/assets/minimal-analytics.jpg";

export const InteractiveFeatures = () => {
  const [activeFeature, setActiveFeature] = useState("analytics");
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);
  
  const sectionRef = useRef(null);
  const headerRef = useRef(null);
  const cardsRef = useRef(null);
  
  const isHeaderInView = useInView(headerRef, { once: true, amount: 0.5 });
  const isCardsInView = useInView(cardsRef, { once: true, amount: 0.2 });

  const features = [
    {
      id: "analytics",
      title: "Revenue Analytics",
      description: "Track sales performance and identify growth opportunities",
      icon: BarChart3,
      color: "primary",
      stats: ["Sales tracking", "Performance insights", "Growth metrics"]
    },
    {
      id: "pos",
      title: "Point of Sale",
      description: "Fast order processing with integrated payment solutions",
      icon: CreditCard,
      color: "secondary",
      stats: ["Quick billing", "Multiple payments", "Order tracking"]
    },
    {
      id: "management",
      title: "Operations",
      description: "Manage all aspects of your restaurant from one platform",
      icon: Utensils,
      color: "accent",
      stats: ["Table management", "Staff coordination", "Inventory control"]
    }
  ];

  const features_grid = [
    {
      icon: BarChart3,
      title: "Sales Reports",
      description: "Detailed analytics and performance reports",
      interactive: true
    },
    {
      icon: Users,
      title: "Customer Insights",
      description: "Track customer preferences and order history",
      interactive: true
    },
    {
      icon: TrendingUp,
      title: "Growth Tracking",
      description: "Monitor business growth and key metrics",
      interactive: true
    },
    {
      icon: Bell,
      title: "Notifications",
      description: "Stay updated with order and inventory alerts",
      interactive: true
    },
    {
      icon: Clock,
      title: "Order Management",
      description: "Optimize kitchen workflow and reduce wait times",
      interactive: true
    },
    {
      icon: Shield,
      title: "Security",
      description: "Secure payment processing and data protection",
      interactive: true
    }
  ];

  return (
    <section ref={sectionRef} id="analytics" className="py-24 bg-background relative overflow-hidden">
      <div className="absolute inset-0" style={{ background: 'var(--gradient-aurora)', opacity: 0.1 }} />
      
      {/* Shape Blur Background Effect */}
      <div className="absolute inset-0 opacity-20">
        <ShapeBlur 
          shapeSize={1.8}
          roundness={0.5}
          borderSize={0.06}
          circleSize={0.35}
          circleEdge={0.6}
        />
      </div>
      
      <div className="container mx-auto px-6 relative z-10">
        {/* Enchanted Section Header */}
        <motion.div 
          ref={headerRef}
          className="text-center mb-20 space-y-6"
          initial={{ opacity: 0, y: 50 }}
          animate={isHeaderInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={isHeaderInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <Badge className="border-2 border-secondary/50 px-6 py-3 backdrop-blur-md bg-secondary/10 shimmer">
              <motion.div
                animate={{ rotate: [0, 360] }}
                transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                className="inline-block"
              >
                <Sparkles className="w-4 h-4 mr-2 inline" />
              </motion.div>
              Magical Capabilities
            </Badge>
          </motion.div>
          <motion.h2 
            className="text-5xl lg:text-7xl font-bold leading-tight"
            initial={{ opacity: 0, y: 30 }}
            animate={isHeaderInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.8, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
          >
            <motion.span 
              className="block text-gradient-secondary mb-4"
              initial={{ opacity: 0, x: -20 }}
              animate={isHeaderInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
              transition={{ duration: 0.6, delay: 0.5 }}
            >
              Your Enchanted
            </motion.span>
            <motion.span 
              className="block text-gradient-primary"
              initial={{ opacity: 0, x: 20 }}
              animate={isHeaderInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 20 }}
              transition={{ duration: 0.6, delay: 0.6 }}
            >
              Kitchen Arsenal
            </motion.span>
          </motion.h2>
          <motion.p 
            className="text-xl lg:text-2xl text-muted-foreground max-w-3xl mx-auto font-light"
            initial={{ opacity: 0 }}
            animate={isHeaderInView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.8, delay: 0.7 }}
          >
            Every spell you need to orchestrate culinary excellence with effortless grace
          </motion.p>
        </motion.div>

        {/* Spell Selector Tabs */}
        <Tabs value={activeFeature} onValueChange={setActiveFeature} className="mb-20">
          <TabsList className="grid w-full grid-cols-3 mb-16 bg-card/80 backdrop-blur-lg p-3 rounded-3xl border-2 border-border/30">
            {features.map((feature) => (
              <TabsTrigger 
                key={feature.id} 
                value={feature.id}
                className="data-[state=active]:bg-foreground data-[state=active]:text-background data-[state=active]:shadow-lg data-[state=inactive]:text-muted-foreground rounded-2xl transition-all duration-500 py-4 text-lg font-semibold"
              >
                <feature.icon className="w-6 h-6 mr-3" />
                {feature.title}
              </TabsTrigger>
            ))}
          </TabsList>

          {features.map((feature) => (
            <TabsContent key={feature.id} value={feature.id} className="mt-0">
              <div className="grid lg:grid-cols-2 gap-12 items-center">
                <div className="space-y-8">
                  <div className="space-y-4">
                    <div className="flex items-center gap-3">
                      <div className={`p-3 rounded-2xl bg-gradient-to-r from-${feature.color} to-${feature.color}-glow`}>
                        <feature.icon className="w-8 h-8 text-white" />
                      </div>
                      <h3 className="text-3xl font-bold">{feature.title}</h3>
                    </div>
                    <p className="text-lg text-muted-foreground">{feature.description}</p>
                  </div>

                  <div className="grid gap-4">
                    {feature.stats.map((stat, index) => (
                      <div key={index} className="flex items-center gap-3 p-4 rounded-xl bg-muted/50 backdrop-blur-sm">
                        <div className="w-2 h-2 rounded-full bg-gradient-to-r from-primary to-secondary" />
                        <span className="font-medium">{stat}</span>
                      </div>
                    ))}
                  </div>

                  <Link to={feature.title.includes('Analytics') ? '/inventory' : feature.title.includes('POS') ? '/kitchen' : '/'}>
                    <Button className="btn-primary hover:scale-105 transition-all duration-500">
                      Explore {feature.title}
                      <feature.icon className="w-5 h-5 ml-2" />
                    </Button>
                  </Link>
                </div>

                <div className="relative">
                  <div className="relative overflow-hidden rounded-3xl">
                    <img 
                      src={minimalAnalytics} 
                      alt="Restaurant analytics dashboard preview"
                      className="w-full h-auto transform transition-all duration-500 hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                  </div>
                  
                  {/* Floating Interactive Elements */}
                  <div className="absolute -top-4 -right-4 card-glass p-4 animate-pulse-glow">
                    <div className="text-sm font-semibold text-gradient-primary">Live Restaurant Analytics</div>
                  </div>
                </div>
              </div>
            </TabsContent>
          ))}
        </Tabs>

        {/* Spell Cards Grid */}
        <motion.div 
          ref={cardsRef}
          className="space-y-12"
          initial={{ opacity: 0 }}
          animate={isCardsInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.8 }}
        >
          <motion.h3 
            className="text-4xl lg:text-5xl font-bold text-center"
            initial={{ opacity: 0, y: 30 }}
            animate={isCardsInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          >
            <span className="text-gradient-primary">Master the </span>
            <span className="text-gradient-secondary">complete spellbook</span>
          </motion.h3>
          
          <motion.div 
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
            initial="hidden"
            animate={isCardsInView ? "visible" : "hidden"}
            variants={{
              hidden: { opacity: 0 },
              visible: {
                opacity: 1,
                transition: {
                  staggerChildren: 0.1,
                  delayChildren: 0.3
                }
              }
            }}
          >
            {features_grid.map((feature, index) => (
              <motion.div 
                key={index}
                className="spell-card cursor-pointer"
                variants={{
                  hidden: { opacity: 0, y: 50, scale: 0.9 },
                  visible: { 
                    opacity: 1, 
                    y: 0, 
                    scale: 1,
                    transition: { 
                      type: "spring", 
                      stiffness: 100, 
                      damping: 15 
                    }
                  }
                }}
                whileHover={{ 
                  scale: 1.05, 
                  rotateY: 5,
                  rotateX: 5,
                  transition: { duration: 0.3 }
                }}
                whileTap={{ scale: 0.95 }}
                onMouseEnter={() => setHoveredCard(feature.title)}
                onMouseLeave={() => setHoveredCard(null)}
              >
                <div className="space-y-6 relative z-10">
                  <div className="flex items-center justify-between">
                    <motion.div 
                      className="p-4 rounded-2xl bg-gradient-to-br from-primary/20 to-secondary/20 backdrop-blur-sm"
                      whileHover={{ scale: 1.1, rotate: 360 }}
                      transition={{ duration: 0.6 }}
                    >
                      <motion.div
                        animate={{ 
                          y: [0, -5, 0],
                        }}
                        transition={{ 
                          duration: 2, 
                          repeat: Infinity, 
                          delay: index * 0.2 
                        }}
                      >
                        <feature.icon 
                          className="w-8 h-8 text-primary" 
                          style={{ filter: 'drop-shadow(0 0 8px hsl(var(--primary)))' }} 
                        />
                      </motion.div>
                    </motion.div>
                    <motion.div 
                      className="text-xs px-3 py-1 rounded-full bg-muted/50 text-muted-foreground"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.5 + index * 0.1 }}
                    >
                      Active
                    </motion.div>
                  </div>
                  
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.3 + index * 0.1 }}
                  >
                    <h4 className="text-xl font-bold mb-3 text-gradient-primary">{feature.title}</h4>
                    <p className="text-muted-foreground leading-relaxed">{feature.description}</p>
                  </motion.div>

                  <Link to={feature.title.includes('Kitchen') || feature.title.includes('Order') ? '/kitchen' : '/inventory'}>
                    <motion.div whileHover={{ x: 5 }} transition={{ duration: 0.2 }}>
                      <Button 
                        variant="ghost" 
                        className="w-full justify-start hover:bg-primary/10 transition-all duration-300 group"
                      >
                        <motion.div
                          animate={{ rotate: hoveredCard === feature.title ? 360 : 0 }}
                          transition={{ duration: 0.6 }}
                        >
                          <Sparkles className="w-4 h-4 mr-2" />
                        </motion.div>
                        Cast Spell
                      </Button>
                    </motion.div>
                  </Link>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};