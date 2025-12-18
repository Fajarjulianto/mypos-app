export interface User {
  id: number;
  name: string;
  email: string;
  role: string; //'admin' | 'cashier'
  storeName?: string;
}

export interface AuthContextType {
  user: User | null;
  token: string | null;
  isLoading: boolean;
  login: (token: string, user: User) => void;
  logout: () => void;
}
