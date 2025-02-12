import ExpenseItem from "./ExpenseItem";
import { MdDelete } from "react-icons/md";

const ExpenseList = ({ expenses, handleDelete, handleEdit, clearItems }) => {
  return (
    <>
      <ul className="list">
        {expenses.map((expense) => (
          // JSX key 속성
          // 리액트에서 요소의 리스트를 나열할 때는 key를 넣어줘야한다.
          // key는 리액트가 변경, 추가, 제거된 항목을 파악하고 다시 랜더링할 수 있게 해준다.
          <ExpenseItem
            expense={expense}
            key={expense.id}
            handleDelete={handleDelete}
            handleEdit={handleEdit}
          />
        ))}
      </ul>
      {expenses.length > 0 && (
        <button className="btn btn__primary" onClick={clearItems}>
          목록 지우기
          <MdDelete className="btn-icon" />
        </button>
      )}
    </>
  );
};

export default ExpenseList;
