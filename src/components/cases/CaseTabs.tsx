
import { useState } from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { UserCase } from "@/types/user";
import { motion } from "framer-motion";
import { FileText, AlertTriangle, Shield, CheckCircle } from "lucide-react";

interface CaseTabsProps {
  allCases: UserCase[];
}

const CaseTabs = ({ allCases }: CaseTabsProps) => {
  const [activeTab, setActiveTab] = useState("all");

  const tabChangeHandler = (value: string) => {
    setActiveTab(value);
  };

  const resolvedCases = allCases.filter(c => c.status === "Closed");
  const escalatedCases = allCases.filter(c => c.escalatedTo && c.status !== "Closed");
  const reportedCases = allCases.filter(c => c.reportedToAuthorities);

  const fadeIn = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.5 } }
  };

  return (
    <Tabs defaultValue="all" className="w-full" onValueChange={tabChangeHandler}>
      <TabsList className="grid grid-cols-4 mb-6 bg-orange-50 p-1">
        <TabsTrigger 
          value="all" 
          className={`${activeTab === "all" ? "bg-white text-green-700 font-medium shadow-sm" : "text-orange-800"}`}
        >
          <FileText className="mr-2 h-4 w-4" />
          Case Overview
        </TabsTrigger>
        <TabsTrigger 
          value="reconciled" 
          className={`${activeTab === "reconciled" ? "bg-white text-green-700 font-medium shadow-sm" : "text-orange-800"}`}
        >
          <CheckCircle className="mr-2 h-4 w-4" />
          Reconciliations
        </TabsTrigger>
        <TabsTrigger 
          value="escalated" 
          className={`${activeTab === "escalated" ? "bg-white text-green-700 font-medium shadow-sm" : "text-orange-800"}`}
        >
          <AlertTriangle className="mr-2 h-4 w-4" />
          Escalated Cases
        </TabsTrigger>
        <TabsTrigger 
          value="reported" 
          className={`${activeTab === "reported" ? "bg-white text-green-700 font-medium shadow-sm" : "text-orange-800"}`}
        >
          <Shield className="mr-2 h-4 w-4" />
          Reported to Authorities
        </TabsTrigger>
      </TabsList>
      
      <TabsContent value="all">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={fadeIn}
          className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm"
        >
          <h3 className="text-lg font-semibold text-green-800 mb-4">All Cases</h3>
          <Table>
            <TableHeader className="bg-green-50">
              <TableRow>
                <TableHead>Case ID</TableHead>
                <TableHead>Title</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Assigned Date</TableHead>
                <TableHead>Assigned To</TableHead>
                <TableHead>Actions Taken</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {allCases.length > 0 ? (
                allCases.map((caseItem) => (
                  <TableRow key={caseItem.id}>
                    <TableCell className="font-medium">#{caseItem.id}</TableCell>
                    <TableCell>{caseItem.title}</TableCell>
                    <TableCell>
                      <Badge className={
                        caseItem.status === "Open" ? "bg-orange-100 text-orange-800 hover:bg-orange-100" :
                        caseItem.status === "In Progress" ? "bg-blue-100 text-blue-800 hover:bg-blue-100" :
                        "bg-green-100 text-green-800 hover:bg-green-100"
                      }>
                        {caseItem.status}
                      </Badge>
                    </TableCell>
                    <TableCell>{caseItem.assignedDate}</TableCell>
                    <TableCell>{caseItem.assignedTo || "Unassigned"}</TableCell>
                    <TableCell>{caseItem.actionsTaken || "None"}</TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={6} className="text-center py-4 text-gray-500">
                    No cases found
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </motion.div>
      </TabsContent>
      
      <TabsContent value="reconciled">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={fadeIn}
          className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm"
        >
          <h3 className="text-lg font-semibold text-green-800 mb-4">Reconciled Cases</h3>
          <Table>
            <TableHeader className="bg-green-50">
              <TableRow>
                <TableHead>Case ID</TableHead>
                <TableHead>Title</TableHead>
                <TableHead>Closed Date</TableHead>
                <TableHead>Reconciled By</TableHead>
                <TableHead>Resolution</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {resolvedCases.length > 0 ? (
                resolvedCases.map((caseItem) => (
                  <TableRow key={caseItem.id}>
                    <TableCell className="font-medium">#{caseItem.id}</TableCell>
                    <TableCell>{caseItem.title}</TableCell>
                    <TableCell>{caseItem.closedDate}</TableCell>
                    <TableCell className="font-medium text-green-700">{caseItem.resolvedBy || "System"}</TableCell>
                    <TableCell>{caseItem.resolution || "Case closed"}</TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={5} className="text-center py-4 text-gray-500">
                    No reconciled cases
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </motion.div>
      </TabsContent>
      
      <TabsContent value="escalated">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={fadeIn}
          className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm"
        >
          <h3 className="text-lg font-semibold text-green-800 mb-4">Escalated Cases</h3>
          <Table>
            <TableHeader className="bg-green-50">
              <TableRow>
                <TableHead>Case ID</TableHead>
                <TableHead>Title</TableHead>
                <TableHead>Escalated Date</TableHead>
                <TableHead>Escalated To</TableHead>
                <TableHead>Reason</TableHead>
                <TableHead>Current Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {escalatedCases.length > 0 ? (
                escalatedCases.map((caseItem) => (
                  <TableRow key={caseItem.id}>
                    <TableCell className="font-medium">#{caseItem.id}</TableCell>
                    <TableCell>{caseItem.title}</TableCell>
                    <TableCell>{caseItem.escalatedDate}</TableCell>
                    <TableCell>{caseItem.escalatedTo}</TableCell>
                    <TableCell>{caseItem.escalationReason}</TableCell>
                    <TableCell>
                      <Badge className="bg-orange-100 text-orange-800 hover:bg-orange-100">
                        {caseItem.status}
                      </Badge>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={6} className="text-center py-4 text-gray-500">
                    No escalated cases
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </motion.div>
      </TabsContent>
      
      <TabsContent value="reported">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={fadeIn}
          className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm"
        >
          <h3 className="text-lg font-semibold text-green-800 mb-4">Cases Reported to Authorities</h3>
          <Table>
            <TableHeader className="bg-green-50">
              <TableRow>
                <TableHead>Case ID</TableHead>
                <TableHead>Title</TableHead>
                <TableHead>Reported Date</TableHead>
                <TableHead>Authority</TableHead>
                <TableHead>Reference Number</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {reportedCases.length > 0 ? (
                reportedCases.map((caseItem) => (
                  <TableRow key={caseItem.id}>
                    <TableCell className="font-medium">#{caseItem.id}</TableCell>
                    <TableCell>{caseItem.title}</TableCell>
                    <TableCell>{caseItem.reportedDate}</TableCell>
                    <TableCell>{caseItem.reportedTo}</TableCell>
                    <TableCell>{caseItem.referenceNumber || "Pending"}</TableCell>
                    <TableCell>
                      <Badge className={
                        caseItem.status === "Closed" 
                          ? "bg-green-100 text-green-800 hover:bg-green-100"
                          : "bg-red-100 text-red-800 hover:bg-red-100"
                      }>
                        {caseItem.status === "Closed" ? "Resolved" : "Under Investigation"}
                      </Badge>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={6} className="text-center py-4 text-gray-500">
                    No cases reported to authorities
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </motion.div>
      </TabsContent>
    </Tabs>
  );
};

export default CaseTabs;
