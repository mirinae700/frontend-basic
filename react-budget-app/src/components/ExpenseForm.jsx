import "./ExpenseForm.css";
import { MdSend } from "react-icons/md";

const ExpenseForm = ({
  typeCode,
  content,
  amount,
  handleTypeCode,
  handleContent,
  handleAmount,
  handleSubmit,
}) => {
  return (
    <form onSubmit={handleSubmit}>
      <div className="form-center">
        <div className="form-group">
          <label htmlFor="typeCode">유형</label>
          <select
            id="typeCode"
            name="typeCode"
            onChange={handleTypeCode}
            value={typeCode}
          >
            <option value="expenditure">지출</option>
            <option value="income">수입</option>
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="content">내용</label>
          <input
            type="text"
            className="form-control"
            id="content"
            name="content"
            placeholder="예) 렌트비"
            value={content}
            onChange={handleContent}
          />
        </div>
        <div className="form-group">
          <label htmlFor="amount">비용</label>
          <input
            type="number"
            className="form-control"
            id="amount"
            name="amount"
            placeholder="예) 100"
            value={amount}
            onChange={handleAmount}
          />
        </div>
      </div>
      <button type="submit" className="btn btn__primary">
        제출
        <MdSend className="btn-icon" />
      </button>
    </form>
  );
};

export default ExpenseForm;
