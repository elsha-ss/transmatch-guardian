
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import PageLayout from "@/components/layout/PageLayout";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { LineChart, Line } from "recharts";
import { Download, Filter, Upload, TrendingUp, TrendingDown, AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";

// Mock data for transactions
const mockTransactionData = [
  { name: "Jan", amount: 4000, count: 240 },
  { name: "Feb", amount: 3000, count: 198 },
  { name: "Mar", amount: 5000, count: 281 },
  { name: "Apr", amount: 2780, count: 189 },
  { name: "May", amount: 1890, count: 142 },
  { name: "Jun", amount: 2390, count: 164 },
  { name: "Jul", amount: 3490, count: 203 },
];

// Mock data for matching trends
const mockTrendData = [
  { name: "Week 1", matched: 85, unmatched: 15 },
  { name: "Week 2", matched: 78, unmatched: 22 },
  { name: "Week 3", matched: 92, unmatched: 8 },
  { name: "Week 4", matched: 88, unmatched: 12 },
  { name: "Week 5", matched: 95, unmatched: 5 },
];

// Mock data for fraud alerts
const mockFraudData = [
  { month: "Jan", suspicious: 12, confirmed: 3, falsePositive: 9 },
  { month: "Feb", suspicious: 18, confirmed: 5, falsePositive: 13 },
  { month: "Mar", suspicious: 14, confirmed: 4, falsePositive: 10 },
  { month: "Apr", suspicious: 22, confirmed: 8, falsePositive: 14 },
  { month: "May", suspicious: 17, confirmed: 6, falsePositive: 11 },
  { month: "Jun", suspicious: 28, confirmed: 12, falsePositive: 16 },
];

// Mock data for alert trends
const mockAlertTrends = [
  { category: "Missing Transactions", current: 35, previous: 28, change: "+25%" },
  { category: "Duplicate Payments", current: 14, previous: 19, change: "-26%" },
  { category: "Unusual Activity", current: 22, previous: 15, change: "+47%" },
  { category: "Reconciliation Errors", current: 16, previous: 21, change: "-24%" },
  { category: "Fraud Attempts", current: 8, previous: 3, change: "+167%" },
];

const Reports = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Set page title
    document.title = "Reports | TransMatch Guardian";
  }, []);

  const handleGenerateReport = () => {
    toast({
      title: "Report Generated",
      description: "Your report has been generated and is ready for download.",
    });
  };

  const handleDownload = (type: string) => {
    toast({
      title: `Downloading ${type} Report`,
      description: "Your report will be downloaded shortly.",
    });
  };

  const handleImportData = () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.csv,.xlsx,.json';
    input.onchange = (e) => {
      const target = e.target as HTMLInputElement;
      if (target.files && target.files.length > 0) {
        const file = target.files[0];
        toast({
          title: "Data Import Started",
          description: `Importing data from ${file.name}`,
        });
        
        // Simulate successful import after 2 seconds
        setTimeout(() => {
          toast({
            title: "Data Import Complete",
            description: "Your data has been successfully imported and is ready for analysis.",
          });
        }, 2000);
      }
    };
    input.click();
  };

  return (
    <PageLayout title="Financial Reports" description="Analyze transaction trends and generate custom reports">
      <div className="flex items-center justify-between mb-6">
        <div className="flex gap-3">
          <Button variant="outline" size="sm" onClick={() => toast({ 
            title: "Filters",
            description: "Report filtering options coming soon" 
          })}>
            <Filter className="h-4 w-4 mr-2" />
            Filter
          </Button>
          <Button size="sm" onClick={handleGenerateReport}>
            <Download className="h-4 w-4 mr-2" />
            Generate Report
          </Button>
          <Button variant="outline" size="sm" onClick={handleImportData}>
            <Upload className="h-4 w-4 mr-2" />
            Import Data
          </Button>
        </div>
      </div>

      <Tabs defaultValue="transaction-summary">
        <TabsList className="mb-4">
          <TabsTrigger value="transaction-summary">Transaction Summary</TabsTrigger>
          <TabsTrigger value="matching-trends">Matching Trends</TabsTrigger>
          <TabsTrigger value="fraud-analytics">Fraud Analytics</TabsTrigger>
          <TabsTrigger value="alert-trends">Alert Trends</TabsTrigger>
        </TabsList>
        
        <TabsContent value="transaction-summary">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <Card>
              <CardHeader>
                <CardTitle>Transaction Volume</CardTitle>
                <CardDescription>
                  Monthly transaction volume for the current year
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={mockTransactionData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="amount" name="Amount ($)" fill="#4f46e5" />
                  </BarChart>
                </ResponsiveContainer>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="mt-4" 
                  onClick={() => handleDownload("Transaction Volume")}
                >
                  <Download className="h-4 w-4 mr-2" />
                  Download
                </Button>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Transaction Count</CardTitle>
                <CardDescription>
                  Number of transactions processed monthly
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={mockTransactionData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="count" name="Count" fill="#10b981" />
                  </BarChart>
                </ResponsiveContainer>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="mt-4" 
                  onClick={() => handleDownload("Transaction Count")}
                >
                  <Download className="h-4 w-4 mr-2" />
                  Download
                </Button>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="matching-trends">
          <Card>
            <CardHeader>
              <CardTitle>Matching Success Rate</CardTitle>
              <CardDescription>
                Weekly matching success rate for the past 5 weeks
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={400}>
                <LineChart data={mockTrendData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line 
                    type="monotone" 
                    dataKey="matched" 
                    name="Matched %" 
                    stroke="#4f46e5" 
                    strokeWidth={2} 
                  />
                  <Line 
                    type="monotone" 
                    dataKey="unmatched" 
                    name="Unmatched %" 
                    stroke="#ef4444" 
                    strokeWidth={2} 
                  />
                </LineChart>
              </ResponsiveContainer>
              <Button 
                variant="ghost" 
                size="sm" 
                className="mt-4" 
                onClick={() => handleDownload("Matching Trends")}
              >
                <Download className="h-4 w-4 mr-2" />
                Download
              </Button>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="fraud-analytics">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <Card>
              <CardHeader>
                <CardTitle>Fraud Alert Distribution</CardTitle>
                <CardDescription>
                  Monthly distribution of fraud alerts by category
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={mockFraudData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="suspicious" name="Suspicious Activity" fill="#fbbf24" />
                    <Bar dataKey="confirmed" name="Confirmed Fraud" fill="#ef4444" />
                    <Bar dataKey="falsePositive" name="False Positive" fill="#10b981" />
                  </BarChart>
                </ResponsiveContainer>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="mt-4" 
                  onClick={() => handleDownload("Fraud Distribution")}
                >
                  <Download className="h-4 w-4 mr-2" />
                  Download
                </Button>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Fraud Detection Rate</CardTitle>
                <CardDescription>
                  Percentage of fraud detected over time
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={mockFraudData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line 
                      type="monotone" 
                      dataKey="confirmed" 
                      name="Confirmed Fraud" 
                      stroke="#ef4444" 
                      strokeWidth={2} 
                    />
                    <Line 
                      type="monotone" 
                      dataKey="suspicious" 
                      name="Suspicious Activity" 
                      stroke="#fbbf24" 
                      strokeWidth={2} 
                    />
                  </LineChart>
                </ResponsiveContainer>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="mt-4" 
                  onClick={() => handleDownload("Fraud Detection")}
                >
                  <Download className="h-4 w-4 mr-2" />
                  Download
                </Button>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="alert-trends">
          <Card>
            <CardHeader>
              <CardTitle>Alert Category Trends</CardTitle>
              <CardDescription>
                Comparative analysis of alert categories with percentage changes
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {mockAlertTrends.map((alert) => (
                  <div key={alert.category} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg border border-gray-200">
                    <div className="flex items-center">
                      <AlertTriangle className="h-5 w-5 text-amber-500 mr-3" />
                      <div>
                        <h4 className="text-sm font-medium text-gray-900">{alert.category}</h4>
                        <p className="text-xs text-gray-500 mt-1">Current period: {alert.current} alerts</p>
                      </div>
                    </div>
                    <div className="flex flex-col items-end">
                      <div className="flex items-center">
                        {alert.change.startsWith('+') ? (
                          <TrendingUp className="h-4 w-4 text-red-500 mr-1" />
                        ) : (
                          <TrendingDown className="h-4 w-4 text-green-500 mr-1" />
                        )}
                        <span 
                          className={`text-sm font-semibold ${
                            alert.change.startsWith('+') ? 'text-red-500' : 'text-green-500'
                          }`}
                        >
                          {alert.change}
                        </span>
                      </div>
                      <p className="text-xs text-gray-500 mt-1">Previous: {alert.previous} alerts</p>
                    </div>
                  </div>
                ))}
              </div>
              <Button 
                variant="ghost" 
                size="sm" 
                className="mt-6" 
                onClick={() => handleDownload("Alert Trends")}
              >
                <Download className="h-4 w-4 mr-2" />
                Download Report
              </Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </PageLayout>
  );
};

export default Reports;
