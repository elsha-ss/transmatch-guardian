
import { useState } from "react";
import PageLayout from "@/components/layout/PageLayout";
import { Button } from "@/components/ui/button";
import { 
  AlertTriangle, 
  Filter, 
  Search,
  CheckCircle,
  Clock, 
  XCircle,
  Download
} from "lucide-react";
import { toast } from "@/hooks/use-toast";
import ReviewAlertDialog from "@/components/alerts/ReviewAlertDialog";

// Sample data
const alertsData = [
  {
    id: 1,
    title: "Duplicate invoice detected",
    severity: "high",
    description: "Invoice #INV-2023-0042 appears to be a duplicate of #INV-2023-0039",
    timestamp: "2 hours ago",
    vendor: "Acme Supplies",
    amount: "$2,450.00",
    status: "pending"
  },
  {
    id: 2,
    title: "Unusual payment term modification",
    severity: "medium",
    description: "Payment terms changed from Net-30 to Net-15 without approval",
    timestamp: "5 hours ago",
    vendor: "TechPartners Inc.",
    amount: "$8,750.00",
    status: "pending"
  },
  {
    id: 3,
    title: "Potential price inflation",
    severity: "high",
    description: "Unit price 27% above market average for similar products",
    timestamp: "Yesterday",
    vendor: "Global Distribution Co.",
    amount: "$12,340.00",
    status: "pending"
  },
  {
    id: 4,
    title: "Bank account change",
    severity: "medium",
    description: "Vendor bank account details modified before payment",
    timestamp: "Yesterday",
    vendor: "Office Solutions LLC",
    amount: "$5,230.00",
    status: "resolved"
  },
  {
    id: 5,
    title: "Unmatched transaction",
    severity: "low",
    description: "Bank deposit does not match any recorded sales or invoices",
    timestamp: "2 days ago",
    vendor: "Unknown",
    amount: "$875.50",
    status: "resolved"
  },
  {
    id: 6,
    title: "Price variance above threshold",
    severity: "medium",
    description: "Invoice price for office supplies 18% higher than contracted rate",
    timestamp: "3 days ago",
    vendor: "Supply Chain Partners",
    amount: "$3,125.00",
    status: "pending"
  },
  {
    id: 7,
    title: "Approval bypass detected",
    severity: "high",
    description: "Purchase order created and approved by same user, violating separation of duties",
    timestamp: "4 days ago",
    vendor: "Logistics Experts Co.",
    amount: "$15,890.00",
    status: "pending"
  },
  {
    id: 8,
    title: "Invoice without purchase order",
    severity: "medium",
    description: "Payment processed without matching purchase order reference",
    timestamp: "5 days ago",
    vendor: "Marketing Services Inc.",
    amount: "$7,450.00",
    status: "investigating"
  }
];

const getSeverityIcon = (severity: string) => {
  switch (severity) {
    case "high":
      return <AlertTriangle className="h-4 w-4 text-alert-high" />;
    case "medium":
      return <AlertTriangle className="h-4 w-4 text-alert-medium" />;
    case "low":
      return <AlertTriangle className="h-4 w-4 text-alert-low" />;
    default:
      return <AlertTriangle className="h-4 w-4 text-gray-400" />;
  }
};

const getStatusBadge = (status: string) => {
  switch (status) {
    case "resolved":
      return (
        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
          <CheckCircle className="h-3 w-3 mr-1" />
          Resolved
        </span>
      );
    case "investigating":
      return (
        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
          <Clock className="h-3 w-3 mr-1" />
          Investigating
        </span>
      );
    case "pending":
      return (
        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
          <XCircle className="h-3 w-3 mr-1" />
          Pending
        </span>
      );
    default:
      return (
        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
          Unknown
        </span>
      );
  }
};

const Alerts = () => {
  const [activeFilter, setActiveFilter] = useState("all");
  const [reviewAlert, setReviewAlert] = useState<{ id: number; title: string } | null>(null);
  
  const filteredAlerts = activeFilter === "all" 
    ? alertsData 
    : alertsData.filter(alert => alert.status === activeFilter);
  
  const handleReviewAlert = (id: number, title: string) => {
    setReviewAlert({ id, title });
  };

  const handleCloseReview = () => {
    setReviewAlert(null);
  };

  const handleDownloadAllReports = () => {
    toast({
      title: "Downloading reports",
      description: "All alert reports are being compiled for download",
    });
    
    // Simulate download delay
    setTimeout(() => {
      toast({
        title: "Reports ready",
        description: "All alert reports have been downloaded",
      });
    }, 1500);
  };

  return (
    <PageLayout>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Fraud Alerts</h1>
        <p className="text-gray-600">Review and manage potential fraud cases</p>
      </div>
      
      <div className="bg-white rounded-lg shadow-sm mb-6">
        <div className="p-4 border-b border-gray-200">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                className="pl-10 block w-full rounded-md border-gray-300 shadow-sm focus:border-guardian-500 focus:ring focus:ring-guardian-500 focus:ring-opacity-50"
                placeholder="Search alerts..."
              />
            </div>
            
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-500">Filter:</span>
              <Button 
                variant={activeFilter === "all" ? "default" : "outline"} 
                size="sm"
                onClick={() => setActiveFilter("all")}
              >
                All
              </Button>
              <Button 
                variant={activeFilter === "pending" ? "default" : "outline"} 
                size="sm"
                onClick={() => setActiveFilter("pending")}
                className={activeFilter === "pending" ? "" : "text-red-600 border-red-200 hover:bg-red-50"}
              >
                Pending
                <span className="ml-1 bg-red-100 text-red-800 px-1.5 py-0.5 rounded-full text-xs">
                  {alertsData.filter(alert => alert.status === "pending").length}
                </span>
              </Button>
              <Button 
                variant={activeFilter === "investigating" ? "default" : "outline"} 
                size="sm"
                onClick={() => setActiveFilter("investigating")}
                className={activeFilter === "investigating" ? "" : "text-blue-600 border-blue-200 hover:bg-blue-50"}
              >
                Investigating
              </Button>
              <Button 
                variant={activeFilter === "resolved" ? "default" : "outline"} 
                size="sm"
                onClick={() => setActiveFilter("resolved")}
                className={activeFilter === "resolved" ? "" : "text-green-600 border-green-200 hover:bg-green-50"}
              >
                Resolved
              </Button>
            </div>
          </div>
        </div>
        
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Alert</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Vendor</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Time</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Action</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredAlerts.map((alert) => (
                <tr key={alert.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="flex-shrink-0">
                        {getSeverityIcon(alert.severity)}
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">{alert.title}</div>
                        <div className="text-xs text-gray-500">{alert.description}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{alert.vendor}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{alert.amount}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {getStatusBadge(alert.status)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{alert.timestamp}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className="text-guardian-600 hover:text-guardian-900"
                      onClick={() => handleReviewAlert(alert.id, alert.title)}
                    >
                      Review
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        {filteredAlerts.length === 0 && (
          <div className="py-8 text-center">
            <AlertTriangle className="h-12 w-12 text-gray-400 mx-auto mb-3" />
            <h3 className="text-lg font-medium text-gray-900">No alerts found</h3>
            <p className="text-gray-500 mt-2">
              {activeFilter === "all" 
                ? "There are no fraud alerts in the system." 
                : `There are no ${activeFilter} alerts at this time.`}
            </p>
          </div>
        )}
        
        <div className="p-4 border-t border-gray-200 flex justify-end">
          <Button 
            variant="outline" 
            size="sm" 
            className="flex items-center gap-2"
            onClick={handleDownloadAllReports}
          >
            <Download className="h-4 w-4" />
            Download All Reports
          </Button>
        </div>
      </div>
      
      {reviewAlert && (
        <ReviewAlertDialog
          isOpen={!!reviewAlert}
          onClose={handleCloseReview}
          alertId={reviewAlert.id}
          alertTitle={reviewAlert.title}
        />
      )}
    </PageLayout>
  );
};

export default Alerts;
