
import { 
  BarChart2, 
  CircleDollarSign, 
  AlertTriangle, 
  Clock, 
  Users
} from "lucide-react";
import PageLayout from "@/components/layout/PageLayout";
import StatCard from "@/components/dashboard/StatCard";
import AlertsTable from "@/components/dashboard/AlertsTable";
import TransactionSummary from "@/components/dashboard/TransactionSummary";

const Index = () => {
  return (
    <PageLayout>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Dashboard</h1>
        <p className="text-gray-600">Welcome to TransMatch Guardian</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
        <StatCard 
          title="Transactions Processed" 
          value="8,542" 
          icon={<CircleDollarSign className="h-6 w-6" />}
          change={12}
        />
        
        <StatCard 
          title="Detected Anomalies" 
          value="58" 
          icon={<AlertTriangle className="h-6 w-6" />}
          change={-8}
          description="Anomalies requiring investigation"
        />
        
        <StatCard 
          title="Average Processing Time" 
          value="1.4 min" 
          icon={<Clock className="h-6 w-6" />}
          change={-23}
          description="Time to reconcile transactions"
        />
        
        <StatCard 
          title="Active Users" 
          value="24" 
          icon={<Users className="h-6 w-6" />}
          description="Users active in the last 24 hours"
        />
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        <div className="lg:col-span-2">
          <AlertsTable />
        </div>
        
        <div>
          <TransactionSummary />
        </div>
      </div>
      
      <div className="grid grid-cols-1 gap-6">
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex items-center mb-4">
            <BarChart2 className="h-5 w-5 text-guardian-600 mr-2" />
            <h3 className="text-lg font-semibold text-gray-800">Transaction Trends</h3>
          </div>
          
          <div className="bg-gray-100 rounded-lg p-6 text-center">
            <p className="text-gray-500">Transaction activity chart will appear here</p>
            <p className="text-sm text-gray-400 mt-2">Showing transaction volumes and anomaly detection over time</p>
          </div>
        </div>
      </div>
    </PageLayout>
  );
};

export default Index;
