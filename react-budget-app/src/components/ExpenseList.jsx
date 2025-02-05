import { Component } from "react";
import ExpenseItem from "./ExpenseItem";
import { MdDelete } from "react-icons/md";

export default class ExpenseList extends Component {
  render() {
    return (
      <>
        <ul className="list">
          {this.props.initialExpenses.map((expense) => (
            // JSX key 속성
            // 리액트에서 요소의 리스트를 나열할 때는 key를 넣어줘야한다.
            // key는 리액트가 변경, 추가, 제거된 항목을 파악하고 다시 랜더링할 수 있게 해준다.
            <ExpenseItem
              expense={expense}
              key={expense.id}
              handleDelete={this.props.handleDelete}
            />
          ))}
        </ul>
        <button className="btn btn__primary">
          목록 지우기
          <MdDelete className="btn-icon" />
        </button>
      </>
    );
  }
}
