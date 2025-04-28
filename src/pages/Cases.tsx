
import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import PageLayout from "@/components/layout/PageLayout";
import CaseTabs from "@/components/cases/CaseTabs";
import { UserProvider, useUsers } from "@/contexts/UserContext";
import { searchCases } from "@/utils/searchUtils";

const CasesContent = () => {
  const { getAllCases } = useUsers();
  const [searchParams] = useSearchParams();
  const searchQuery = searchParams.get("search") || "";
  
  const allCases = getAllCases();
  // We need to cast the result to match the expected type for CaseTabs
  const filteredCases = searchCases(allCases, searchQuery) as any[];

  useEffect(() => {
    document.title = "Case Management | TransMatch Guardian";
  }, []);

  return (
    <PageLayout title="Case Management" description="View and manage all cases in the system">
      <CaseTabs allCases={filteredCases} />
    </PageLayout>
  );
};

const Cases = () => (
  <UserProvider>
    <CasesContent />
  </UserProvider>
);

export default Cases;
