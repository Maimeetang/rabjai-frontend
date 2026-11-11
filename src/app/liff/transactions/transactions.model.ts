export interface Transaction {
  id: number;
  accountId: number;
  categoryId: number;
  userId: string;
  amount: string;
  description: string;
  transactionDate: string;
  category: {
    id: number;
    name: string;
    type: 'INCOME' | 'EXPENSE';
  };
}
