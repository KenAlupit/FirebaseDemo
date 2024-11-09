import { useNavigate, useParams } from "react-router-dom";
import { getDoc, doc } from 'firebase/firestore';
import { db } from '../firebase/config';
import { useEffect, useState } from 'react';
import EditIcon from '../assets/edit.svg';

export default function Article() {
  const { urlId } = useParams();
  const navigate = useNavigate();

  const [article, setArticle] = useState(null);

  useEffect(() => {
    const fetchArticle = async () => {
      const ref = doc(db, 'articles', urlId);
      const snapshot = await getDoc(ref);

      if (snapshot.exists()) {
        setArticle(snapshot.data());
      } else {
        setArticle(null);
      }
    };

    fetchArticle();
  }, [urlId]);

  const handleEdit = () => {
    navigate(`/articles/edit/${urlId}`);
  };

  return (
    <div>
      {!article && <p>No records found!</p>}
      {article && (
        <div key={urlId}>
          <h2>{article.title}</h2>
          <p>By {article.author}</p>
          <p>{article.description}</p>
          <img
            className="icon"
            onClick={handleEdit}
            src={EditIcon}
            alt="edit icon"
          />
        </div>
      )}
    </div>
  );
}