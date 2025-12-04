import { useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  CreditCard, Wallet, IndianRupee, Percent, Settings, 
  QrCode, Smartphone, Building2, ShieldCheck, Save,
  CheckCircle2, XCircle, AlertCircle
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export const BillingConfiguration = () => {
  const { toast } = useToast();

  // Tax & Charges Configuration
  const [taxConfig, setTaxConfig] = useState({
    gstEnabled: true,
    gstRate: "5",
    cgstRate: "2.5",
    sgstRate: "2.5",
    serviceChargeEnabled: true,
    serviceChargeRate: "10",
    packagingChargeEnabled: true,
    packagingCharge: "20",
    deliveryChargeEnabled: true,
    deliveryCharge: "40",
  });

  // Discount Configuration
  const [discountConfig, setDiscountConfig] = useState({
    maxDiscountPercent: "25",
    loyaltyDiscountEnabled: true,
    loyaltyDiscountRate: "5",
    firstOrderDiscount: true,
    firstOrderDiscountRate: "15",
    bulkOrderDiscountEnabled: false,
    bulkOrderThreshold: "2000",
    bulkOrderDiscountRate: "10",
  });

  // Payment Gateway Configuration
  const [paymentGateways, setPaymentGateways] = useState({
    razorpay: { enabled: true, keyId: "rzp_test_xxxxx", connected: true },
    paytm: { enabled: false, merchantId: "", connected: false },
    upi: { enabled: true, vpa: "restaurant@upi", connected: true },
    cash: { enabled: true, connected: true },
    card: { enabled: true, connected: true },
    wallet: { enabled: false, connected: false },
  });

  const handleSaveConfig = () => {
    toast({
      title: "Configuration Saved",
      description: "Billing and payment settings have been updated successfully",
    });
  };

  const toggleGateway = (gateway: string) => {
    setPaymentGateways(prev => ({
      ...prev,
      [gateway]: { ...prev[gateway as keyof typeof prev], enabled: !prev[gateway as keyof typeof prev].enabled }
    }));
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-3xl font-bold text-gradient-primary">Billing & Payments</h2>
          <p className="text-muted-foreground">Configure taxes, discounts, and payment methods</p>
        </div>
        <Button onClick={handleSaveConfig} className="btn-primary gap-2">
          <Save className="w-4 h-4" />
          Save All Changes
        </Button>
      </div>

      <Tabs defaultValue="taxes" className="space-y-6">
        <TabsList className="grid w-full max-w-2xl grid-cols-3">
          <TabsTrigger value="taxes" className="gap-2">
            <Percent className="w-4 h-4" />
            Taxes & Charges
          </TabsTrigger>
          <TabsTrigger value="discounts" className="gap-2">
            <IndianRupee className="w-4 h-4" />
            Discounts
          </TabsTrigger>
          <TabsTrigger value="gateways" className="gap-2">
            <CreditCard className="w-4 h-4" />
            Payment Gateways
          </TabsTrigger>
        </TabsList>

        {/* Taxes & Charges Tab */}
        <TabsContent value="taxes" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* GST Configuration */}
            <Card className="card-premium">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center gap-2">
                    <Building2 className="w-5 h-5 text-primary" />
                    GST Configuration
                  </CardTitle>
                  <Switch 
                    checked={taxConfig.gstEnabled}
                    onCheckedChange={(checked) => setTaxConfig({...taxConfig, gstEnabled: checked})}
                  />
                </div>
                <CardDescription>Configure Goods and Services Tax</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>CGST Rate (%)</Label>
                    <Input 
                      type="number"
                      value={taxConfig.cgstRate}
                      onChange={(e) => setTaxConfig({...taxConfig, cgstRate: e.target.value})}
                      disabled={!taxConfig.gstEnabled}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>SGST Rate (%)</Label>
                    <Input 
                      type="number"
                      value={taxConfig.sgstRate}
                      onChange={(e) => setTaxConfig({...taxConfig, sgstRate: e.target.value})}
                      disabled={!taxConfig.gstEnabled}
                    />
                  </div>
                </div>
                <div className="p-3 rounded-lg bg-muted/50 text-sm">
                  <span className="text-muted-foreground">Total GST: </span>
                  <span className="font-bold text-primary">
                    {(parseFloat(taxConfig.cgstRate || "0") + parseFloat(taxConfig.sgstRate || "0")).toFixed(1)}%
                  </span>
                </div>
              </CardContent>
            </Card>

            {/* Service Charges */}
            <Card className="card-premium">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center gap-2">
                    <Settings className="w-5 h-5 text-secondary" />
                    Service Charge
                  </CardTitle>
                  <Switch 
                    checked={taxConfig.serviceChargeEnabled}
                    onCheckedChange={(checked) => setTaxConfig({...taxConfig, serviceChargeEnabled: checked})}
                  />
                </div>
                <CardDescription>Optional service charge on dine-in orders</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label>Service Charge Rate (%)</Label>
                  <Input 
                    type="number"
                    value={taxConfig.serviceChargeRate}
                    onChange={(e) => setTaxConfig({...taxConfig, serviceChargeRate: e.target.value})}
                    disabled={!taxConfig.serviceChargeEnabled}
                  />
                </div>
                <Badge variant="outline" className="bg-amber-500/10 text-amber-600 border-amber-500/30">
                  Applied to dine-in orders only
                </Badge>
              </CardContent>
            </Card>

            {/* Packaging & Delivery */}
            <Card className="card-premium col-span-full">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <IndianRupee className="w-5 h-5 text-accent" />
                  Additional Charges
                </CardTitle>
                <CardDescription>Configure packaging and delivery fees</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="p-4 rounded-xl border space-y-4">
                    <div className="flex items-center justify-between">
                      <Label className="font-semibold">Packaging Charge</Label>
                      <Switch 
                        checked={taxConfig.packagingChargeEnabled}
                        onCheckedChange={(checked) => setTaxConfig({...taxConfig, packagingChargeEnabled: checked})}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Amount (₹)</Label>
                      <Input 
                        type="number"
                        value={taxConfig.packagingCharge}
                        onChange={(e) => setTaxConfig({...taxConfig, packagingCharge: e.target.value})}
                        disabled={!taxConfig.packagingChargeEnabled}
                      />
                    </div>
                  </div>

                  <div className="p-4 rounded-xl border space-y-4">
                    <div className="flex items-center justify-between">
                      <Label className="font-semibold">Delivery Charge</Label>
                      <Switch 
                        checked={taxConfig.deliveryChargeEnabled}
                        onCheckedChange={(checked) => setTaxConfig({...taxConfig, deliveryChargeEnabled: checked})}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Base Amount (₹)</Label>
                      <Input 
                        type="number"
                        value={taxConfig.deliveryCharge}
                        onChange={(e) => setTaxConfig({...taxConfig, deliveryCharge: e.target.value})}
                        disabled={!taxConfig.deliveryChargeEnabled}
                      />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Discounts Tab */}
        <TabsContent value="discounts" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="card-premium">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Percent className="w-5 h-5 text-primary" />
                  General Discount Settings
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label>Maximum Discount Allowed (%)</Label>
                  <Input 
                    type="number"
                    value={discountConfig.maxDiscountPercent}
                    onChange={(e) => setDiscountConfig({...discountConfig, maxDiscountPercent: e.target.value})}
                  />
                  <p className="text-xs text-muted-foreground">Staff cannot apply discounts higher than this</p>
                </div>
              </CardContent>
            </Card>

            <Card className="card-premium">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center gap-2">
                    <ShieldCheck className="w-5 h-5 text-secondary" />
                    Loyalty Discount
                  </CardTitle>
                  <Switch 
                    checked={discountConfig.loyaltyDiscountEnabled}
                    onCheckedChange={(checked) => setDiscountConfig({...discountConfig, loyaltyDiscountEnabled: checked})}
                  />
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label>Loyalty Discount Rate (%)</Label>
                  <Input 
                    type="number"
                    value={discountConfig.loyaltyDiscountRate}
                    onChange={(e) => setDiscountConfig({...discountConfig, loyaltyDiscountRate: e.target.value})}
                    disabled={!discountConfig.loyaltyDiscountEnabled}
                  />
                </div>
              </CardContent>
            </Card>

            <Card className="card-premium">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center gap-2">
                    <IndianRupee className="w-5 h-5 text-accent" />
                    First Order Discount
                  </CardTitle>
                  <Switch 
                    checked={discountConfig.firstOrderDiscount}
                    onCheckedChange={(checked) => setDiscountConfig({...discountConfig, firstOrderDiscount: checked})}
                  />
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label>First Order Discount (%)</Label>
                  <Input 
                    type="number"
                    value={discountConfig.firstOrderDiscountRate}
                    onChange={(e) => setDiscountConfig({...discountConfig, firstOrderDiscountRate: e.target.value})}
                    disabled={!discountConfig.firstOrderDiscount}
                  />
                </div>
              </CardContent>
            </Card>

            <Card className="card-premium">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center gap-2">
                    <Wallet className="w-5 h-5 text-primary" />
                    Bulk Order Discount
                  </CardTitle>
                  <Switch 
                    checked={discountConfig.bulkOrderDiscountEnabled}
                    onCheckedChange={(checked) => setDiscountConfig({...discountConfig, bulkOrderDiscountEnabled: checked})}
                  />
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label>Minimum Order Value (₹)</Label>
                  <Input 
                    type="number"
                    value={discountConfig.bulkOrderThreshold}
                    onChange={(e) => setDiscountConfig({...discountConfig, bulkOrderThreshold: e.target.value})}
                    disabled={!discountConfig.bulkOrderDiscountEnabled}
                  />
                </div>
                <div className="space-y-2">
                  <Label>Discount Rate (%)</Label>
                  <Input 
                    type="number"
                    value={discountConfig.bulkOrderDiscountRate}
                    onChange={(e) => setDiscountConfig({...discountConfig, bulkOrderDiscountRate: e.target.value})}
                    disabled={!discountConfig.bulkOrderDiscountEnabled}
                  />
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Payment Gateways Tab */}
        <TabsContent value="gateways" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Razorpay */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
            >
              <Card className="card-premium h-full">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-blue-500/10 flex items-center justify-center">
                        <CreditCard className="w-5 h-5 text-blue-500" />
                      </div>
                      <CardTitle className="text-lg">Razorpay</CardTitle>
                    </div>
                    <Switch 
                      checked={paymentGateways.razorpay.enabled}
                      onCheckedChange={() => toggleGateway('razorpay')}
                    />
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label>API Key ID</Label>
                    <Input 
                      type="password"
                      placeholder="rzp_live_xxxxx"
                      value={paymentGateways.razorpay.keyId}
                      disabled={!paymentGateways.razorpay.enabled}
                    />
                  </div>
                  <div className="flex items-center gap-2">
                    {paymentGateways.razorpay.connected ? (
                      <Badge className="bg-primary/10 text-primary border-0 gap-1">
                        <CheckCircle2 className="w-3 h-3" />
                        Connected
                      </Badge>
                    ) : (
                      <Badge variant="secondary" className="gap-1">
                        <XCircle className="w-3 h-3" />
                        Not Connected
                      </Badge>
                    )}
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* UPI */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <Card className="card-premium h-full">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-green-500/10 flex items-center justify-center">
                        <QrCode className="w-5 h-5 text-green-500" />
                      </div>
                      <CardTitle className="text-lg">UPI</CardTitle>
                    </div>
                    <Switch 
                      checked={paymentGateways.upi.enabled}
                      onCheckedChange={() => toggleGateway('upi')}
                    />
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label>UPI VPA</Label>
                    <Input 
                      placeholder="restaurant@upi"
                      value={paymentGateways.upi.vpa}
                      disabled={!paymentGateways.upi.enabled}
                    />
                  </div>
                  <Badge className="bg-primary/10 text-primary border-0 gap-1">
                    <CheckCircle2 className="w-3 h-3" />
                    Connected
                  </Badge>
                </CardContent>
              </Card>
            </motion.div>

            {/* Paytm */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <Card className="card-premium h-full">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-blue-600/10 flex items-center justify-center">
                        <Smartphone className="w-5 h-5 text-blue-600" />
                      </div>
                      <CardTitle className="text-lg">Paytm</CardTitle>
                    </div>
                    <Switch 
                      checked={paymentGateways.paytm.enabled}
                      onCheckedChange={() => toggleGateway('paytm')}
                    />
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label>Merchant ID</Label>
                    <Input 
                      placeholder="MERCHANT_ID"
                      value={paymentGateways.paytm.merchantId}
                      disabled={!paymentGateways.paytm.enabled}
                    />
                  </div>
                  <Badge variant="secondary" className="gap-1">
                    <AlertCircle className="w-3 h-3" />
                    Setup Required
                  </Badge>
                </CardContent>
              </Card>
            </motion.div>

            {/* Cash */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              <Card className="card-premium h-full">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-amber-500/10 flex items-center justify-center">
                        <IndianRupee className="w-5 h-5 text-amber-500" />
                      </div>
                      <CardTitle className="text-lg">Cash</CardTitle>
                    </div>
                    <Switch 
                      checked={paymentGateways.cash.enabled}
                      onCheckedChange={() => toggleGateway('cash')}
                    />
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    Accept cash payments at the counter
                  </p>
                  <Badge className="mt-4 bg-primary/10 text-primary border-0 gap-1">
                    <CheckCircle2 className="w-3 h-3" />
                    Always Available
                  </Badge>
                </CardContent>
              </Card>
            </motion.div>

            {/* Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
            >
              <Card className="card-premium h-full">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-purple-500/10 flex items-center justify-center">
                        <CreditCard className="w-5 h-5 text-purple-500" />
                      </div>
                      <CardTitle className="text-lg">Card (POS)</CardTitle>
                    </div>
                    <Switch 
                      checked={paymentGateways.card.enabled}
                      onCheckedChange={() => toggleGateway('card')}
                    />
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    Accept debit/credit cards via POS terminal
                  </p>
                  <Badge className="mt-4 bg-primary/10 text-primary border-0 gap-1">
                    <CheckCircle2 className="w-3 h-3" />
                    Connected
                  </Badge>
                </CardContent>
              </Card>
            </motion.div>

            {/* Digital Wallet */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
            >
              <Card className="card-premium h-full">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-pink-500/10 flex items-center justify-center">
                        <Wallet className="w-5 h-5 text-pink-500" />
                      </div>
                      <CardTitle className="text-lg">Wallets</CardTitle>
                    </div>
                    <Switch 
                      checked={paymentGateways.wallet.enabled}
                      onCheckedChange={() => toggleGateway('wallet')}
                    />
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    PhonePe, Amazon Pay, etc.
                  </p>
                  <Badge variant="secondary" className="mt-4 gap-1">
                    <AlertCircle className="w-3 h-3" />
                    Not Configured
                  </Badge>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};
