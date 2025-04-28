
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

export const searchCases = (cases: any[], query: string): any[] => {
  const searchTerm = query.toLowerCase().trim();
  
  if (!searchTerm) return cases;

  return cases.filter(caseItem => {
    // Search by case ID
    if (caseItem.id && caseItem.id.toString().includes(searchTerm)) return true;
    
    // Search by title
    if (caseItem.title && caseItem.title.toLowerCase().includes(searchTerm)) return true;
    
    // Search by status
    if (caseItem.status && caseItem.status.toLowerCase().includes(searchTerm)) return true;
    
    // Search by assigned date
    if (caseItem.assignedDate && caseItem.assignedDate.toLowerCase().includes(searchTerm)) return true;
    
    // Search by assignee
    if (caseItem.assignedTo && caseItem.assignedTo.toLowerCase().includes(searchTerm)) return true;
    
    // Search by supplier
    if (caseItem.supplier && caseItem.supplier.toLowerCase().includes(searchTerm)) return true;
    
    // Search by reference
    if (caseItem.reference && caseItem.reference.toLowerCase().includes(searchTerm)) return true;
    
    return false;
  });
};

// Add a rule engine for procurement data
export const applyProcurementRules = (data: any[]): { violations: any[], processingTime: number } => {
  const startTime = performance.now();
  
  // Rule: Flag transactions exceeding $500 USD
  const violations = data.filter(transaction => {
    const amount = parseFloat(transaction.amount?.toString().replace('$', '')) || 0;
    return amount > 500;
  });
  
  const endTime = performance.now();
  const processingTime = (endTime - startTime) / 1000; // Convert to seconds
  
  return { violations, processingTime };
};

// Check for deposit vs sales discrepancies
export const checkDepositSalesDiscrepancies = (data: any[]): { discrepancies: any[], processingTime: number } => {
  const startTime = performance.now();
  
  // Rule: Flag deposit-sales discrepancies > 5%
  const discrepancies = data.filter(item => {
    const depositAmount = parseFloat(item.depositAmount?.toString().replace('$', '')) || 0;
    const salesAmount = parseFloat(item.salesAmount?.toString().replace('$', '')) || 0;
    
    if (salesAmount === 0) return false;
    
    const difference = Math.abs(depositAmount - salesAmount);
    const percentageDifference = (difference / salesAmount) * 100;
    
    return percentageDifference > 5;
  });
  
  const endTime = performance.now();
  const processingTime = (endTime - startTime) / 1000; // Convert to seconds
  
  return { discrepancies, processingTime };
};
