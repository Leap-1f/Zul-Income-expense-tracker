import { createContext } from "react";
import { useState } from "react";

export const Context = createContext([]);
export const ContextProvider = ({ children }) => {
  const [newCategoryData, setNewCategoryData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showAddCategory, setShowAddCategory] = useState(false);
  const [showAddCategoryIcons, setShowAddCategoryIcons] = useState(false);
  const [signUpUserInfo, setSignUpUserInfo] = useState({
    name: "",
    email: "",
    password: "",
    currencyType: "MNT",
    amount: 0,
  });
  const startLoading = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  };
  return (
    <Context.Provider
      value={{
        newCategoryData,
        setNewCategoryData,
        isLoading,
        signUpUserInfo,
        showAddCategory,
        setShowAddCategory,
        showAddCategoryIcons,
        setShowAddCategoryIcons,
        setSignUpUserInfo,
        startLoading,
      }}
    >
      {children}
    </Context.Provider>
  );
};
