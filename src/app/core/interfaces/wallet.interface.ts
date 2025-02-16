export interface Wallet {
  id: string;
  name: string;
  balance: number;
}

export interface Transaction {
  id: string;
  walletId: string;
  amount: number;
  type: 'CREDIT' | 'DEBIT';
  description: string;
  date: Date;
  balance: number;
}

export interface TransactionResponse {
  data: Transaction[];
  count: number;
}

export interface WalletCredentials {
  name: string;
  balance: number;
} 