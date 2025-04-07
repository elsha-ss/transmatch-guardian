
import { useEffect } from "react";
import PageLayout from "@/components/layout/PageLayout";
import CaseTabs from "@/components/cases/CaseTabs";
import { UserProvider, useUsers } from "@/contexts/UserContext";

const CasesContent = () => {
  const { getAllCases } = useUsers();
  const allCases = getAllCases();

  useEffect(() => {
    document.title = "Case Management | TransMatch Guardian";
  }, []);

  return (
    <PageLayout title="Case Management" description="View and manage all cases in the system">
      <CaseTabs allCases={allCases} />
    </PageLayout>
  );
};

const Cases = () => (
  <UserProvider>
    <CasesContent />
  </UserProvider>
);

export default Cases;
