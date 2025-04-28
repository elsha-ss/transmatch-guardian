
import { useState } from "react";
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
  AlertTriangle,
  BarChart2, 
  Download,
  Upload
} from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { toast } from "@/hooks/use-toast";

const Matching = () => {
  const [filterDialogOpen, setFilterDialogOpen] = useState(false);
  const [showOnlyFlagged, setShowOnlyFlagged] = useState(false);

  const handleApplyFilters = () => {
    setFilterDialogOpen(false);
    
    toast({
      title: "Filters Applied",
      description: showOnlyFlagged ? "Showing only flagged transactions" : "Showing all transactions",
    });
  };

  return (
    <PageLayout>
      <div className="mb-6 flex flex-wrap justify-between items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Transaction Matching</h1>
          <p className="text-gray-600">Match and reconcile transactions across systems</p>
        </div>
        
        <div className="flex gap-2">
          <Button 
            variant="outline" 
            className="flex items-center gap-2"
            onClick={() => setFilterDialogOpen(true)}
          >
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
            <TabsTrigger value="flagged" className="relative">
              Flagged
              <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-xs text-white">
                5
              </span>
            </TabsTrigger>
          </TabsList>
        </Tabs>
      </div>
      
      <div className="grid grid-cols-1 gap-6">
        <TransactionMatchingTable showOnlyFlagged={showOnlyFlagged} />
      </div>
      
      <Dialog open={filterDialogOpen} onOpenChange={setFilterDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Filter Transactions</DialogTitle>
            <DialogDescription>
              Apply filters to narrow down transaction results
            </DialogDescription>
          </DialogHeader>
          
          <div className="py-4 space-y-4">
            <div className="flex items-start space-x-2">
              <Checkbox 
                id="show-flagged" 
                checked={showOnlyFlagged}
                onCheckedChange={(checked) => setShowOnlyFlagged(checked as boolean)} 
              />
              <div className="grid gap-1.5 leading-none">
                <Label htmlFor="show-flagged" className="flex items-center gap-2">
                  <AlertTriangle className="h-4 w-4 text-red-500" />
                  Show Only Flagged Transactions
                </Label>
                <p className="text-sm text-muted-foreground">
                  Only display transactions that have been flagged by the rule engine
                </p>
              </div>
            </div>
          </div>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setFilterDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleApplyFilters}>
              Apply Filters
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </PageLayout>
  );
};

export default Matching;
