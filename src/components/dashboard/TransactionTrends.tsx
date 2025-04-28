
import { useState } from "react";
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer 
} from "recharts";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { motion } from "framer-motion";
import { AlertTriangle } from "lucide-react";
import { Progress } from "@/components/ui/progress";

// Sample data - in a real app, this would come from an API
const monthlyData = [
  { month: "Jan", transactions: 420, anomalies: 12, matched: 380, pending: 28, violations: 5 },
  { month: "Feb", transactions: 460, anomalies: 15, matched: 410, pending: 35, violations: 8 },
  { month: "Mar", transactions: 518, anomalies: 22, matched: 446, pending: 50, violations: 12 },
  { month: "Apr", transactions: 610, anomalies: 18, matched: 542, pending: 50, violations: 10 },
  { month: "May", transactions: 680, anomalies: 23, matched: 610, pending: 47, violations: 15 },
  { month: "Jun", transactions: 720, anomalies: 30, matched: 650, pending: 40, violations: 18 },
];

const weeklyData = [
  { week: "Week 1", transactions: 180, anomalies: 8, matched: 162, pending: 10, violations: 4 },
  { week: "Week 2", transactions: 165, anomalies: 5, matched: 150, pending: 10, violations: 3 },
  { week: "Week 3", transactions: 190, anomalies: 9, matched: 171, pending: 10, violations: 5 },
  { week: "Week 4", transactions: 185, anomalies: 8, matched: 167, pending: 10, violations: 6 },
];

const dailyData = [
  { day: "Mon", transactions: 38, anomalies: 2, matched: 34, pending: 2, violations: 1 },
  { day: "Tue", transactions: 42, anomalies: 1, matched: 39, pending: 2, violations: 2 },
  { day: "Wed", transactions: 35, anomalies: 0, matched: 33, pending: 2, violations: 0 },
  { day: "Thu", transactions: 29, anomalies: 3, matched: 24, pending: 2, violations: 1 },
  { day: "Fri", transactions: 41, anomalies: 2, matched: 37, pending: 2, violations: 2 },
  { day: "Sat", transactions: 12, anomalies: 0, matched: 10, pending: 2, violations: 0 },
  { day: "Sun", transactions: 8, anomalies: 0, matched: 8, pending: 0, violations: 0 },
];

const TransactionTrends = () => {
  const [timeframe, setTimeframe] = useState("monthly");
  
  const data = timeframe === "monthly" 
    ? monthlyData 
    : timeframe === "weekly" 
      ? weeklyData 
      : dailyData;
  
  const xAxisKey = timeframe === "monthly" 
    ? "month" 
    : timeframe === "weekly" 
      ? "week" 
      : "day";
  
  const chartVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.6 }
    }
  };

  // Calculate total violations for current month/period
  const currentPeriodViolations = data.reduce((sum, item) => sum + item.violations, 0);
  
  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-green-800 mb-3 sm:mb-0">Transaction Trends</h3>
        
        <Tabs defaultValue="monthly" onValueChange={setTimeframe} className="w-full sm:w-auto">
          <TabsList className="bg-orange-50">
            <TabsTrigger 
              value="daily" 
              className={timeframe === "daily" ? "bg-white text-green-700 font-medium" : "text-orange-800"}
            >
              Daily
            </TabsTrigger>
            <TabsTrigger 
              value="weekly" 
              className={timeframe === "weekly" ? "bg-white text-green-700 font-medium" : "text-orange-800"}
            >
              Weekly
            </TabsTrigger>
            <TabsTrigger 
              value="monthly" 
              className={timeframe === "monthly" ? "bg-white text-green-700 font-medium" : "text-orange-800"}
            >
              Monthly
            </TabsTrigger>
          </TabsList>
        </Tabs>
      </div>
      
      <motion.div 
        variants={chartVariants}
        initial="hidden"
        animate="visible"
        key={timeframe}
        className="w-full h-80"
      >
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={data}
            margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
            <XAxis dataKey={xAxisKey} tick={{ fill: "#666" }} />
            <YAxis tick={{ fill: "#666" }} />
            <Tooltip 
              contentStyle={{ 
                backgroundColor: "white", 
                borderColor: "#e5e7eb", 
                borderRadius: "0.375rem",
                boxShadow: "0 1px 3px 0 rgba(0, 0, 0, 0.1)" 
              }} 
            />
            <Legend 
              wrapperStyle={{ paddingTop: "10px" }}
            />
            <Line 
              type="monotone" 
              dataKey="transactions" 
              stroke="#16a34a" 
              strokeWidth={2} 
              activeDot={{ r: 6 }} 
              name="Total Transactions"
            />
            <Line 
              type="monotone" 
              dataKey="matched" 
              stroke="#0ea5e9" 
              strokeWidth={2} 
              activeDot={{ r: 6 }} 
              name="Matched"
            />
            <Line 
              type="monotone" 
              dataKey="pending" 
              stroke="#f97316" 
              strokeWidth={2} 
              activeDot={{ r: 6 }} 
              name="Pending"
            />
            <Line 
              type="monotone" 
              dataKey="anomalies" 
              stroke="#ef4444" 
              strokeWidth={2} 
              activeDot={{ r: 6 }} 
              name="Anomalies"
            />
            <Line 
              type="monotone" 
              dataKey="violations" 
              stroke="#9333ea" 
              strokeWidth={2} 
              activeDot={{ r: 6 }} 
              name="Rule Violations"
            />
          </LineChart>
        </ResponsiveContainer>
      </motion.div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-6 gap-4 mt-6">
        <div className="bg-green-50 rounded-lg p-3 border border-green-100 xl:col-span-1">
          <h4 className="text-sm font-medium text-green-700">Total Transactions</h4>
          <p className="text-2xl font-bold text-green-800 mt-1">
            {data.reduce((sum, item) => sum + item.transactions, 0)}
          </p>
          <p className="text-xs text-green-600 mt-1">
            +12.5% from previous period
          </p>
        </div>
        
        <div className="bg-blue-50 rounded-lg p-3 border border-blue-100 xl:col-span-1">
          <h4 className="text-sm font-medium text-blue-700">Matched</h4>
          <p className="text-2xl font-bold text-blue-800 mt-1">
            {data.reduce((sum, item) => sum + item.matched, 0)}
          </p>
          <p className="text-xs text-blue-600 mt-1">
            +15.3% from previous period
          </p>
        </div>
        
        <div className="bg-orange-50 rounded-lg p-3 border border-orange-100 xl:col-span-1">
          <h4 className="text-sm font-medium text-orange-700">Pending Review</h4>
          <p className="text-2xl font-bold text-orange-800 mt-1">
            {data.reduce((sum, item) => sum + item.pending, 0)}
          </p>
          <p className="text-xs text-orange-600 mt-1">
            -2.1% from previous period
          </p>
        </div>
        
        <div className="bg-red-50 rounded-lg p-3 border border-red-100 xl:col-span-1">
          <h4 className="text-sm font-medium text-red-700">Anomalies</h4>
          <p className="text-2xl font-bold text-red-800 mt-1">
            {data.reduce((sum, item) => sum + item.anomalies, 0)}
          </p>
          <p className="text-xs text-red-600 mt-1">
            +8.7% from previous period
          </p>
        </div>
        
        <div className="bg-purple-50 rounded-lg p-3 border border-purple-100 xl:col-span-1">
          <div className="flex items-center gap-2">
            <AlertTriangle className="h-4 w-4 text-purple-600" />
            <h4 className="text-sm font-medium text-purple-700">Procurement Violations</h4>
          </div>
          <p className="text-2xl font-bold text-purple-800 mt-1">
            {currentPeriodViolations}
          </p>
          <p className="text-xs text-purple-600 mt-1">
            +24% from previous period
          </p>
        </div>
        
        <div className="bg-gray-50 rounded-lg p-3 border border-gray-200 xl:col-span-1">
          <h4 className="text-sm font-medium text-gray-700">Avg. Analysis Time</h4>
          <div className="flex items-end gap-1 mt-1">
            <p className="text-2xl font-bold text-gray-800">1.7</p>
            <p className="text-sm text-gray-600 mb-0.5">seconds</p>
          </div>
          <div className="mt-2">
            <Progress value={85} className="h-1.5" />
            <p className="text-xs text-gray-500 mt-1">Goal: 2.0s</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TransactionTrends;
