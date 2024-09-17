import React, { useState, useEffect } from "react";
import { collection, addDoc, doc, updateDoc, deleteDoc, onSnapshot } from "firebase/firestore";
import { db } from "./firebase"; // Import the db instance from firebase.js
import "./App.css";

function App() {
    // States for new book data
    const [bookTitle, setBookTitle] = useState("");
    const [bookAuthor, setBookAuthor] = useState("");
    const [bookPublisher, setBookPublisher] = useState("");
    const [bookYear, setBookYear] = useState("");

    // States for updating book data
    const [updatedBookTitle, setUpdatedBookTitle] = useState("");
    const [updatedBookAuthor, setUpdatedBookAuthor] = useState("");
    const [updatedBookPublisher, setUpdatedBookPublisher] = useState("");
    const [updatedBookYear, setUpdatedBookYear] = useState("");
    const [dataIdToBeUpdated, setDataIdToBeUpdated] = useState("");

    // State for book list
    const [booksData, setBooksData] = useState([]);

    // Fetch books data from Firestore
    useEffect(() => {
        const unsubscribe = onSnapshot(collection(db, "booksData"), (snapshot) => {
            setBooksData(
                snapshot.docs.map((doc) => ({
                    id: doc.id,
                    data: doc.data(),
                }))
            );
        });

        // Cleanup subscription on unmount
        return () => unsubscribe();
    }, []);

    // Add a new book
    const submit = async (e) => {
        e.preventDefault();
        try {
            await addDoc(collection(db, "booksData"), {
                title: bookTitle,
                author: bookAuthor,
                publisher: bookPublisher,
                year: bookYear,
            });

            // Clear the form
            setBookTitle("");
            setBookAuthor("");
            setBookPublisher("");
            setBookYear("");
        } catch (error) {
            console.error("Error adding document: ", error);
        }
    };

    // Update book data
    const updateData = async (e) => {
        e.preventDefault();
        if (dataIdToBeUpdated) {
            try {
                const docRef = doc(db, "booksData", dataIdToBeUpdated);
                await updateDoc(docRef, {
                    title: updatedBookTitle,
                    author: updatedBookAuthor,
                    publisher: updatedBookPublisher,
                    year: updatedBookYear,
                });

                // Clear the form
                setUpdatedBookTitle("");
                setUpdatedBookAuthor("");
                setUpdatedBookPublisher("");
                setUpdatedBookYear("");
                setDataIdToBeUpdated("");
            } catch (error) {
                console.error("Error updating document: ", error);
            }
        }
    };

    // Delete a book
    const deleteData = async (id) => {
        try {
            await deleteDoc(doc(db, "booksData", id));
        } catch (error) {
            console.error("Error deleting document: ", error);
        }
    };

    return (
        <div className="App">
            {!dataIdToBeUpdated ? (
                <div className="App__form">
                    <input
                        type="text"
                        placeholder="Title"
                        value={bookTitle}
                        onChange={(e) => setBookTitle(e.target.value)}
                    />
                    <input
                        type="text"
                        placeholder="Author"
                        value={bookAuthor}
                        onChange={(e) => setBookAuthor(e.target.value)}
                    />
                    <input
                        type="text"
                        placeholder="Publisher"
                        value={bookPublisher}
                        onChange={(e) => setBookPublisher(e.target.value)}
                    />
                    <input
                        type="text"
                        placeholder="Year"
                        value={bookYear}
                        onChange={(e) => setBookYear(e.target.value)}
                    />
                    <button onClick={submit}>Submit</button>
                </div>
            ) : (
                <div className="App__Updateform">
                    <input
                        type="text"
                        placeholder="Title"
                        value={updatedBookTitle}
                        onChange={(e) => setUpdatedBookTitle(e.target.value)}
                    />
                    <input
                        type="text"
                        placeholder="Author"
                        value={updatedBookAuthor}
                        onChange={(e) => setUpdatedBookAuthor(e.target.value)}
                    />
                    <input
                        type="text"
                        placeholder="Publisher"
                        value={updatedBookPublisher}
                        onChange={(e) => setUpdatedBookPublisher(e.target.value)}
                    />
                    <input
                        type="text"
                        placeholder="Year"
                        value={updatedBookYear}
                        onChange={(e) => setUpdatedBookYear(e.target.value)}
                    />
                    <button onClick={updateData}>Update</button>
                </div>
            )}

            <div className="App__DataDisplay">
                <table>
                    <thead>
                        <tr>
                            <th>Title</th>
                            <th>Author</th>
                            <th>Publisher</th>
                            <th>Year</th>
                            <th>Update</th>
                            <th>Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                        {booksData.map(({ id, data }) => (
                            <tr key={id}>
                                <td>{data.title}</td>
                                <td>{data.author}</td>
                                <td>{data.publisher}</td>
                                <td>{data.year}</td>
                                <td>
                                    <button
                                        onClick={() => {
                                            setDataIdToBeUpdated(id);
                                            setUpdatedBookTitle(data.title);
                                            setUpdatedBookAuthor(data.author);
                                            setUpdatedBookPublisher(data.publisher);
                                            setUpdatedBookYear(data.year);
                                        }}
                                    >
                                        Update
                                    </button>
                                </td>
                                <td>
                                    <button onClick={() => deleteData(id)}>
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default App;
