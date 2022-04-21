import { createContext } from "react";

const initialValue = {
  breeds: [],
};

export const BreedContext = createContext(initialValue);
