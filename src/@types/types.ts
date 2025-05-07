export interface User {
  username: string;
  fullName: string;
  email: string;
  isVerified: boolean;
  id: string;
  role: string;
}
export interface UserContextType {
  loading: boolean;
  setLoading: (value: boolean) => void;
  user: User | null;
  /**
   * This is change state function for the value of user globally
   * Remember to call your redirect function after this if you would like to redirect after setting up the new value of the user
   */
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
