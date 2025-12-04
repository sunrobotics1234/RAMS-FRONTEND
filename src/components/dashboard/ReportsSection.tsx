import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Download,
  TrendingUp,
  TrendingDown,
  DollarSign,
  ShoppingCart,
  Users,
  Star,
  Calendar,
  Clock,
  Package,
  AlertCircle,
  CheckCircle2,
  Utensils,
  BarChart3,
  ArrowUpRight,
  ArrowDownRight,
} from "lucide-react";
import { Progress } from "@/components/ui/progress";

type ReportPeriod = "daily" | "weekly" | "monthly";

export const ReportsSection = () => {
  const [reportPeriod, setReportPeriod] = useState<ReportPeriod>("daily");

  // Mock data - replace with real data from Supabase
  const reportData = {
    daily: {
      revenue: 45280,
      revenueChange: 18,
      orders: 156,
      ordersChange: 12,
      customers: 89,
      customersChange: 5,
      avgOrderValue: 290,
      avgOrderValueChange: -3,
      topDishes: [
        { name: "Butter Chicken", orders: 45, revenue: 13500, trend: "up" },
        { name: "Biryani", orders: 38, revenue: 11400, trend: "up" },
        { name: "Dal Makhani", orders: 32, revenue: 6400, trend: "down" },
        { name: "Naan Basket", orders: 78, revenue: 5460, trend: "up" },
      ],
      inventory: {
        lowStock: 8,
        outOfStock: 2,
        restockNeeded: 12,
      },
      feedback: {
        avgRating: 4.6,
        totalReviews: 45,
        positive: 38,
        negative: 7,
      },
    },
    weekly: {
      revenue: 284750,
      revenueChange: 22,
      orders: 987,
      ordersChange: 15,
      customers: 523,
      customersChange: 8,
      avgOrderValue: 288,
      avgOrderValueChange: 6,
      topDishes: [
        { name: "Butter Chicken", orders: 287, revenue: 86100, trend: "up" },
        { name: "Biryani", orders: 245, revenue: 73500, trend: "up" },
        { name: "Paneer Tikka", orders: 198, revenue: 49500, trend: "up" },
        { name: "Dal Makhani", orders: 189, revenue: 37800, trend: "down" },
      ],
      inventory: {
        lowStock: 15,
        outOfStock: 4,
        restockNeeded: 23,
      },
      feedback: {
        avgRating: 4.7,
        totalReviews: 234,
        positive: 201,
        negative: 33,
      },
    },
    monthly: {
      revenue: 1235000,
      revenueChange: 28,
      orders: 4234,
      ordersChange: 19,
      customers: 2156,
      customersChange: 12,
      avgOrderValue: 291,
      avgOrderValueChange: 7,
      topDishes: [
        { name: "Butter Chicken", orders: 1245, revenue: 373500, trend: "up" },
        { name: "Biryani", orders: 1087, revenue: 326100, trend: "up" },
        { name: "Paneer Tikka", orders: 867, revenue: 216750, trend: "up" },
        { name: "Tandoori Chicken", orders: 756, revenue: 189000, trend: "up" },
      ],
      inventory: {
        lowStock: 22,
        outOfStock: 6,
        restockNeeded: 34,
      },
      feedback: {
        avgRating: 4.8,
        totalReviews: 987,
        positive: 867,
        negative: 120,
      },
    },
  };

  const currentData = reportData[reportPeriod];

  const exportReport = () => {
    // Implementation for exporting reports
    console.log(`Exporting ${reportPeriod} report...`);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold text-gradient-primary">Performance Reports</h2>
          <p className="text-muted-foreground mt-1">Comprehensive analytics and insights</p>
        </div>
        <Button onClick={exportReport} className="btn-glass gap-2">
          <Download className="w-4 h-4" />
          Export Report
        </Button>
      </div>

      {/* Period Selector */}
      <Tabs value={reportPeriod} onValueChange={(v) => setReportPeriod(v as ReportPeriod)}>
        <TabsList className="grid w-full max-w-md grid-cols-3">
          <TabsTrigger value="daily" className="gap-2">
            <Clock className="w-4 h-4" />
            Daily
          </TabsTrigger>
          <TabsTrigger value="weekly" className="gap-2">
            <Calendar className="w-4 h-4" />
            Weekly
          </TabsTrigger>
          <TabsTrigger value="monthly" className="gap-2">
            <BarChart3 className="w-4 h-4" />
            Monthly
          </TabsTrigger>
        </TabsList>

        <TabsContent value={reportPeriod} className="space-y-6 mt-6">
          {/* Key Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="card-premium">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">Total Revenue</CardTitle>
                <DollarSign className="w-5 h-5 text-primary" />
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-gradient-primary">₹{currentData.revenue.toLocaleString()}</div>
                <div className="flex items-center gap-2 mt-2">
                  {currentData.revenueChange > 0 ? (
                    <>
                      <ArrowUpRight className="w-4 h-4 text-primary" />
                      <span className="text-sm font-medium text-primary">+{currentData.revenueChange}%</span>
                    </>
                  ) : (
                    <>
                      <ArrowDownRight className="w-4 h-4 text-destructive" />
                      <span className="text-sm font-medium text-destructive">{currentData.revenueChange}%</span>
                    </>
                  )}
                  <span className="text-sm text-muted-foreground">vs last {reportPeriod}</span>
                </div>
              </CardContent>
            </Card>

            <Card className="card-premium">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">Total Orders</CardTitle>
                <ShoppingCart className="w-5 h-5 text-secondary" />
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-gradient-secondary">{currentData.orders}</div>
                <div className="flex items-center gap-2 mt-2">
                  {currentData.ordersChange > 0 ? (
                    <>
                      <ArrowUpRight className="w-4 h-4 text-primary" />
                      <span className="text-sm font-medium text-primary">+{currentData.ordersChange}%</span>
                    </>
                  ) : (
                    <>
                      <ArrowDownRight className="w-4 h-4 text-destructive" />
                      <span className="text-sm font-medium text-destructive">{currentData.ordersChange}%</span>
                    </>
                  )}
                  <span className="text-sm text-muted-foreground">vs last {reportPeriod}</span>
                </div>
              </CardContent>
            </Card>

            <Card className="card-premium">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">Customers</CardTitle>
                <Users className="w-5 h-5 text-accent" />
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold" style={{ background: 'var(--gradient-aurora)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                  {currentData.customers}
                </div>
                <div className="flex items-center gap-2 mt-2">
                  {currentData.customersChange > 0 ? (
                    <>
                      <ArrowUpRight className="w-4 h-4 text-primary" />
                      <span className="text-sm font-medium text-primary">+{currentData.customersChange}%</span>
                    </>
                  ) : (
                    <>
                      <ArrowDownRight className="w-4 h-4 text-destructive" />
                      <span className="text-sm font-medium text-destructive">{currentData.customersChange}%</span>
                    </>
                  )}
                  <span className="text-sm text-muted-foreground">vs last {reportPeriod}</span>
                </div>
              </CardContent>
            </Card>

            <Card className="card-premium">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">Avg Order Value</CardTitle>
                <TrendingUp className="w-5 h-5 text-primary" />
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-gradient-primary">₹{currentData.avgOrderValue}</div>
                <div className="flex items-center gap-2 mt-2">
                  {currentData.avgOrderValueChange > 0 ? (
                    <>
                      <ArrowUpRight className="w-4 h-4 text-primary" />
                      <span className="text-sm font-medium text-primary">+{currentData.avgOrderValueChange}%</span>
                    </>
                  ) : (
                    <>
                      <ArrowDownRight className="w-4 h-4 text-destructive" />
                      <span className="text-sm font-medium text-destructive">{currentData.avgOrderValueChange}%</span>
                    </>
                  )}
                  <span className="text-sm text-muted-foreground">vs last {reportPeriod}</span>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Top Dishes Performance */}
          <Card className="card-premium">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Utensils className="w-5 h-5 text-primary" />
                Top Performing Dishes
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {currentData.topDishes.map((dish, index) => (
                  <div key={index} className="flex items-center justify-between p-4 rounded-xl spell-card">
                    <div className="flex items-center gap-4">
                      <Badge className="bg-primary/10 text-primary border-0 text-lg font-bold w-10 h-10 flex items-center justify-center">
                        #{index + 1}
                      </Badge>
                      <div>
                        <h4 className="font-semibold">{dish.name}</h4>
                        <p className="text-sm text-muted-foreground">{dish.orders} orders</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-6">
                      <div className="text-right">
                        <p className="font-bold text-gradient-primary">₹{dish.revenue.toLocaleString()}</p>
                        <p className="text-xs text-muted-foreground">Revenue</p>
                      </div>
                      {dish.trend === "up" ? (
                        <TrendingUp className="w-5 h-5 text-primary" />
                      ) : (
                        <TrendingDown className="w-5 h-5 text-destructive" />
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Inventory & Feedback Overview */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Inventory Status */}
            <Card className="card-premium">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Package className="w-5 h-5 text-secondary" />
                  Inventory Status
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <AlertCircle className="w-4 h-4 text-amber-500" />
                      <span className="text-sm">Low Stock Items</span>
                    </div>
                    <Badge variant="outline" className="border-amber-500 text-amber-500">
                      {currentData.inventory.lowStock}
                    </Badge>
                  </div>
                  <Progress value={(currentData.inventory.lowStock / 50) * 100} className="h-2" />
                </div>

                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <AlertCircle className="w-4 h-4 text-destructive" />
                      <span className="text-sm">Out of Stock</span>
                    </div>
                    <Badge variant="outline" className="border-destructive text-destructive">
                      {currentData.inventory.outOfStock}
                    </Badge>
                  </div>
                  <Progress value={(currentData.inventory.outOfStock / 50) * 100} className="h-2" />
                </div>

                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Package className="w-4 h-4 text-primary" />
                      <span className="text-sm">Restock Needed</span>
                    </div>
                    <Badge variant="outline" className="border-primary text-primary">
                      {currentData.inventory.restockNeeded}
                    </Badge>
                  </div>
                  <Progress value={(currentData.inventory.restockNeeded / 50) * 100} className="h-2" />
                </div>
              </CardContent>
            </Card>

            {/* Customer Feedback */}
            <Card className="card-premium">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Star className="w-5 h-5 text-accent" />
                  Customer Feedback
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="text-center">
                  <div className="text-5xl font-bold text-gradient-primary mb-2">
                    {currentData.feedback.avgRating}
                  </div>
                  <div className="flex items-center justify-center gap-1 mb-1">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-5 h-5 ${
                          i < Math.floor(currentData.feedback.avgRating)
                            ? "fill-accent text-accent"
                            : "text-muted"
                        }`}
                      />
                    ))}
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Based on {currentData.feedback.totalReviews} reviews
                  </p>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-primary" />
                      <span className="text-sm">Positive Reviews</span>
                    </div>
                    <span className="font-semibold text-primary">{currentData.feedback.positive}</span>
                  </div>
                  <Progress 
                    value={(currentData.feedback.positive / currentData.feedback.totalReviews) * 100} 
                    className="h-2" 
                  />

                  <div className="flex items-center justify-between mt-3">
                    <div className="flex items-center gap-2">
                      <AlertCircle className="w-4 h-4 text-destructive" />
                      <span className="text-sm">Needs Attention</span>
                    </div>
                    <span className="font-semibold text-destructive">{currentData.feedback.negative}</span>
                  </div>
                  <Progress 
                    value={(currentData.feedback.negative / currentData.feedback.totalReviews) * 100} 
                    className="h-2" 
                  />
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};