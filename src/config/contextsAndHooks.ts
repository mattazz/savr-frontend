import { createContext } from "react";
import { UserContextType } from "../@types/types";

/// hook for user context
export const UserContext = createContext<UserContextType | null>(null);
