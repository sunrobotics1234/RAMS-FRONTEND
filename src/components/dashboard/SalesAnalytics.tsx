import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  TrendingUp,
  DollarSign,
  CreditCard,
  Wallet,
  ArrowUpRight,
  Clock,
} from "lucide-react";

export const SalesAnalytics = () => {
  // Mock data - replace with real Supabase data
  const salesData = {
    hourlyBreakdown: [
      { hour: "9-10 AM", orders: 12, revenue: 3240 },
      { hour: "10-11 AM", orders: 18, revenue: 4860 },
      { hour: "11-12 PM", orders: 24, revenue: 6480 },
      { hour: "12-1 PM", orders: 45, revenue: 12150 },
      { hour: "1-2 PM", orders: 38, revenue: 10260 },
      { hour: "7-8 PM", orders: 52, revenue: 14040 },
      { hour: "8-9 PM", orders: 48, revenue: 12960 },
      { hour: "9-10 PM", orders: 35, revenue: 9450 },
    ],
    paymentMethods: [
      { method: "UPI", percentage: 45, amount: 20376 },
      { method: "Card", percentage: 30, amount: 13584 },
      { method: "Cash", percentage: 20, amount: 9056 },
      { method: "Wallet", percentage: 5, amount: 2264 },
    ],
    peakHours: {
      lunch: "12-2 PM",
      dinner: "7-9 PM",
    },
  };

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-2xl font-bold text-gradient-secondary mb-1">Sales Analytics</h3>
        <p className="text-sm text-muted-foreground">Detailed breakdown of sales performance</p>
      </div>

      {/* Peak Hours */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card className="card-premium">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
              <Clock className="w-4 h-4" />
              Peak Lunch Hours
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gradient-primary">{salesData.peakHours.lunch}</div>
            <Badge className="mt-2 bg-primary/10 text-primary border-0">Highest Traffic</Badge>
          </CardContent>
        </Card>

        <Card className="card-premium">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
              <Clock className="w-4 h-4" />
              Peak Dinner Hours
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gradient-secondary">{salesData.peakHours.dinner}</div>
            <Badge className="mt-2 bg-secondary/10 text-secondary border-0">Highest Revenue</Badge>
          </CardContent>
        </Card>
      </div>

      {/* Hourly Breakdown */}
      <Card className="card-premium">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-primary" />
            Hourly Sales Breakdown
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {salesData.hourlyBreakdown.map((hour, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-4 rounded-xl spell-card hover:scale-[1.02] transition-transform"
              >
                <div className="flex items-center gap-4">
                  <div className="w-20 font-semibold">{hour.hour}</div>
                  <Badge variant="outline" className="border-primary/30">
                    {hour.orders} orders
                  </Badge>
                </div>
                <div className="flex items-center gap-2">
                  <span className="font-bold text-gradient-primary">₹{hour.revenue.toLocaleString()}</span>
                  <ArrowUpRight className="w-4 h-4 text-primary" />
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Payment Methods */}
      <Card className="card-premium">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <CreditCard className="w-5 h-5 text-secondary" />
            Payment Method Distribution
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {salesData.paymentMethods.map((payment, index) => {
              const icons = {
                UPI: Wallet,
                Card: CreditCard,
                Cash: DollarSign,
                Wallet: Wallet,
              };
              const Icon = icons[payment.method as keyof typeof icons];

              return (
                <div key={index} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <Icon className="w-5 h-5 text-primary" />
                      <span className="font-medium">{payment.method}</span>
                    </div>
                    <div className="flex items-center gap-4">
                      <span className="text-sm text-muted-foreground">{payment.percentage}%</span>
                      <span className="font-bold text-gradient-primary">₹{payment.amount.toLocaleString()}</span>
                    </div>
                  </div>
                  <div className="w-full bg-muted/30 rounded-full h-2 overflow-hidden">
                    <div
                      className="h-full rounded-full bg-gradient-to-r from-primary to-primary-glow transition-all duration-500"
                      style={{ width: `${payment.percentage}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};