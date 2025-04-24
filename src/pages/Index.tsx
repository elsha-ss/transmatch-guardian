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
import TransactionTrends from "@/components/dashboard/TransactionTrends";
import { motion } from "framer-motion";

const Index = () => {
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.4 } }
  };

  return (
    <PageLayout>
      <motion.div 
        variants={container}
        initial="hidden"
        animate="show"
      >
        <motion.div className="mb-6" variants={item}>
          <h1 className="text-2xl font-bold text-green-800">Dashboard</h1>
          <p className="text-orange-600">Welcome to TransMatch Guardian</p>
        </motion.div>
        
        <motion.div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6" variants={item}>
          <div className="border-l-4 border-l-green-500">
            <StatCard 
              title="Transactions Processed" 
              value="8,542" 
              icon={<CircleDollarSign className="h-6 w-6 text-green-600" />}
              change={12}
            />
          </div>
          
          <div className="border-l-4 border-l-orange-500">
            <StatCard 
              title="Detected Anomalies" 
              value="58" 
              icon={<AlertTriangle className="h-6 w-6 text-orange-600" />}
              change={-8}
              description="Anomalies requiring investigation"
            />
          </div>
          
          <div className="border-l-4 border-l-green-500">
            <StatCard 
              title="Average Processing Time" 
              value="1.4 min" 
              icon={<Clock className="h-6 w-6 text-green-600" />}
              change={-23}
              description="Time to reconcile transactions"
            />
          </div>
          
          <div className="border-l-4 border-l-orange-500">
            <StatCard 
              title="Active Users" 
              value="24" 
              icon={<Users className="h-6 w-6 text-orange-600" />}
              description="Users active in the last 24 hours"
            />
          </div>
        </motion.div>
        
        <motion.div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6" variants={item}>
          <div className="lg:col-span-2">
            <AlertsTable />
          </div>
          
          <div>
            <TransactionSummary />
          </div>
        </motion.div>
        
        <motion.div className="grid grid-cols-1 gap-6" variants={item}>
          <TransactionTrends />
        </motion.div>
      </motion.div>
    </PageLayout>
  );
};

export default Index;
