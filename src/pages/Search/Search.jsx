import "./Search.css";
import { useState } from "react";
import { FaPlus } from "react-icons/fa";

export default function Search({
  books,
  showShortDescription,
  readingList,
  setReadingList,
}) {
  const [userSearchedInput, setUserSearchedInput] = useState("");
  const [searchResult, setSearchResult] = useState([]);

  const addBookToList = (itemId, array, setArray) => {
    const currentBook = books.find((book) => book.id == itemId);
    if (array.filter((book) => currentBook.id == book.id).length > 0) {
      alert("book is already exist");
    } else {
      const newReadingList = [currentBook, ...array];
      setArray(newReadingList);
    }
  };

  function filterdSearchedBooks() {
    const temporaryBooks = books;
    temporaryBooks.forEach((element) => {
      element.author1 = element.author;
      element.author = element.author.toLowerCase();
      element.description1 = element.description;
      element.description = element.description.toLowerCase();
      element.title1 = element.title;
      element.title = element.title.toLowerCase();
    });
    const filterByTitle = temporaryBooks.filter((book) =>
      book.title.includes(userSearchedInput)
    );
    const filterByAuthor = temporaryBooks.filter((book) =>
      book.author.includes(userSearchedInput)
    );
    const filterByDescription = temporaryBooks.filter((book) =>
      book.description.includes(userSearchedInput)
    );
    let concatedArr = filterByTitle
      .concat(filterByAuthor)
      .concat(filterByDescription);
    let userSearchResult = [...new Set(concatedArr)];
    let shortDisplayResult = userSearchResult.splice(0, 10);
    setSearchResult(shortDisplayResult);
  }

  const elements = books.map((book) => (
    <div className="book-container" key={book.id}>
      <div className="book-image">
        <img src={book.imgUrl} />
      </div>
      <div className="book-details">
        <div className="book-names">
          <div className="book-title">
            <h3>{book.title}</h3>
          </div>
          <div className="book-author">
            <p>{book.author}</p>
          </div>
        </div>
        <div className="book-description">
          <div>
            <p>{showShortDescription(book.description)}</p>
          </div>
        </div>
      </div>
      <div className="book-button">
        <button
          onClick={() => {
            addBookToList(book.id, readingList, setReadingList);
          }}
        >
          <FaPlus title="Add to Reading List" />
        </button>
      </div>
    </div>
  ));
  // : null;

  const searchElements = searchResult.map((book) => (
    <div className="book-container" key={book.id}>
      <div className="book-image">
        <img src={book.imgUrl} />
      </div>
      <div className="book-details">
        <div className="book-names">
          <div className="book-title">
            <h3>{book.title}</h3>
          </div>
          <div className="book-author">
            <p>{book.author}</p>
          </div>
        </div>
        <div className="book-description">
          <div>
            <p>{showShortDescription(book.description)}</p>
          </div>
        </div>
      </div>
      <div className="book-button">
        <button
          onClick={() => {
            addBookToList(book.id, readingList, setReadingList);
          }}
        >
          <FaPlus title="Add to Reading List" />
        </button>
      </div>
    </div>
  ));

  const shortElement = elements ? elements.splice(0, 10) : null;

  return (
    <div>
      <form
        className="search-form"
        onSubmit={(e) => {
          e.preventDefault();
          filterdSearchedBooks();
          e.target[0].value = "";
        }}
      >
        <input
          type="text"
          placeholder="Search a book"
          onInput={(e) => {
            let userInput = e.target.value;
            setUserSearchedInput(userInput.toLowerCase());
          }}
        />
        <input type="submit" value="Search" />
      </form>
      <div className="search-container">
        {userSearchedInput ? searchElements : shortElement}
      </div>
    </div>
  );
}
