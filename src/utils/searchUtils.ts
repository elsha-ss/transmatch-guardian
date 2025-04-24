
interface SearchableCase {
  id: number;
  title: string;
  status: string;
  assignedDate?: string;
  assignedTo?: string;
  supplier?: string;
  amount?: number;
  reference?: string;
}

export const searchCases = (cases: SearchableCase[], query: string): SearchableCase[] => {
  const searchTerm = query.toLowerCase().trim();
  
  if (!searchTerm) return cases;

  return cases.filter(caseItem => {
    // Search by case ID
    if (caseItem.id.toString().includes(searchTerm)) return true;
    
    // Search by title
    if (caseItem.title.toLowerCase().includes(searchTerm)) return true;
    
    // Search by status
    if (caseItem.status.toLowerCase().includes(searchTerm)) return true;
    
    // Search by assigned date
    if (caseItem.assignedDate?.toLowerCase().includes(searchTerm)) return true;
    
    // Search by assignee
    if (caseItem.assignedTo?.toLowerCase().includes(searchTerm)) return true;
    
    // Search by supplier
    if (caseItem.supplier?.toLowerCase().includes(searchTerm)) return true;
    
    // Search by reference
    if (caseItem.reference?.toLowerCase().includes(searchTerm)) return true;
    
    return false;
  });
};
