import React, { useCallback, useState } from "react";
import "./App.css";

function App() {
  const [books, setBooks] = useState<
    { title: string; author: string; publishedYear: string }[]
  >([
    { title: "Atomic Habits", author: "James Clear", publishedYear: "2018" },
    { title: "Blue Mountain", author: "David Brooks", publishedYear: "2020" },
  ]);
  const [currentBook, setCurrentBook] = useState<{
    title: string;
    author: string;
    publishedYear: string;
  }>({
    title: "",
    author: "",
    publishedYear: "",
  });

  const handleSubmit = useCallback(() => {
    setBooks((previousBooks) => [...previousBooks, currentBook]);
    setCurrentBook({ title: "", author: "", publishedYear: "" });
  }, [currentBook]);

  const handleCancel = useCallback(
    (book: { title: string; author: string; publishedYear: string }) => {
      setBooks((previousBooks) =>
        previousBooks.filter((b) => b.title !== book.title)
      );
    },
    []
  );

  return (
    <div className="container" style={{ textAlign: "center" }}>
      <h1>Book Library</h1>
      <div id="book-list">
        {books.map((book) => (
          <p key={book.title} onClick={() => handleCancel(book)}>
            {book.title} by {book.author} ({book.publishedYear})
          </p>
        ))}
      </div>
      <div
        className="book-form"
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <label>
          Title:
          <input
            value={currentBook.title}
            onChange={(e) =>
              setCurrentBook({ ...currentBook, title: e.target.value })
            }
          />
        </label>
        <label>
          Author:
          <input
            value={currentBook.author}
            onChange={(e) =>
              setCurrentBook({ ...currentBook, author: e.target.value })
            }
          />
        </label>
        <label>
          Published Year:
          <input
            value={currentBook.publishedYear}
            onChange={(e) =>
              setCurrentBook({ ...currentBook, publishedYear: e.target.value })
            }
          />
        </label>
        <button
          disabled={currentBook.title ? false : true}
          onClick={handleSubmit}
        >
          Submit
        </button>
      </div>
    </div>
  );
}

export default App;
