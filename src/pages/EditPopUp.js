import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { db } from '../firebase/config';
import { doc, getDoc, updateDoc } from "firebase/firestore";

export default function EditPopUp() {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [description, setDescription] = useState("");
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    const fetchArticle = async () => {
      const docRef = doc(db, "articles", id);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        const article = docSnap.data();
        setTitle(article.title);
        setAuthor(article.author);
        setDescription(article.description);
      } else {
        console.log("No such document!");
      }
    };

    fetchArticle();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const updatedArticle = { title, author, description };

    const docRef = doc(db, "articles", id);
    await updateDoc(docRef, updatedArticle);

    navigate("/");
  };

  return (
    <div className="create">
      <h2 className="page-title">Edit Recipe</h2>
      <form onSubmit={handleSubmit}>
        <label>
          <span>Title:</span>
          <input
            type="text"
            onChange={(e) => setTitle(e.target.value)}
            value={title}
            required
          />
        </label>

        <label>
          <span>Author:</span>
          <input
            type="text"
            onChange={(e) => setAuthor(e.target.value)}
            value={author}
            required
          />
        </label>

        <label>
          <span>Description:</span>
          <textarea
            onChange={(e) => setDescription(e.target.value)}
            value={description}
            required
          />
        </label>

        <button className="btn">Save Changes</button>
      </form>
    </div>
  );
}