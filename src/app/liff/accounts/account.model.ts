export interface Account {
  id: number;
  accountId: number;
  role: 'OWNER' | 'MEMBER';
  account: {
    id: number;
    type: 'PERSONAL' | 'GROUP';
    createAt: Date;
  };
}
