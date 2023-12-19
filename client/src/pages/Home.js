import React from "react";
import TransactionForm from "../components/TransactionForm";
import TransactionList from "../components/TransactionList";
import ErrorBoundary from "./ErrorBoundary";
import Container from "@mui/material/Container";
import { useState, useEffect } from "react";
import Cookies from "js-cookie";
import TransactionChart from "../components/TransactionChart";

export default function Home() {
  const [transactions, setTransactions] = useState([]);
  const [editTransaction, setEditTransaction] = useState({});

  useEffect(() => {
    fetchTransactions();
  }, []);

  async function fetchTransactions() {
    const token = Cookies.get("token");
    const res = await fetch(`${process.env.REACT_APP_API_URL}/transaction`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const { data } = await res.json();
    setTransactions(data);
    }

  return (
    <ErrorBoundary>
      <Container>
        <TransactionChart data = {transactions}/>
        <TransactionForm
          fetchTransactions={fetchTransactions}
          editTransaction={editTransaction}
        />

        <TransactionList
          data ={transactions}
          fetchTransactions={fetchTransactions}
          setEditTransaction={setEditTransaction}
        />
      </Container>
    </ErrorBoundary>
  );
}



// import React from "react";
// import TransactionForm from "../components/TransactionForm";
// import TransactionList from "../components/TransactionList";
// import Container from "@mui/material/Container";
// import { useState, useEffect } from "react";
// import Cookies from "js-cookie";


// export default function Home() {

//     const [transactions, setTransactions] = useState([]);
//     const [editTransaction, setEditTransaction] = useState({});
    
//     useEffect(() => {
//         fetchTransactions();
//     }, []);

//     async function fetchTransactions() {
//       const token = Cookies.get("token");
//       const res = await fetch(`${process.env.REACT_APP_API_URL}/transaction`,{
//           headers:{
//             Authorization: `Bearer ${token}`
//           }
//         });
//         const { data } = await res.json();
//         setTransactions(data);
//     }
    

//     return(
//       <Container>
//         <TransactionForm 
//           fetchTransactions={fetchTransactions}
//           editTransaction={editTransaction}
//         />
        
//         <TransactionList 
//           transactions={transactions} 
//           fetchTransactions={fetchTransactions}
//           setEditTransaction={setEditTransaction}
//         />
//       </Container>
//       );

 
// }
