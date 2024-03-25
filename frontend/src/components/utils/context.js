import { createContext, useEffect } from "react";
import { useState } from "react";

export const Context = createContext([]);
export const ContextProvider = ({ children }) => {
     
  const [newCategoryData, setNewCategoryData] = useState([]);
  const [balance, setBalance] = useState();
  const [totalExpAmount, setTotalExpAmount] = useState();
  const [totalIncAmount, setTotalIncAmount] = useState();
  const [newTransactionData, setNewTransactionData] = useState([]);
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
  const userBalance = async () => {
     const userId = localStorage.getItem("id");
     try {
       const res = await fetch(
         `${process.env.NEXT_PUBLIC_ENDPOINT}/api/user/getbalance`,
         {
           method: "POST",
           cache: "no-cache",
           credentials: "same-origin",
           headers: {
             Accept: "application/json, text/plain, */*",
             "Content-Type": "application/json",
           },
           body: JSON.stringify({ id: userId }),
         }
       ).then((res) => res.json());
       console.log(res, "resamount");
       setBalance(res[0].amount === null ? 0 : res[0].amount);
     } catch (err) {
       console.log(err);
     }
   };
   useEffect(() => {
     userBalance();
   },[])

  return (
    <Context.Provider
      value={{
        newCategoryData,
        setNewCategoryData,
        totalIncAmount, setTotalIncAmount,
        totalExpAmount, setTotalExpAmount,
        newTransactionData, setNewTransactionData,
        balance, setBalance,
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
