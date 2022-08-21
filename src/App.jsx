import "./App.css";
import Home from "./pages/Home/Home";
import Login from "./pages/Login/Login";
import LogOut from "./components/LogOut/LogOut";
import Register from "./pages/Register/Register";
import Search from "./pages/Search/Search";
import ReadingList from "./pages/ReadingList/ReadingList";
import CompletedList from "./pages/CompletedList/CompletedList";
import { BrowserRouter, Switch, Route, Link, Redirect } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import Details from "./components/Details/Details";

function App() {
  const [auth, setAuth] = useState(
    localStorage.getItem("auth")
      ? JSON.parse(localStorage.getItem("auth"))
      : null
  );
  const [books, setBooks] = useState([]);
  const [readingList, setReadingList] = useState(
    localStorage.getItem("readingList")
      ? JSON.parse(localStorage.getItem("readingList"))
      : []
  );
  const [completedList, setCompletedList] = useState(
    localStorage.getItem("completedList")
      ? JSON.parse(localStorage.getItem("completedList"))
      : []
  );

  const URL = "/data/books.json";

  useEffect(() => {
    localStorage.setItem("auth", JSON.stringify(auth));
  }, [auth]);

  useEffect(() => {
    getBooks();
  }, [URL]);

  useEffect(() => {
    localStorage.setItem("readingList", JSON.stringify(readingList));
  }, [readingList.length]);

  useEffect(() => {
    localStorage.setItem("completedList", JSON.stringify(completedList));
  }, [completedList.length]);

  function getBooks() {
    axios
      .get(URL)
      .then((response) => {
        setBooks(response.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function showShortDescription(description) {
    const dotes = "...";
    if (description.length >= 200) {
      let newWord = description.slice(0, 200) + " " + dotes;
      return newWord;
    } else if (description.length == " ") {
      return <p>Details is missing</p>;
    } else {
      return description;
    }
  }

  return (
    <BrowserRouter>
      <div className="App">
        {auth?.idToken ? (
          <>
            <ul>
              <li>
                <Link className="library" to="/Search">
                  Library
                </Link>
              </li>
              <li>
                <Link className="readingList" to="/ReadingList">
                  Reading List
                </Link>
              </li>
              <li>
                <Link className="completedList" to="/CompletedList">
                  Completed List
                </Link>
              </li>
              <li>
                <LogOut setAuth={setAuth} auth={auth} />
                <Redirect to="/Search" />
              </li>
            </ul>
          </>
        ) : (
          <Redirect to="/" />
        )}

        <Switch>
          <Route exact path="/" render={() => <Home />}></Route>
          <Route
            exact
            path="/Login"
            render={() => <Login setAuth={setAuth} />}
          ></Route>
          <Route
            exact
            path="/Register"
            render={() => <Register setAuth={setAuth} />}
          ></Route>
          <Route
            exact
            path="/Search"
            render={() => (
              <Search
                showShortDescription={showShortDescription}
                setBooks={setBooks}
                books={books}
                setCompletedList={setCompletedList}
                completedList={completedList}
                setReadingList={setReadingList}
                readingList={readingList}
                auth={auth}
              />
            )}
          ></Route>
          <Route
            exact
            path="/ReadingList"
            render={() => (
              <ReadingList
                showShortDescription={showShortDescription}
                setBooks={setBooks}
                setReadingList={setReadingList}
                readingList={readingList}
                setCompletedList={setCompletedList}
                completedList={completedList}
                auth={auth}
              />
            )}
          ></Route>
          <Route
            exact
            path="/CompletedList"
            render={() => (
              <CompletedList
                showShortDescription={showShortDescription}
                setBooks={setBooks}
                setCompletedList={setCompletedList}
                completedList={completedList}
                auth={auth}
              />
            )}
          ></Route>
          <Route exact path="/Details" render={() => <Details />}></Route>
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
