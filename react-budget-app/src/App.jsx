import "./App.css";
import { useState } from "react";
import ExpenseForm from "./components/ExpenseForm";
import ExpenseList from "./components/ExpenseList";
import Summary from "./components/Summary";
import Alert from "./components/Alert";

const App = () => {
  const [expenses, setExpenses] = useState([
    { id: 1, typeCode: "income", content: "알바비 입금", amount: 1500000 },
    { id: 2, typeCode: "expenditure", content: "렌트비", amount: 185000 },
    { id: 3, typeCode: "expenditure", content: "교통비", amount: 122500 },
    { id: 4, typeCode: "expenditure", content: "식비", amount: 100000 },
  ]);

  const [typeCode, setTypeCode] = useState("expenditure");
  const [content, setContent] = useState("");
  const [amount, setAmount] = useState(0);

  const [alert, setAlert] = useState({ show: false });

  const handleTypeCode = (event) => {
    setTypeCode(event.target.value);
  };
  const handleContent = (event) => {
    setContent(event.target.value);
  };
  const handleAmount = (event) => {
    setAmount(event.target.valueAsNumber);
  };

  const handleAlert = ({ type, text }) => {
    setAlert({ show: true, type, text });
    setTimeout(() => {
      setAlert({ show: false });
    }, 7000);
  };

  const handleDelete = (id) => {
    const newExpenses = expenses.filter((expense) => expense.id !== id);
    setExpenses(newExpenses);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (content !== "" && amount > 0) {
      const newExpense = { id: crypto.randomUUID(), typeCode, content, amount };
      const newExpenses = [...expenses, newExpense]; // 불변성 지키기 위해 새로운 목록 배열 생성
      setExpenses(newExpenses);

      // 입력란 초기화
      setTypeCode("expenditure");
      setContent("");
      setAmount(0);

      handleAlert({
        type: "success",
        text: "정상적으로 추가되었습니다.",
      });
    } else {
      handleAlert({
        type: "danger",
        text: "내용은 빈값일 수 없으며, 금액은 0보다 커야합니다.",
      });
    }
  };

  return (
    <main className="main-container">
      {alert.show ? <Alert type={alert.type} text={alert.text} /> : null}
      <h1>예산 계산기</h1>
      <div className="expense-form">
        <ExpenseForm
          typeCode={typeCode}
          content={content}
          amount={amount}
          handleTypeCode={handleTypeCode}
          handleContent={handleContent}
          handleAmount={handleAmount}
          handleSubmit={handleSubmit}
        />
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
