import "./App.css";
import { useEffect, useState } from "react";
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

  const [id, setId] = useState(""); // 수정된 항목의 id
  const [typeCode, setTypeCode] = useState("expenditure");
  const [content, setContent] = useState("");
  const [amount, setAmount] = useState(0);

  const [alert, setAlert] = useState({ show: false });

  const [summary, setSummary] = useState({
    income: 0,
    expenditure: 0,
    balance: 0,
  });

  const [edit, setEdit] = useState(false); // submit 버튼 이름 true일때 "수정"으로 표시

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

  const handleSummary = () => {
    const income = expenses.reduce((acc, curr) => {
      return curr.typeCode === "income" ? acc + curr.amount : acc + 0;
    }, 0);
    const expenditure = expenses.reduce((acc, curr) => {
      return curr.typeCode === "expenditure" ? acc + curr.amount : acc + 0;
    }, 0);

    setSummary({ income, expenditure, balance: income - expenditure });
  };

  const handleDelete = (id) => {
    const newExpenses = expenses.filter((expense) => expense.id !== id);
    setExpenses(newExpenses);
    handleSummary();
    console.log(summary);
  };

  const handleEdit = (id) => {
    const expense = expenses.find((item) => item.id === id);
    const { typeCode, content, amount } = expense;
    setId(id);
    setTypeCode(typeCode);
    setContent(content);
    setAmount(amount);
    setEdit(true);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (content !== "" && amount > 0) {
      if (!edit) {
        const newExpense = {
          id: crypto.randomUUID(),
          typeCode,
          content,
          amount,
        };
        const newExpenses = [...expenses, newExpense]; // 불변성 지키기 위해 새로운 목록 배열 생성
        setExpenses(newExpenses);
        handleSummary();

        handleAlert({
          type: "success",
          text: "정상적으로 추가되었습니다.",
        });
      } else {
        const newExpenses = expenses.map((item) => {
          return item.id === id ? { ...item, typeCode, content, amount } : item;
        });
        setExpenses(newExpenses);
        setEdit(false);
        handleSummary();

        handleAlert({
          type: "success",
          text: "정상적으로 수정되었습니다."
        })
      }
      // 입력란 초기화
      setTypeCode("expenditure");
      setContent("");
      setAmount(0);
    } else {
      handleAlert({
        type: "danger",
        text: "내용은 빈값일 수 없으며, 금액은 0보다 커야합니다.",
      });
    }
  };

  useEffect(() => {
    handleSummary();
  }, [expenses]); // expenses가 변경될때마다 handleSummary 실행

  return (
    <main className="main-container">
      {alert.show ? <Alert type={alert.type} text={alert.text} /> : null}
      <h1>예산 계산기</h1>
      <div className="expense-form">
        <ExpenseForm
          edit={edit}
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
        <ExpenseList
          expenses={expenses}
          handleDelete={handleDelete}
          handleEdit={handleEdit}
        />
      </div>
      <div className="summary">
        <Summary summary={summary} />
      </div>
    </main>
  );
};

export default App;
