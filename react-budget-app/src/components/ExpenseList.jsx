import { Component } from "react";
import ExpenseItem from "./ExpenseItem";
import { MdDelete } from "react-icons/md";

export default class ExpenseList extends Component {
  render() {
    return (
      <>
        <ul className="list">
          <ExpenseItem />
        </ul>
        <button className="btn btn__primary">
          목록 지우기
          <MdDelete className="btn-icon" />
        </button>
      </>
    );
  }
}
