import "./App.css";
import { Component } from "react";
import ExpenseForm from "./components/ExpenseForm";
import ExpenseList from "./components/ExpenseList";
import Summary from "./components/Summary";

// 클래스형 컴포넌트
export default class App extends Component {
  // props를 통해 컴포넌트 간 데이터 전달하기
  // 1. 상속하는 부모 컴포넌트로부터 자녀 컴포넌트에 데이터 등을 전달하는 방법
  // 2. 읽기 전용(immutable)으로 자녀 컴포넌트에서는 변하지 않는다.
  //    (변경 하려면 부모 컴포넌트에서 state를 변경시켜줘야 한다.)
  constructor() {
    super();

    this.state = {
      // state를 통해 데이터(상태)를 변경할 수 있게된다.
      expenses: [
        { id: 1, typeCode: "income", content: "알바비 입금", amount: 1500000 },
        { id: 2, typeCode: "expenditure", content: "렌트비", amount: 185000 },
        { id: 3, typeCode: "expenditure", content: "교통비", amount: 122500 },
        { id: 4, typeCode: "expenditure", content: "식비", amount: 100000 },
      ],
      summary: {
        income: 1500000,
        expenditure: 407500,
        balance: 1092500,
      },
    };
  }

  handleDelete = (id) => {
    this.setState(
      (prevState) => ({
        expenses: prevState.expenses.filter((expense) => expense.id !== id),
      }),
      () => {
        this.calcSummary(); // 상태 업데이트 후에 호출
      }
    );
  };

  calcSummary = () => {
    const income = this.calcSumByType("income");
    const expenditure = this.calcSumByType("expenditure");

    this.setState({
      summary: {
        income,
        expenditure,
        balance: income - expenditure,
      },
    });
  };

  calcSumByType = (type) => {
    return this.state.expenses
      .filter((expense) => expense.typeCode === type)
      .reduce((sum, expense) => sum + expense.amount, 0);
  };

  render() {
    return (
      <main className="main-container">
        <h1>예산 계산기</h1>
        <div className="expense-form">
          <ExpenseForm />
        </div>
        <div className="expense-list">
          <ExpenseList
            initialExpenses={this.state.expenses}
            handleDelete={this.handleDelete}
          />
        </div>
        <div className="summary">
          <Summary summary={this.state.summary} />
        </div>
      </main>
    );
  }
}
