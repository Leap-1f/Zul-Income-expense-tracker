import { createContext } from "react";
import { useState } from "react";

export const Context = createContext([]);
export const ContextProvider = ({children}) => {
     const [isLoading, setIsLoading] = useState(false);
     const startLoading = () => {
          setIsLoading(true);
          setTimeout(() => {
            setIsLoading(false);
          }, 1000);
        };
     return (
          <Context.Provider value={{isLoading, startLoading}}>{children}</Context.Provider>
     )
}