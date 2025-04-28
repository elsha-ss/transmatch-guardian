
import { saveAs } from 'file-saver';

// Helper function to generate CSV content
const generateCSV = (headers: string[], rows: string[][]) => {
  const headerRow = headers.join(',');
  const dataRows = rows.map(row => row.join(','));
  return [headerRow, ...dataRows].join('\n');
};

// Templates with dummy data
const templates = {
  general: {
    filename: 'general_transaction_data_template.csv',
    headers: ['Transaction ID', 'Date', 'Amount', 'Description', 'Category', 'Status'],
    data: [
      ['TRX-001', '2025-04-15', '1250.00', 'Office Supplies', 'Expenses', 'Completed'],
      ['TRX-002', '2025-04-16', '780.50', 'Client Meeting', 'Entertainment', 'Completed'],
      ['TRX-003', '2025-04-18', '2500.00', 'Software License', 'IT', 'Pending']
    ]
  },
  'bank-deposits': {
    filename: 'bank_deposits_sales_template.csv',
    headers: ['Date', 'Deposit Amount ($)', 'Sales Reference ID', 'Sales Amount ($)'],
    data: [
      ['2025-04-10', '4500.00', 'SALE-001', '4500.00'],
      ['2025-04-11', '3250.75', 'SALE-002', '3200.00'],
      ['2025-04-12', '1800.00', 'SALE-003', '1950.00']
    ]
  },
  procurement: {
    filename: 'procurement_payments_template.csv',
    headers: ['Transaction ID', 'Vendor', 'Date', 'Payment Amount ($)', 'Description'],
    data: [
      ['PRC-001', 'Office Depot', '2025-04-05', '450.00', 'Office Furniture'],
      ['PRC-002', 'Dell', '2025-04-07', '2200.00', 'Laptop Computers'],
      ['PRC-003', 'Staples', '2025-04-09', '540.00', 'Office Supplies']
    ]
  }
};

export const downloadTemplate = (templateType: string) => {
  const template = templates[templateType as keyof typeof templates];
  
  if (!template) {
    console.error('Template not found');
    return;
  }

  const csvContent = generateCSV(template.headers, template.data);
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8' });
  saveAs(blob, template.filename);
};
