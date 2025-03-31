
import PageLayout from "@/components/layout/PageLayout";
import TransactionMatchingTable from "@/components/transactions/TransactionMatchingTable";
import { Button } from "@/components/ui/button";
import { 
  Tabs, 
  TabsContent, 
  TabsList, 
  TabsTrigger 
} from "@/components/ui/tabs";
import { 
  Filter,
  BarChart2, 
  Download,
  Upload
} from "lucide-react";

const Matching = () => {
  return (
    <PageLayout>
      <div className="mb-6 flex flex-wrap justify-between items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Transaction Matching</h1>
          <p className="text-gray-600">Match and reconcile transactions across systems</p>
        </div>
        
        <div className="flex gap-2">
          <Button variant="outline" className="flex items-center gap-2">
            <Filter className="h-4 w-4" />
            <span>Filters</span>
          </Button>
          <Button variant="outline" className="flex items-center gap-2">
            <Download className="h-4 w-4" />
            <span>Export</span>
          </Button>
          <Button variant="outline" className="flex items-center gap-2">
            <BarChart2 className="h-4 w-4" />
            <span>Analytics</span>
          </Button>
          <Button className="flex items-center gap-2">
            <Upload className="h-4 w-4" />
            <span>Import Data</span>
          </Button>
        </div>
      </div>
      
      <div className="mb-6">
        <Tabs defaultValue="all">
          <TabsList>
            <TabsTrigger value="all">All Transactions</TabsTrigger>
            <TabsTrigger value="matched">Matched</TabsTrigger>
            <TabsTrigger value="unmatched">Unmatched</TabsTrigger>
            <TabsTrigger value="flagged">Flagged</TabsTrigger>
          </TabsList>
        </Tabs>
      </div>
      
      <div className="grid grid-cols-1 gap-6">
        <TransactionMatchingTable />
      </div>
    </PageLayout>
  );
};

export default Matching;
