
import { useState } from "react";
import { Check, AlertTriangle, ExternalLink, FileText, BarChart2, FileSearch } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

// Sample transaction data
const transactions = [
  {
    id: "TX-98712",
    source: "POS System",
    reference: "INV-2023-4532",
    date: "2023-09-15",
    amount: 2450.00,
    vendor: "Acme Supplies",
    status: "matched",
    matchConfidence: 100,
    flagReason: null,
    matched: {
      id: "BNK-77123",
      source: "Bank Statement",
      date: "2023-09-16",
      amount: 2450.00
    }
  },
  {
    id: "TX-98713",
    source: "Invoice System",
    reference: "INV-2023-4533",
    date: "2023-09-15",
    amount: 1875.50,
    vendor: "Office Solutions",
    status: "matched",
    matchConfidence: 98,
    flagReason: null,
    matched: {
      id: "BNK-77124",
      source: "Bank Statement",
      date: "2023-09-17",
      amount: 1875.50
    }
  },
  {
    id: "TX-98714",
    source: "Invoice System",
    reference: "INV-2023-4534",
    date: "2023-09-16",
    amount: 3200.00,
    vendor: "Tech Partners Inc.",
    status: "partial_match",
    matchConfidence: 85,
    flagReason: null,
    matched: {
      id: "BNK-77125",
      source: "Bank Statement",
      date: "2023-09-18",
      amount: 3150.00
    }
  },
  {
    id: "TX-98715",
    source: "POS System",
    reference: "INV-2023-4535",
    date: "2023-09-17",
    amount: 945.75,
    vendor: "Global Distribution",
    status: "flagged",
    flagReason: "Procurement Rule Violation: Amount exceeds $500",
    matchConfidence: 0
  },
  {
    id: "TX-98716",
    source: "Invoice System",
    reference: "INV-2023-4536",
    date: "2023-09-18",
    amount: 12340.00,
    vendor: "Enterprise Solutions",
    status: "flagged",
    flagReason: "Procurement Rule Violation: Amount exceeds $500",
    matchConfidence: 67,
    matched: {
      id: "BNK-77126",
      source: "Bank Statement",
      date: "2023-09-19",
      amount: 12340.00
    }
  },
  {
    id: "TX-98717",
    source: "Bank Deposits",
    reference: "DEP-2023-0437",
    date: "2023-09-20",
    amount: 3570.00,
    vendor: "Sales Revenue",
    status: "flagged",
    flagReason: "Deposit-Sales Mismatch: 8.2% difference",
    matchConfidence: 92,
    matched: {
      id: "SLS-88412",
      source: "Sales Records",
      date: "2023-09-20",
      amount: 3300.00
    }
  }
];

const getStatusBadge = (status: string) => {
  switch (status) {
    case "matched":
      return <Badge className="bg-green-100 text-green-800 hover:bg-green-200 border-green-200">Matched</Badge>;
    case "partial_match":
      return <Badge className="bg-amber-100 text-amber-800 hover:bg-amber-200 border-amber-200">Partial Match</Badge>;
    case "unmatched":
      return <Badge className="bg-gray-100 text-gray-800 hover:bg-gray-200 border-gray-200">Unmatched</Badge>;
    case "flagged":
      return <Badge className="bg-red-100 text-red-800 hover:bg-red-200 border-red-200">Flagged</Badge>;
    default:
      return <Badge variant="outline">Unknown</Badge>;
  }
};

interface TransactionMatchingTableProps {
  showOnlyFlagged?: boolean;
}

const TransactionMatchingTable = ({ showOnlyFlagged = false }: TransactionMatchingTableProps) => {
  const [selectedTransaction, setSelectedTransaction] = useState<string | null>(null);
  
  const filteredTransactions = showOnlyFlagged 
    ? transactions.filter(t => t.status === "flagged") 
    : transactions;
  
  return (
    <div className="bg-white rounded-lg shadow-sm overflow-hidden">
      <div className="p-4 border-b border-gray-200 flex justify-between items-center flex-wrap gap-3">
        <div>
          <h3 className="text-lg font-semibold text-gray-800">Transaction Matching</h3>
          <p className="text-sm text-gray-500">Review and confirm transaction matches</p>
        </div>
        
        <div className="flex gap-2">
          <Button size="sm" variant="outline" className="flex items-center gap-1">
            <FileText className="h-4 w-4" />
            Export
          </Button>
          <Button size="sm" variant="outline" className="flex items-center gap-1">
            <BarChart2 className="h-4 w-4" />
            Analytics
          </Button>
        </div>
      </div>
      
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Transaction ID</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Source</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Vendor</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Match Confidence</th>
              <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 bg-white">
            {filteredTransactions.map((transaction) => (
              <tr 
                key={transaction.id} 
                className={cn(
                  "hover:bg-gray-50 cursor-pointer",
                  selectedTransaction === transaction.id ? "bg-guardian-50" : "",
                  transaction.status === "flagged" ? "bg-red-50" : ""
                )}
                onClick={() => setSelectedTransaction(
                  selectedTransaction === transaction.id ? null : transaction.id
                )}
              >
                <td className="px-4 py-3 whitespace-nowrap">
                  <div className="flex items-center">
                    <div className="text-sm font-medium text-guardian-700">{transaction.id}</div>
                  </div>
                </td>
                <td className="px-4 py-3 whitespace-nowrap">
                  <div className="text-sm text-gray-900">{transaction.source}</div>
                  <div className="text-xs text-gray-500">{transaction.reference}</div>
                </td>
                <td className="px-4 py-3 whitespace-nowrap">
                  <div className="text-sm text-gray-900">{transaction.date}</div>
                </td>
                <td className="px-4 py-3 whitespace-nowrap">
                  <div className="text-sm text-gray-900">{transaction.vendor}</div>
                </td>
                <td className="px-4 py-3 whitespace-nowrap">
                  <div className="text-sm font-medium text-gray-900">
                    ${transaction.amount.toFixed(2)}
                  </div>
                </td>
                <td className="px-4 py-3 whitespace-nowrap">
                  {getStatusBadge(transaction.status)}
                </td>
                <td className="px-4 py-3 whitespace-nowrap">
                  <div className="flex items-center">
                    <div className="w-16 bg-gray-200 rounded-full h-2 mr-2">
                      <div 
                        className={cn(
                          "h-2 rounded-full",
                          transaction.matchConfidence >= 90 
                            ? "bg-green-500" 
                            : transaction.matchConfidence >= 70 
                              ? "bg-yellow-500" 
                              : "bg-red-500"
                        )}
                        style={{ width: `${transaction.matchConfidence}%` }}
                      ></div>
                    </div>
                    <span className="text-xs text-gray-500">{transaction.matchConfidence}%</span>
                  </div>
                </td>
                <td className="px-4 py-3 whitespace-nowrap text-center">
                  <div className="flex justify-center space-x-1">
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <FileSearch className="h-4 w-4 text-guardian-600" />
                    </Button>
                    {transaction.status === "matched" || transaction.status === "partial_match" ? (
                      <Button variant="ghost" size="icon" className="h-8 w-8 text-green-600">
                        <Check className="h-4 w-4" />
                      </Button>
                    ) : null}
                    {transaction.status === "flagged" && (
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        className="h-8 w-8 text-red-600"
                        title={transaction.flagReason || ""}
                      >
                        <AlertTriangle className="h-4 w-4" />
                      </Button>
                    )}
                  </div>
                </td>
              </tr>
            ))}
            {selectedTransaction && (
              <tr className="bg-gray-50">
                <td colSpan={8} className="px-4 py-3">
                  <div className="text-sm">
                    {(() => {
                      const transaction = transactions.find(t => t.id === selectedTransaction);
                      if (!transaction) return null;
                      
                      if (transaction.flagReason) {
                        return (
                          <div className="p-3 bg-red-50 border border-red-200 rounded flex items-start">
                            <AlertTriangle className="h-5 w-5 text-red-500 mr-2 mt-0.5" />
                            <div>
                              <p className="font-medium text-red-800">Rule Violation Detected</p>
                              <p className="text-red-700">{transaction.flagReason}</p>
                            </div>
                          </div>
                        );
                      }
                      
                      if (transaction.matched) {
                        return (
                          <div className="p-3 bg-blue-50 border border-blue-200 rounded">
                            <p className="font-medium text-blue-800">Matched Transaction Details</p>
                            <div className="mt-2 space-y-1">
                              <p className="text-blue-700">ID: {transaction.matched.id}</p>
                              <p className="text-blue-700">Source: {transaction.matched.source}</p>
                              <p className="text-blue-700">Date: {transaction.matched.date}</p>
                              <p className="text-blue-700">Amount: ${transaction.matched.amount.toFixed(2)}</p>
                            </div>
                          </div>
                        );
                      }
                      
                      return (
                        <div className="p-3 bg-gray-100 border border-gray-200 rounded">
                          <p>No additional details available</p>
                        </div>
                      );
                    })()}
                  </div>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TransactionMatchingTable;
