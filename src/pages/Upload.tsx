import PageLayout from "@/components/layout/PageLayout";
import FileUpload from "@/components/upload/FileUpload";
import { 
  Tabs, 
  TabsContent, 
  TabsList, 
  TabsTrigger 
} from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  FileSpreadsheet, 
  FileJson, 
  Database, 
  Wifi, 
  Info,
  AlertTriangle,
  Download
} from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { toast } from "@/hooks/use-toast";
import DataUploadSection from "@/components/upload/DataUploadSection";
import { downloadTemplate } from "@/utils/templateGenerator";

const Upload = () => {
  const navigate = useNavigate();
  const [processingStats, setProcessingStats] = useState<{
    recordsProcessed: number;
    processingTime: number;
    violations: number;
    discrepancies: number;
  } | null>(null);

  const handleUploadComplete = (stats: {
    recordsProcessed: number;
    processingTime: number;
    violations: number;
    discrepancies: number;
  }) => {
    setProcessingStats(stats);
    toast({
      title: "Data Processing Complete",
      description: `Processed ${stats.recordsProcessed} records in ${stats.processingTime.toFixed(1)}s. Found ${stats.violations} violations and ${stats.discrepancies} discrepancies.`,
    });
  };

  const handleTemplateDownload = (templateType: string) => {
    downloadTemplate(templateType);
    toast({
      title: "Template Downloaded",
      description: "You can now fill in your data using this template."
    });
  };

  return (
    <PageLayout>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Data Upload</h1>
        <p className="text-gray-600">Import transaction data for matching and reconciliation</p>
      </div>
      
      <Tabs defaultValue="file-upload" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="file-upload" className="flex items-center gap-2">
            <FileSpreadsheet className="h-4 w-4" />
            <span>File Upload</span>
          </TabsTrigger>
          <TabsTrigger value="api-integration" className="flex items-center gap-2">
            <Wifi className="h-4 w-4" />
            <span>API Integration</span>
          </TabsTrigger>
          <TabsTrigger value="database-connect" className="flex items-center gap-2">
            <Database className="h-4 w-4" />
            <span>Database Connect</span>
          </TabsTrigger>
          <TabsTrigger value="templates" className="flex items-center gap-2">
            <FileJson className="h-4 w-4" />
            <span>Templates</span>
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="file-upload">
          <Card>
            <CardHeader>
              <CardTitle>Upload Files</CardTitle>
              <CardDescription>
                Import transaction data from CSV, Excel, JSON, or XML files
              </CardDescription>
            </CardHeader>
            <CardContent>
              <DataUploadSection onUploadComplete={handleUploadComplete} />
              
              {processingStats && (
                <div className="mt-6 p-4 bg-green-50 border border-green-100 rounded-lg">
                  <h3 className="font-medium text-green-800 mb-2">Processing Results:</h3>
                  <ul className="space-y-1 text-sm">
                    <li className="flex justify-between">
                      <span>Records Processed:</span>
                      <span className="font-medium">{processingStats.recordsProcessed}</span>
                    </li>
                    <li className="flex justify-between">
                      <span>Processing Time:</span>
                      <span className="font-medium">{processingStats.processingTime.toFixed(1)}s</span>
                    </li>
                    <Separator className="my-2" />
                    <li className="flex justify-between">
                      <span>Rule Violations:</span>
                      <span className="font-medium text-red-600">{processingStats.violations}</span>
                    </li>
                    <li className="flex justify-between">
                      <span>Deposit-Sales Discrepancies:</span>
                      <span className="font-medium text-orange-600">{processingStats.discrepancies}</span>
                    </li>
                  </ul>
                  <div className="mt-4">
                    <Button 
                      size="sm" 
                      variant="outline" 
                      className="mr-2"
                      onClick={() => toast({
                        title: "Report Generated",
                        description: "Your violation report has been downloaded."
                      })}
                    >
                      Download Violation Report
                    </Button>
                    <Button 
                      size="sm" 
                      onClick={() => navigate("/transactions/matching")}
                    >
                      View Transactions
                    </Button>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="api-integration">
          <Card>
            <CardHeader>
              <CardTitle>API Integration</CardTitle>
              <CardDescription>
                Connect directly to your existing systems via API
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="p-6 bg-gray-50 rounded-lg border border-gray-200">
                <div className="flex items-start">
                  <Info className="h-5 w-5 text-guardian-600 mr-3 mt-0.5" />
                  <div>
                    <h4 className="text-base font-medium text-gray-800 mb-2">API Integration Coming Soon</h4>
                    <p className="text-sm text-gray-600 mb-4">
                      Direct integration with popular POS systems, bank feeds, ERP software, and procurement platforms 
                      will be available in the next release.
                    </p>
                    <div className="p-3 bg-white rounded border border-gray-200">
                      <h5 className="text-sm font-medium text-gray-700 mb-2">Supported Integrations (Coming Soon):</h5>
                      <ul className="text-sm text-gray-600 space-y-1 list-disc pl-5">
                        <li>QuickBooks, Xero, and other accounting systems</li>
                        <li>Major banking APIs (Chase, Bank of America, Wells Fargo)</li>
                        <li>SAP, Oracle, and other ERP systems</li>
                        <li>Square, Shopify, and other POS systems</li>
                        <li>Custom API endpoints via secure webhooks</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="database-connect">
          <Card>
            <CardHeader>
              <CardTitle>Database Connection</CardTitle>
              <CardDescription>
                Connect directly to your database for real-time transaction monitoring
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="p-6 bg-gray-50 rounded-lg border border-gray-200">
                <div className="flex items-start">
                  <Info className="h-5 w-5 text-guardian-600 mr-3 mt-0.5" />
                  <div>
                    <h4 className="text-base font-medium text-gray-800 mb-2">Database Connection Coming Soon</h4>
                    <p className="text-sm text-gray-600 mb-4">
                      Direct database connections will be available in the next release, allowing real-time 
                      transaction monitoring and reconciliation without manual uploads.
                    </p>
                    <div className="p-3 bg-white rounded border border-gray-200">
                      <h5 className="text-sm font-medium text-gray-700 mb-2">Supported Databases (Coming Soon):</h5>
                      <ul className="text-sm text-gray-600 space-y-1 list-disc pl-5">
                        <li>PostgreSQL, MySQL, MariaDB</li>
                        <li>Microsoft SQL Server</li>
                        <li>Oracle Database</li>
                        <li>MongoDB</li>
                        <li>Custom database connections via JDBC/ODBC</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="templates">
          <Card>
            <CardHeader>
              <CardTitle>File Templates</CardTitle>
              <CardDescription>
                Download templates for properly formatted data imports
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div 
                  className="p-4 bg-white rounded-lg border border-gray-200 flex items-start hover:border-guardian-400 hover:shadow-sm transition-all cursor-pointer"
                  onClick={() => handleTemplateDownload('general')}
                >
                  <FileSpreadsheet className="h-8 w-8 text-green-600 mr-3" />
                  <div className="flex-grow">
                    <h4 className="text-base font-medium text-gray-800">CSV Template</h4>
                    <p className="text-sm text-gray-600 mt-1 mb-3">Standard CSV format for transaction data</p>
                    <p className="text-xs text-gray-500">Contains columns for transaction ID, date, amount, vendor, etc.</p>
                  </div>
                  <Download className="h-5 w-5 text-gray-400 hover:text-green-600 transition-colors" />
                </div>
                
                <div 
                  className="p-4 bg-white rounded-lg border border-gray-200 flex items-start hover:border-guardian-400 hover:shadow-sm transition-all cursor-pointer"
                  onClick={() => handleTemplateDownload('general')}
                >
                  <FileSpreadsheet className="h-8 w-8 text-green-600 mr-3" />
                  <div className="flex-grow">
                    <h4 className="text-base font-medium text-gray-800">Excel Template</h4>
                    <p className="text-sm text-gray-600 mt-1 mb-3">Excel format with data validation</p>
                    <p className="text-xs text-gray-500">Includes multiple sheets for different transaction types</p>
                  </div>
                  <Download className="h-5 w-5 text-gray-400 hover:text-green-600 transition-colors" />
                </div>
                
                <div 
                  className="p-4 bg-white rounded-lg border border-gray-200 flex items-start hover:border-guardian-400 hover:shadow-sm transition-all cursor-pointer"
                  onClick={() => handleTemplateDownload('bank-deposits')}
                >
                  <FileSpreadsheet className="h-8 w-8 text-blue-600 mr-3" />
                  <div className="flex-grow">
                    <h4 className="text-base font-medium text-gray-800">Bank Deposits Template</h4>
                    <p className="text-sm text-gray-600 mt-1 mb-3">Template for bank deposit data</p>
                    <p className="text-xs text-gray-500">Fields: Date, Deposit Amount, Sales Reference ID, Sales Amount</p>
                  </div>
                  <Download className="h-5 w-5 text-gray-400 hover:text-blue-600 transition-colors" />
                </div>
                
                <div 
                  className="p-4 bg-white rounded-lg border border-gray-200 flex items-start hover:border-guardian-400 hover:shadow-sm transition-all cursor-pointer"
                  onClick={() => handleTemplateDownload('procurement')}
                >
                  <FileSpreadsheet className="h-8 w-8 text-blue-600 mr-3" />
                  <div className="flex-grow">
                    <h4 className="text-base font-medium text-gray-800">Procurement Payments</h4>
                    <p className="text-sm text-gray-600 mt-1 mb-3">Template for procurement payments</p>
                    <p className="text-xs text-gray-500">Fields: Transaction ID, Vendor, Date, Payment Amount, Description</p>
                  </div>
                  <Download className="h-5 w-5 text-gray-400 hover:text-blue-600 transition-colors" />
                </div>
                
                <div 
                  className="p-4 bg-white rounded-lg border border-gray-200 flex items-start hover:border-guardian-400 hover:shadow-sm transition-all cursor-pointer"
                  onClick={() => handleTemplateDownload('general')}
                >
                  <FileJson className="h-8 w-8 text-blue-600 mr-3" />
                  <div className="flex-grow">
                    <h4 className="text-base font-medium text-gray-800">JSON Template</h4>
                    <p className="text-sm text-gray-600 mt-1 mb-3">Standard JSON structure for API data</p>
                    <p className="text-xs text-gray-500">Compatible with most financial systems and APIs</p>
                  </div>
                  <Download className="h-5 w-5 text-gray-400 hover:text-blue-600 transition-colors" />
                </div>
                
                <div 
                  className="p-4 bg-white rounded-lg border border-gray-200 flex items-start hover:border-guardian-400 hover:shadow-sm transition-all cursor-pointer"
                  onClick={() => handleTemplateDownload('general')}
                >
                  <FileJson className="h-8 w-8 text-blue-600 mr-3" />
                  <div className="flex-grow">
                    <h4 className="text-base font-medium text-gray-800">XML Template</h4>
                    <p className="text-sm text-gray-600 mt-1 mb-3">XML schema for legacy system integration</p>
                    <p className="text-xs text-gray-500">Compatible with SOAP APIs and older financial systems</p>
                  </div>
                  <Download className="h-5 w-5 text-gray-400 hover:text-blue-600 transition-colors" />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </PageLayout>
  );
};

export default Upload;
