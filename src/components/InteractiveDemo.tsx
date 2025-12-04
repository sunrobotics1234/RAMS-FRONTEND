import { useState } from "react";
import { ShapeBlur } from "@/components/ui/shape-blur";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import {
  DollarSign,
  TrendingUp,
  Users,
  Clock,
  ShoppingCart,
  AlertTriangle,
  CheckCircle,
  Zap,
  Brain,
  Utensils,
  BarChart3
} from "lucide-react";
import { Link } from "react-router-dom";

export const InteractiveDemo = ({ showSubtitle = true }: { showSubtitle?: boolean }) => {
  const [activeMetric, setActiveMetric] = useState("revenue");
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const startAnalysis = () => {
    setIsAnalyzing(true);
    setTimeout(() => setIsAnalyzing(false), 3000);
  };

  const restaurantMetrics = [
    {
      id: "revenue",
      icon: DollarSign,
      label: "Daily Revenue",
      value: "₹45,280",
      status: "excellent",
      change: "+18%",
      color: "text-emerald-600"
    },
    {
      id: "orders",
      icon: ShoppingCart,
      label: "Orders Today",
      value: "156",
      status: "good",
      change: "+12%",
      color: "text-sky-600"
    },
    {
      id: "customers",
      icon: Users,
      label: "Active Customers",
      value: "89",
      status: "normal",
      change: "+5%",
      color: "text-amber-600"
    },
    {
      id: "wait-time",
      icon: Clock,
      label: "Avg Wait Time",
      value: "8 min",
      status: "optimal",
      change: "-15%",
      color: "text-violet-600"
    }
  ];

  const aiInsights = [
    {
      type: "positive",
      icon: CheckCircle,
      message: "Revenue 18% above target - excellent performance during dinner rush",
      confidence: 95
    },
    {
      type: "attention",
      icon: AlertTriangle,
      message: "Table 7 waiting longer than usual - consider priority service",
      confidence: 88
    },
    {
      type: "positive",
      icon: TrendingUp,
      message: "Popular items trending: Butter Chicken (+25%) and Biryani (+30%)",
      confidence: 92
    }
  ];

  return (
    <section id="pos" className="py-24 bg-background relative overflow-hidden">
      <div className="absolute inset-0" style={{ 
        background: 'radial-gradient(ellipse at center, hsl(300 90% 65% / 0.08), transparent 70%)'
      }} />
      
      {/* Shape Blur Background Effect */}
      <div className="absolute inset-0 opacity-25">
        <ShapeBlur 
          shapeSize={1.6}
          roundness={0.7}
          borderSize={0.07}
          circleSize={0.38}
          circleEdge={0.7}
        />
      </div>
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center mb-20 space-y-6">
          <Badge className="border-2 border-primary/50 px-6 py-3 backdrop-blur-md bg-primary/10 pulse-glow">
            <BarChart3 className="w-4 h-4 mr-2 inline animate-pulse" />
            Live Crystal Ball
          </Badge>
          <h2 className="text-5xl lg:text-7xl font-bold leading-tight">
            <span className="block text-gradient-primary mb-4">See the Future</span>
          </h2>
          {showSubtitle && (
            <p className="text-xl lg:text-2xl text-muted-foreground max-w-3xl mx-auto font-light">
              Your mystical dashboard reveals insights that feel like prophecy
            </p>
          )}
        </div>

        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Performance Dashboard */}
            <div className="lg:col-span-2 space-y-6">
              <Card className="card-premium">
                <div className="flex items-center justify-between mb-8">
                  <h3 className="text-2xl font-bold text-gradient-primary">Performance Crystal</h3>
                  <Button 
                    onClick={startAnalysis}
                    disabled={isAnalyzing}
                    className={isAnalyzing ? "btn-secondary" : "btn-glass"}
                  >
                    {isAnalyzing ? (
                      <>
                        <Zap className="w-5 h-5 mr-2 animate-spin" />
                        Divining...
                      </>
                    ) : (
                      <>
                        <Zap className="w-5 h-5 mr-2" />
                        Refresh Vision
                      </>
                    )}
                  </Button>
                </div>

                <div className="grid grid-cols-2 gap-6 mb-8">
                  {restaurantMetrics.map((metric) => (
                    <Card
                      key={metric.id}
                      className={`spell-card p-6 cursor-pointer ${
                        activeMetric === metric.id
                          ? 'border-primary/50 shadow-lg'
                          : 'border-border/30'
                      }`}
                      onClick={() => setActiveMetric(metric.id)}
                      style={activeMetric === metric.id ? { boxShadow: 'var(--glow-spell)' } : {}}
                    >
                      <div className="flex items-center justify-between mb-4 relative z-10">
                        <metric.icon className={`w-7 h-7 ${metric.color}`} style={{ filter: `drop-shadow(0 0 6px hsl(var(--primary)))` }} />
                        <Badge 
                          className="bg-muted/70 backdrop-blur-sm text-muted-foreground border-0 px-3 py-1"
                        >
                          {metric.status}
                        </Badge>
                      </div>
                      <div className="space-y-2 relative z-10">
                        <p className="text-sm font-medium text-muted-foreground">{metric.label}</p>
                        <p className="text-3xl font-bold text-gradient-primary">{metric.value}</p>
                        <p className="text-sm font-medium text-primary">
                          {metric.change} enchantment
                        </p>
                      </div>
                    </Card>
                  ))}
                </div>

                {/* Update Progress */}
                {isAnalyzing && (
                  <div className="space-y-4 p-4 bg-muted/50 rounded-xl">
                    <div className="flex items-center gap-3">
                      <BarChart3 className="w-5 h-5 text-foreground animate-pulse" />
                      <span className="text-sm font-medium">Refreshing data...</span>
                    </div>
                    <Progress value={33} className="h-2" />
                    <div className="text-xs text-muted-foreground">
                      Loading latest performance metrics...
                    </div>
                  </div>
                )}
              </Card>

              {/* Enchanted Metric Visualization */}
              <Card className="card-premium">
                <h4 className="text-xl font-bold mb-6 text-gradient-secondary">
                  {restaurantMetrics.find(m => m.id === activeMetric)?.label} Prophecy
                </h4>
                <div className="h-40 rounded-2xl flex items-center justify-center relative overflow-hidden" 
                     style={{ background: 'var(--gradient-aurora)' }}>
                  <div className="absolute inset-0 opacity-30" style={{ 
                    background: 'radial-gradient(circle at center, hsl(var(--primary)) 0%, transparent 70%)',
                    animation: 'pulse-glow 3s ease-in-out infinite'
                  }} />
                  <div className="text-center space-y-3 relative z-10">
                    <TrendingUp className="w-12 h-12 text-primary mx-auto float-animation" style={{ filter: 'drop-shadow(0 0 10px hsl(var(--primary)))' }} />
                    <p className="text-lg font-semibold text-foreground">Mystical Insights Loading...</p>
                  </div>
                </div>
              </Card>
            </div>

            {/* Mystical Insights Panel */}
            <div className="space-y-8">
              <Card className="card-premium">
                <h3 className="text-2xl font-bold mb-6 flex items-center gap-3">
                  <Brain className="w-7 h-7 text-primary shimmer" style={{ filter: 'drop-shadow(0 0 8px hsl(var(--primary)))' }} />
                  <span className="text-gradient-primary">Mystical Visions</span>
                </h3>
                
                <div className="space-y-6">
                  {aiInsights.map((insight, index) => (
                    <div 
                      key={index} 
                      className={`spell-card p-6 border-l-4 ${
                        insight.type === 'positive' 
                          ? 'border-l-primary' 
                          : 'border-l-secondary'
                      }`}
                      style={{ 
                        background: insight.type === 'positive' 
                          ? 'linear-gradient(135deg, hsl(180 100% 50% / 0.05), transparent)' 
                          : 'linear-gradient(135deg, hsl(300 90% 65% / 0.05), transparent)'
                      }}
                    >
                      <div className="flex items-start gap-4">
                        <insight.icon className={`w-7 h-7 mt-1 float-animation ${
                          insight.type === 'positive' ? 'text-primary' : 'text-secondary'
                        }`} style={{ 
                          filter: insight.type === 'positive' 
                            ? 'drop-shadow(0 0 6px hsl(var(--primary)))' 
                            : 'drop-shadow(0 0 6px hsl(var(--secondary)))'
                        }} />
                        <div className="flex-1 space-y-4">
                          <p className="text-base leading-relaxed text-foreground">{insight.message}</p>
                          <div className="flex items-center gap-3">
                            <span className="text-xs font-semibold text-muted-foreground tracking-wide">CERTAINTY:</span>
                            <div className="flex-1 bg-muted/30 rounded-full h-2 overflow-hidden">
                              <div 
                                className={`h-full rounded-full transition-all duration-1000 ${
                                  insight.type === 'positive' ? 'bg-gradient-to-r from-primary to-primary-glow' : 'bg-gradient-to-r from-secondary to-accent'
                                }`}
                                style={{ 
                                  width: `${insight.confidence}%`,
                                  boxShadow: insight.type === 'positive' ? 'var(--glow-primary)' : 'var(--glow-secondary)'
                                }}
                              />
                            </div>
                            <span className="text-sm font-bold text-gradient-primary">{insight.confidence}%</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>

              {/* Enchanted Quick Spells */}
              <Card className="card-premium">
                <h3 className="text-xl font-bold mb-6 text-gradient-secondary">Quick Spells</h3>
                <div className="space-y-4">
                  <Link to="/kitchen" className="block">
                    <Button className="w-full justify-start btn-glass hover:scale-105 transition-all duration-300 group">
                      <Utensils className="w-5 h-5 mr-3 group-hover:rotate-12 transition-transform" />
                      <span className="font-semibold">Kitchen Portal</span>
                    </Button>
                  </Link>
                  <Link to="/inventory" className="block">
                    <Button className="w-full justify-start btn-glass hover:scale-105 transition-all duration-300 group">
                      <Users className="w-5 h-5 mr-3 group-hover:scale-110 transition-transform" />
                      <span className="font-semibold">Inventory Realm</span>
                    </Button>
                  </Link>
                  <Button className="w-full justify-start btn-glass hover:scale-105 transition-all duration-300 group">
                    <BarChart3 className="w-5 h-5 mr-3 group-hover:animate-pulse" />
                    <span className="font-semibold">Analytics Vision</span>
                  </Button>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};