
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import PageLayout from "@/components/layout/PageLayout";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { LineChart, Line } from "recharts";
import { Download, Filter } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";

const mockTransactionData = [
  { name: "Jan", amount: 4000, count: 240 },
  { name: "Feb", amount: 3000, count: 198 },
  { name: "Mar", amount: 5000, count: 281 },
  { name: "Apr", amount: 2780, count: 189 },
  { name: "May", amount: 1890, count: 142 },
  { name: "Jun", amount: 2390, count: 164 },
  { name: "Jul", amount: 3490, count: 203 },
];

const mockTrendData = [
  { name: "Week 1", matched: 85, unmatched: 15 },
  { name: "Week 2", matched: 78, unmatched: 22 },
  { name: "Week 3", matched: 92, unmatched: 8 },
  { name: "Week 4", matched: 88, unmatched: 12 },
  { name: "Week 5", matched: 95, unmatched: 5 },
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

  return (
    <PageLayout title="Reports" description="View and export transaction reports">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Financial Reports</h1>
          <p className="text-sm text-gray-500">
            Analyze transaction trends and generate custom reports
          </p>
        </div>
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
        </div>
      </div>

      <Tabs defaultValue="transaction-summary">
        <TabsList className="mb-4">
          <TabsTrigger value="transaction-summary">Transaction Summary</TabsTrigger>
          <TabsTrigger value="matching-trends">Matching Trends</TabsTrigger>
          <TabsTrigger value="fraud-analytics">Fraud Analytics</TabsTrigger>
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
          <div className="flex justify-center items-center h-[400px]">
            <div className="text-center">
              <h3 className="text-lg font-medium text-gray-600 mb-2">Fraud Analytics Coming Soon</h3>
              <p className="text-sm text-gray-500 max-w-md">
                Enhanced fraud detection analytics and reporting capabilities will be available in the next release.
              </p>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </PageLayout>
  );
};

export default Reports;
