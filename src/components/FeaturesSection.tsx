import { MagicBentoCard } from "@/components/ui/magic-bento";
import { Badge } from "@/components/ui/badge";
import {
  BarChart3,
  Users,
  Zap,
  Shield,
  TrendingUp,
  Sparkles,
  Clock,
  Utensils,
  Bell,
  DollarSign
} from "lucide-react";

export const FeaturesSection = () => {
  const features = [
    {
      icon: BarChart3,
      title: "Analytics",
      subtitle: "Track user behavior",
      description: "Overview",
      gradient: "from-cyan-500/20 to-blue-500/20",
      span: "lg:col-span-1 lg:row-span-1"
    },
    {
      icon: Utensils,
      title: "Dashboard",
      subtitle: "Centralized data view",
      description: "Teamwork",
      gradient: "from-purple-500/20 to-pink-500/20",
      span: "lg:col-span-1 lg:row-span-1"
    },
    {
      icon: Users,
      title: "Collaboration",
      subtitle: "Work together seamlessly",
      description: "Efficiency",
      gradient: "from-green-500/20 to-emerald-500/20",
      span: "lg:col-span-1 lg:row-span-1"
    },
    {
      icon: Zap,
      title: "Automation",
      subtitle: "Streamline workflows",
      description: "Efficiency",
      gradient: "from-amber-500/20 to-orange-500/20",
      span: "lg:col-span-1 lg:row-span-1"
    },
    {
      icon: TrendingUp,
      title: "Integration",
      subtitle: "Connect favorite tools",
      description: "Connectivity",
      gradient: "from-blue-500/20 to-cyan-500/20",
      span: "lg:col-span-1 lg:row-span-1"
    },
    {
      icon: Shield,
      title: "Security",
      subtitle: "Enterprise-grade protection",
      description: "Protection",
      gradient: "from-red-500/20 to-rose-500/20",
      span: "lg:col-span-1 lg:row-span-1"
    }
  ];

  return (
    <section id="features" className="py-24 bg-background relative overflow-hidden">
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-primary/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 left-1/4 w-80 h-80 bg-secondary/15 rounded-full blur-3xl animate-pulse" 
             style={{ animationDelay: '1s' }} />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center mb-20 space-y-6">
          <Badge className="border-2 border-primary/50 px-6 py-3 backdrop-blur-md bg-primary/10 shimmer">
            <Sparkles className="w-4 h-4 mr-2 inline" />
            Powerful Features
          </Badge>
          <h2 className="text-5xl lg:text-7xl font-bold leading-tight">
            <span className="block text-gradient-primary mb-4">Everything You Need</span>
            <span className="block text-gradient-secondary text-4xl lg:text-5xl font-light">
              All in One Place
            </span>
          </h2>
          <p className="text-xl lg:text-2xl text-muted-foreground max-w-3xl mx-auto font-light">
            Discover the magical toolkit that powers modern restaurants
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 w-full max-w-6xl mx-auto">
          {features.map((feature, index) => (
            <MagicBentoCard
              key={index}
              className={`${feature.span} group hover:scale-[1.02] transition-transform duration-500 ${
                index % 3 === 1 ? 'lg:mt-8' : index % 3 === 2 ? 'lg:mt-16' : ''
              }`}
              enableStars={true}
              enableSpotlight={true}
              enableBorderGlow={true}
              spotlightRadius={400}
              glowColor="180, 100%, 50%"
              enableTilt={false}
              clickEffect={true}
              enableMagnetism={true}
            >
              <div className="h-full flex flex-col justify-between space-y-6">
                <div className="space-y-4">
                  <div className={`inline-flex p-5 rounded-3xl bg-gradient-to-br ${feature.gradient} backdrop-blur-sm shadow-lg`}>
                    <feature.icon className="w-8 h-8 text-foreground group-hover:scale-110 group-hover:rotate-6 transition-all duration-300" />
                  </div>
                  
                  <div className="space-y-2">
                    <Badge variant="outline" className="text-xs">
                      {feature.description}
                    </Badge>
                    <h3 className="text-2xl font-bold text-foreground group-hover:text-primary transition-colors duration-300">
                      {feature.title}
                    </h3>
                  </div>
                </div>

                <div className="magic-bento-text">
                  <p className="text-muted-foreground leading-relaxed">
                    {feature.subtitle}
                  </p>
                </div>
              </div>
            </MagicBentoCard>
          ))}
        </div>
      </div>
    </section>
  );
};
