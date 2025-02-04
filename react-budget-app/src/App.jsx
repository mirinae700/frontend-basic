import "./App.css";
import { Component } from "react";
import ExpenseForm from "./components/ExpenseForm";
import ExpenseList from "./components/ExpenseList";
import Summary from "./components/Summary";

// 클래스형 컴포넌트
export default class App extends Component {
  render() {
    return (
      <main className="main-container">
        <h1>예산 계산기</h1>
        <div className="expense-form">
          <ExpenseForm />
        </div>
        <div className="expense-list">
          <ExpenseList />
        </div>
        <div className="summary">
          <Summary />
        </div>
      </main>
    );
  }
}
