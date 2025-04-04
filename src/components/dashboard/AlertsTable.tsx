
import { useState } from "react";
import { AlertTriangle, AlertCircle, ArrowRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { toast } from "@/hooks/use-toast";
import ReviewAlertDialog from "@/components/alerts/ReviewAlertDialog";

// Sample data
const alerts = [
  {
    id: 1,
    title: "Duplicate invoice detected",
    severity: "high",
    description: "Invoice #INV-2023-0042 appears to be a duplicate of #INV-2023-0039",
    timestamp: "2 hours ago",
    vendor: "Acme Supplies",
    amount: "$2,450.00"
  },
  {
    id: 2,
    title: "Unusual payment term modification",
    severity: "medium",
    description: "Payment terms changed from Net-30 to Net-15 without approval",
    timestamp: "5 hours ago",
    vendor: "TechPartners Inc.",
    amount: "$8,750.00"
  },
  {
    id: 3,
    title: "Potential price inflation",
    severity: "high",
    description: "Unit price 27% above market average for similar products",
    timestamp: "Yesterday",
    vendor: "Global Distribution Co.",
    amount: "$12,340.00"
  },
  {
    id: 4,
    title: "Bank account change",
    severity: "medium",
    description: "Vendor bank account details modified before payment",
    timestamp: "Yesterday",
    vendor: "Office Solutions LLC",
    amount: "$5,230.00"
  },
  {
    id: 5,
    title: "Unmatched transaction",
    severity: "low",
    description: "Bank deposit does not match any recorded sales or invoices",
    timestamp: "2 days ago",
    vendor: "Unknown",
    amount: "$875.50"
  }
];

const getSeverityIcon = (severity: string) => {
  switch (severity) {
    case "high":
      return <AlertTriangle className="h-4 w-4 text-alert-high" />;
    case "medium":
      return <AlertTriangle className="h-4 w-4 text-alert-medium" />;
    case "low":
      return <AlertCircle className="h-4 w-4 text-alert-low" />;
    default:
      return <AlertCircle className="h-4 w-4 text-gray-400" />;
  }
};

const getSeverityBadge = (severity: string) => {
  switch (severity) {
    case "high":
      return <Badge variant="destructive">High</Badge>;
    case "medium":
      return <Badge variant="outline" className="bg-amber-50 text-amber-700 border-amber-200">Medium</Badge>;
    case "low":
      return <Badge variant="outline" className="bg-yellow-50 text-yellow-700 border-yellow-200">Low</Badge>;
    default:
      return <Badge variant="outline">Unknown</Badge>;
  }
};

const AlertsTable = () => {
  const [reviewAlert, setReviewAlert] = useState<{ id: number; title: string } | null>(null);

  const handleReviewClick = (id: number, title: string) => {
    setReviewAlert({ id, title });
  };

  const handleCloseReview = () => {
    setReviewAlert(null);
  };

  return (
    <div className="bg-white rounded-lg shadow-sm overflow-hidden">
      <div className="p-4 border-b border-gray-200 flex justify-between items-center">
        <h3 className="text-lg font-semibold text-gray-800">Recent Fraud Alerts</h3>
        <Button
          variant="ghost"
          size="sm"
          className="text-guardian-600 hover:text-guardian-800 flex items-center gap-1"
          asChild
        >
          <Link to="/alerts">
            View all <ArrowRight className="h-4 w-4 ml-1" />
          </Link>
        </Button>
      </div>
      
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Alert</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Severity</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Vendor</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Time</th>
              <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 bg-white">
            {alerts.map((alert) => (
              <tr key={alert.id} className="hover:bg-gray-50">
                <td className="px-4 py-3 whitespace-nowrap">
                  <div className="flex items-center">
                    <div className="mr-2">
                      {getSeverityIcon(alert.severity)}
                    </div>
                    <div>
                      <div className="text-sm font-medium text-gray-900">{alert.title}</div>
                      <div className="text-xs text-gray-500">{alert.description}</div>
                    </div>
                  </div>
                </td>
                <td className="px-4 py-3 whitespace-nowrap">
                  {getSeverityBadge(alert.severity)}
                </td>
                <td className="px-4 py-3 whitespace-nowrap">
                  <div className="text-sm text-gray-900">{alert.vendor}</div>
                </td>
                <td className="px-4 py-3 whitespace-nowrap">
                  <div className="text-sm text-gray-900">{alert.amount}</div>
                </td>
                <td className="px-4 py-3 whitespace-nowrap">
                  <div className="text-sm text-gray-500">{alert.timestamp}</div>
                </td>
                <td className="px-4 py-3 whitespace-nowrap text-right">
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className="text-guardian-600 hover:text-guardian-800"
                    onClick={() => handleReviewClick(alert.id, alert.title)}
                  >
                    Review
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {reviewAlert && (
        <ReviewAlertDialog
          isOpen={!!reviewAlert}
          onClose={handleCloseReview}
          alertId={reviewAlert.id}
          alertTitle={reviewAlert.title}
        />
      )}
    </div>
  );
};

export default AlertsTable;
