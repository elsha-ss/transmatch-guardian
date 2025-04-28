
import { useState } from "react";
import { FileUpload } from "./FileUpload";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";
import { 
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger
} from "@/components/ui/accordion";
import { AlertTriangle, FileSpreadsheet } from "lucide-react";
import { toast } from "@/hooks/use-toast";

const dataTypes = [
  { 
    id: "general",
    label: "General Transaction Data",
    description: "Standard transaction data format with multiple fields",
    fields: ["Transaction ID", "Date", "Amount", "Description", "Category", "Status"]
  },
  { 
    id: "bank-deposits",
    label: "Bank Deposits & Sales Data",
    description: "Bank deposits matched with corresponding sales data",
    fields: ["Date", "Deposit Amount ($)", "Sales Reference ID", "Sales Amount ($)"]
  },
  { 
    id: "procurement",
    label: "Procurement Payments",
    description: "Vendor payments and procurement transactions",
    fields: ["Transaction ID", "Vendor", "Date", "Payment Amount ($)", "Description"]
  }
];

interface DataUploadSectionProps {
  onUploadComplete?: (stats: {
    recordsProcessed: number;
    processingTime: number;
    violations: number;
    discrepancies: number;
  }) => void;
}

const DataUploadSection = ({ onUploadComplete }: DataUploadSectionProps) => {
  const [selectedDataType, setSelectedDataType] = useState("general");
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);

  const selectedTypeData = dataTypes.find(type => type.id === selectedDataType);

  const handleUpload = async (files: File[]) => {
    if (files.length === 0) return;
    
    setIsUploading(true);
    setUploadProgress(0);

    // Simulate file upload and processing
    const totalSteps = 10;
    for (let i = 1; i <= totalSteps; i++) {
      await new Promise(resolve => setTimeout(resolve, 300));
      setUploadProgress(Math.floor((i / totalSteps) * 100));
    }

    // Simulate processing and generate mock statistics
    let mockStats;
    
    if (selectedDataType === "procurement") {
      mockStats = {
        recordsProcessed: 124,
        processingTime: 1.8,
        violations: 5,
        discrepancies: 0
      };
      
      toast({
        title: "Procurement Rules Applied",
        description: "5 transactions flagged for exceeding $500 threshold",
      });
    } else if (selectedDataType === "bank-deposits") {
      mockStats = {
        recordsProcessed: 87,
        processingTime: 1.2,
        violations: 0,
        discrepancies: 3
      };
      
      toast({
        title: "Deposit-Sales Analysis Complete",
        description: "3 deposit-sales discrepancies detected (>5% difference)",
      });
    } else {
      mockStats = {
        recordsProcessed: 156,
        processingTime: 2.1,
        violations: 2,
        discrepancies: 1
      };
    }

    setIsUploading(false);
    setUploadProgress(0);
    
    if (onUploadComplete) {
      onUploadComplete(mockStats);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Select Data Type
        </label>
        <Select value={selectedDataType} onValueChange={setSelectedDataType}>
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Select data type" />
          </SelectTrigger>
          <SelectContent>
            {dataTypes.map(type => (
              <SelectItem key={type.id} value={type.id}>
                {type.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {selectedTypeData && (
        <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
          <h3 className="font-medium mb-2">{selectedTypeData.label}</h3>
          <p className="text-sm text-gray-600 mb-4">{selectedTypeData.description}</p>
          
          <div className="mb-4">
            <h4 className="text-sm font-medium mb-2">Required Fields:</h4>
            <ul className="list-disc pl-5 text-sm text-gray-600">
              {selectedTypeData.fields.map((field, index) => (
                <li key={index}>{field}</li>
              ))}
            </ul>
          </div>

          {selectedDataType === "procurement" && (
            <div className="flex items-start p-2 bg-orange-50 rounded border border-orange-200 mt-2 mb-4">
              <AlertTriangle className="h-5 w-5 text-orange-500 mr-2 flex-shrink-0 mt-0.5" />
              <div className="text-sm text-orange-800">
                <p className="font-medium">Rule Engine Active</p>
                <p>Transactions exceeding $500 will be automatically flagged.</p>
              </div>
            </div>
          )}

          {selectedDataType === "bank-deposits" && (
            <div className="flex items-start p-2 bg-orange-50 rounded border border-orange-200 mt-2 mb-4">
              <AlertTriangle className="h-5 w-5 text-orange-500 mr-2 flex-shrink-0 mt-0.5" />
              <div className="text-sm text-orange-800">
                <p className="font-medium">Discrepancy Detection Active</p>
                <p>Deposit vs Sales discrepancies greater than 5% will be flagged.</p>
              </div>
            </div>
          )}

          <Accordion type="single" collapsible className="mb-4">
            <AccordionItem value="format">
              <AccordionTrigger className="text-sm">
                File Format Instructions
              </AccordionTrigger>
              <AccordionContent>
                <div className="p-3 bg-white rounded-md">
                  <div className="flex items-center mb-2">
                    <FileSpreadsheet className="h-4 w-4 mr-2 text-blue-500" />
                    <span className="text-sm font-medium">Accepted Formats:</span>
                  </div>
                  <p className="text-sm text-gray-600 mb-2">
                    CSV or Excel (.xlsx) files with the first row as column headers.
                  </p>
                  <p className="text-sm text-gray-600">
                    Make sure all required fields are present and correctly formatted.
                  </p>
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>

          <FileUpload 
            onUpload={handleUpload} 
            isUploading={isUploading}
            uploadProgress={uploadProgress}
            accept=".csv,.xlsx"
          />
        </div>
      )}
    </div>
  );
};

export default DataUploadSection;
