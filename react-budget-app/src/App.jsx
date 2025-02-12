import "./App.css";
import { useState } from "react";
import ExpenseForm from "./components/ExpenseForm";
import ExpenseList from "./components/ExpenseList";
import Summary from "./components/Summary";

const App = () => {
  const [expenses, setExpenses] = useState([
    { id: 1, typeCode: "income", content: "알바비 입금", amount: 1500000 },
    { id: 2, typeCode: "expenditure", content: "렌트비", amount: 185000 },
    { id: 3, typeCode: "expenditure", content: "교통비", amount: 122500 },
    { id: 4, typeCode: "expenditure", content: "식비", amount: 100000 },
  ]);

  const handleDelete = (id) => {
    const newExpenses = expenses.filter((expense) => expense.id === id);
    setExpenses(newExpenses);
  };

  return (
    <main className="main-container">
      <h1>예산 계산기</h1>
      <div className="expense-form">
        <ExpenseForm />
      </div>
      <div className="expense-list">
        <ExpenseList expenses={expenses} handleDelete={handleDelete} />
      </div>
      <div className="summary">
        <Summary />
      </div>
    </main>
  );
};

export default App;