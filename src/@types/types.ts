export interface User {
  username: string;
  fullName: string;
  email: string;
  isVerified: boolean;
}
export interface UserContextType {
  loading: boolean;
  setLoading: (value: boolean) => void;
  user: User | null;
  setUser: (user: User | null) => void;
  logout: () => void;
}
export interface ProductDetails {
  evname: string;
  regPrice: number;
  salePrice: number;
  highResImage: string;
}
export interface Suggestion {
  name: string;
  _id: string;
}
