import { useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import {
  Brain, TrendingUp, TrendingDown, Sparkles, Calendar, Package,
  ShoppingBag, AlertTriangle, Clock, ArrowUpRight, RefreshCw,
  LineChart, BarChart3, PieChart, Target, Lightbulb
} from "lucide-react";

interface ForecastData {
  date: string;
  predicted: number;
  confidence: number;
  actual?: number;
}

interface DemandPrediction {
  item: string;
  currentDemand: number;
  predictedDemand: number;
  change: number;
  confidence: number;
  recommendation: string;
}

export const AIForecasting = () => {
  const [isRefreshing, setIsRefreshing] = useState(false);

  // AI-generated forecast data (mock Prophet model output)
  const salesForecast: ForecastData[] = [
    { date: "Tomorrow", predicted: 52400, confidence: 92 },
    { date: "Day 3", predicted: 48200, confidence: 88 },
    { date: "Day 4", predicted: 55600, confidence: 85 },
    { date: "Day 5", predicted: 61200, confidence: 82 },
    { date: "Day 6 (Weekend)", predicted: 78500, confidence: 90 },
    { date: "Day 7 (Weekend)", predicted: 82300, confidence: 89 },
    { date: "Next Week Avg", predicted: 58900, confidence: 75 },
  ];

  const demandPredictions: DemandPrediction[] = [
    { item: "Butter Chicken", currentDemand: 45, predictedDemand: 58, change: 28.9, confidence: 94, recommendation: "Increase prep stock by 30%" },
    { item: "Biryani", currentDemand: 38, predictedDemand: 52, change: 36.8, confidence: 91, recommendation: "Order extra basmati rice" },
    { item: "Paneer Tikka", currentDemand: 32, predictedDemand: 28, change: -12.5, confidence: 87, recommendation: "Reduce paneer order by 15%" },
    { item: "Naan Basket", currentDemand: 78, predictedDemand: 95, change: 21.8, confidence: 93, recommendation: "Prepare extra dough batches" },
    { item: "Dal Makhani", currentDemand: 25, predictedDemand: 30, change: 20.0, confidence: 85, recommendation: "Standard prep sufficient" },
  ];

  const inventoryForecast = [
    { item: "Chicken", current: 45, needed: 68, daysUntilOut: 2, urgency: "high" },
    { item: "Rice", current: 120, needed: 150, daysUntilOut: 5, urgency: "medium" },
    { item: "Paneer", current: 25, needed: 20, daysUntilOut: 8, urgency: "low" },
    { item: "Cream", current: 15, needed: 30, daysUntilOut: 3, urgency: "high" },
    { item: "Spices Mix", current: 8, needed: 12, daysUntilOut: 4, urgency: "medium" },
  ];

  const weeklyInsights = [
    { insight: "Weekend sales projected 35% higher than weekdays", icon: TrendingUp, type: "positive" },
    { insight: "Dinner rush (7-9 PM) expected to peak at 85 orders/hour", icon: Clock, type: "info" },
    { insight: "Biryani demand surge expected - festival season impact", icon: Sparkles, type: "positive" },
    { insight: "Rain forecast may reduce dine-in by 20%, boost delivery", icon: AlertTriangle, type: "warning" },
  ];

  const refreshForecasts = () => {
    setIsRefreshing(true);
    setTimeout(() => setIsRefreshing(false), 2000);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
            <Brain className="w-7 h-7 text-primary-foreground" />
          </div>
          <div>
            <h2 className="text-3xl font-bold text-gradient-primary">AI Forecasting</h2>
            <p className="text-muted-foreground">Powered by advanced demand prediction models</p>
          </div>
        </div>
        <Button 
          onClick={refreshForecasts} 
          className="btn-glass gap-2"
          disabled={isRefreshing}
        >
          <RefreshCw className={`w-4 h-4 ${isRefreshing ? 'animate-spin' : ''}`} />
          Refresh Predictions
        </Button>
      </div>

      {/* Quick Insights */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {weeklyInsights.map((item, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card className={`p-4 border-l-4 ${
              item.type === 'positive' ? 'border-l-primary' : 
              item.type === 'warning' ? 'border-l-amber-500' : 'border-l-secondary'
            }`}>
              <div className="flex items-start gap-3">
                <item.icon className={`w-5 h-5 mt-0.5 ${
                  item.type === 'positive' ? 'text-primary' : 
                  item.type === 'warning' ? 'text-amber-500' : 'text-secondary'
                }`} />
                <p className="text-sm">{item.insight}</p>
              </div>
            </Card>
          </motion.div>
        ))}
      </div>

      <Tabs defaultValue="sales" className="space-y-6">
        <TabsList className="grid w-full max-w-2xl grid-cols-3">
          <TabsTrigger value="sales" className="gap-2">
            <LineChart className="w-4 h-4" />
            Sales Forecast
          </TabsTrigger>
          <TabsTrigger value="demand" className="gap-2">
            <BarChart3 className="w-4 h-4" />
            Demand Prediction
          </TabsTrigger>
          <TabsTrigger value="inventory" className="gap-2">
            <Package className="w-4 h-4" />
            Inventory Forecast
          </TabsTrigger>
        </TabsList>

        {/* Sales Forecast Tab */}
        <TabsContent value="sales" className="space-y-6">
          <Card className="card-premium">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-primary" />
                7-Day Sales Forecast
              </CardTitle>
              <CardDescription>AI-predicted revenue based on historical patterns</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {salesForecast.map((day, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                    className="flex items-center justify-between p-4 rounded-xl spell-card hover:scale-[1.01] transition-transform"
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                        <Calendar className="w-5 h-5 text-primary" />
                      </div>
                      <div>
                        <h4 className="font-semibold">{day.date}</h4>
                        <div className="flex items-center gap-2">
                          <Badge variant="outline" className="text-xs">
                            {day.confidence}% confidence
                          </Badge>
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-2xl font-bold text-gradient-primary">₹{day.predicted.toLocaleString()}</p>
                      <p className="text-xs text-muted-foreground">Predicted Revenue</p>
                    </div>
                  </motion.div>
                ))}
              </div>

              <div className="mt-6 p-4 rounded-xl bg-gradient-to-r from-primary/5 to-secondary/5 border">
                <div className="flex items-center gap-3 mb-2">
                  <Lightbulb className="w-5 h-5 text-amber-500" />
                  <h4 className="font-semibold">AI Recommendation</h4>
                </div>
                <p className="text-sm text-muted-foreground">
                  Based on the forecast, consider scheduling 2 additional staff members for the weekend 
                  rush. Expected peak hours are 7-9 PM with approximately 85 orders/hour.
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Demand Prediction Tab */}
        <TabsContent value="demand" className="space-y-6">
          <Card className="card-premium">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Target className="w-5 h-5 text-secondary" />
                Dish-wise Demand Prediction
              </CardTitle>
              <CardDescription>AI predicts tomorrow's demand vs current average</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {demandPredictions.map((item, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                    className="p-4 rounded-xl border hover:bg-card/50 transition-all"
                  >
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <ShoppingBag className="w-5 h-5 text-primary" />
                        <div>
                          <h4 className="font-semibold">{item.item}</h4>
                          <Badge variant="outline" className="text-xs mt-1">
                            {item.confidence}% confidence
                          </Badge>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="flex items-center gap-2">
                          <span className="text-muted-foreground">{item.currentDemand}</span>
                          <ArrowUpRight className={`w-4 h-4 ${item.change >= 0 ? 'text-primary' : 'text-destructive rotate-90'}`} />
                          <span className="font-bold text-primary">{item.predictedDemand}</span>
                        </div>
                        <p className={`text-sm font-medium ${item.change >= 0 ? 'text-primary' : 'text-destructive'}`}>
                          {item.change >= 0 ? '+' : ''}{item.change.toFixed(1)}%
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 p-2 rounded-lg bg-muted/50">
                      <Sparkles className="w-4 h-4 text-amber-500" />
                      <p className="text-sm text-muted-foreground">{item.recommendation}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Inventory Forecast Tab */}
        <TabsContent value="inventory" className="space-y-6">
          <Card className="card-premium">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Package className="w-5 h-5 text-accent" />
                Smart Inventory Forecast
              </CardTitle>
              <CardDescription>AI-predicted stock requirements based on demand forecast</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {inventoryForecast.map((item, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: index * 0.05 }}
                    className={`p-4 rounded-xl border-l-4 ${
                      item.urgency === 'high' ? 'border-l-destructive bg-destructive/5' :
                      item.urgency === 'medium' ? 'border-l-amber-500 bg-amber-500/5' :
                      'border-l-primary bg-primary/5'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-3">
                      <div>
                        <h4 className="font-semibold">{item.item}</h4>
                        <div className="flex items-center gap-2 mt-1">
                          <Badge variant={item.urgency === 'high' ? 'destructive' : item.urgency === 'medium' ? 'secondary' : 'outline'}>
                            {item.urgency === 'high' ? 'Urgent' : item.urgency === 'medium' ? 'Soon' : 'OK'}
                          </Badge>
                          <span className="text-sm text-muted-foreground">
                            {item.daysUntilOut} days until stockout
                          </span>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-sm text-muted-foreground">Current: {item.current} kg</p>
                        <p className="text-lg font-bold text-primary">Need: {item.needed} kg</p>
                      </div>
                    </div>
                    <Progress 
                      value={(item.current / item.needed) * 100} 
                      className="h-2"
                    />
                    <div className="flex justify-between mt-2 text-xs text-muted-foreground">
                      <span>0</span>
                      <span>Required: {item.needed} kg</span>
                    </div>
                  </motion.div>
                ))}
              </div>

              <div className="mt-6 flex gap-3">
                <Button className="btn-primary flex-1">
                  <Package className="w-4 h-4 mr-2" />
                  Auto-Generate Purchase Order
                </Button>
                <Button variant="outline" className="flex-1">
                  Export Forecast
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};
