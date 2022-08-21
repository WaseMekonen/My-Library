import "./CompletedList.css";
import { FaTimes } from "react-icons/fa";

export default function CompletedList({ completedList, setCompletedList }) {
  const removeBook = (id) => {
    const newCompletedArr = completedList.filter((book) => {
      return book.id !== id;
    });
    setCompletedList(newCompletedArr);
  };

  const completedElement = completedList.map((book) => (
    <div key={book.id} className="completed-container">
      <div className="completed-img">
        <img src={book.imgUrl} />
      </div>
      <div className="completed-titles">
        <div>
          <h4>{book.title}</h4>
          <p>{book.author}</p>
        </div>
      </div>
      <div className="completed-btn">
        <button
          onClick={() => {
            removeBook(book.id);
          }}
        >
          <FaTimes/>
        </button>
      </div>
    </div>
  ));

  return (
    <div>
      <h1>Completed list page</h1>
      <div>{completedElement}</div>
    </div>
  );
}
