import { useEffect, useState } from "react";
import {
  FaUser,
  FaThumbsUp,
  FaThumbsDown,
  FaTrash,
  FaEdit,
  FaShare,
  FaComment,
  FaMoon,
} from "react-icons/fa";
import { useRouter } from "next/router";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import styles from "../styles/article.module.css";

const Articles = () => {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [articles, setArticles] = useState([]);
  const [newArticleContent, setNewArticleContent] = useState("");
  const [newArticleImage, setNewArticleImage] = useState("");
  const [darkMode, setDarkMode] = useState(false);

  // Fonction pour activer/désactiver le mode sombre
  const toggleDarkMode = () => {
    setDarkMode((prevMode) => {
      const newMode = !prevMode;
      localStorage.setItem("darkMode", newMode); // Sauvegarde dans le localStorage
      return newMode;
    });
  };

  // Fetch des articles et du mode sombre au montage
  useEffect(() => {
  // Récupérer l'état du mode sombre depuis le localStorage
  const savedDarkMode = localStorage.getItem("darkMode") === "true";
  setDarkMode(savedDarkMode);

  // Appliquer ou retirer la classe 'dark' sur le body
  if (savedDarkMode) {
    document.body.classList.add("dark");
  } else {
    document.body.classList.remove("dark");
  }

}, []);
 // Ce useEffect ne dépend pas du darkMode pour ne pas se relancer en boucle

  // Fetch des articles depuis l'API
  const fetchArticles = async () => {
    try {
      const response = await fetch("http://localhost:3001/articles", {
        credentials: "include",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("userToken")}`,
        },
      });
      const data = await response.json();
      setArticles(data.articles);
    } catch (error) {
      console.error("Erreur de récupération des articles", error);
    }
  };

  // Fetch du username et articles
  const fetchUsername = async () => {
    const storedUsername = localStorage.getItem("username");
    setUsername(storedUsername);
    if (storedUsername) {
      await fetchArticles();
    }
  };

  useEffect(() => {
    fetchUsername();
  }, []); // Ce useEffect ne dépend pas de darkMode pour éviter les appels répétés

  // Gestion de la déconnexion
  const handleLogout = () => {
    localStorage.removeItem("userToken");
    localStorage.removeItem("username");
    localStorage.removeItem("darkMode"); // Supprimer le darkMode à la déconnexion
    toast.info("Vous avez été déconnecté(e).");
    router.push("/");
  };

  // Fonction de téléchargement d'image pour un article
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setNewArticleImage(reader.result); // Stocke l'image en base64
      };
      reader.readAsDataURL(file);
    }
  };

  // Fonction pour créer un article
  const handleCreate = () => {
    if (newArticleContent.trim()) {
      const newArticle = {
        content: newArticleContent,
        author: username,
        urlToImage: newArticleImage,
      };

      fetch("http://localhost:3001/articles/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("userToken")}`,
        },
        credentials: "include",
        body: JSON.stringify(newArticle),
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error("Erreur de création de l'article");
          }
          return response.json();
        })
        .then((data) => {
          if (data.result) {
            setArticles([...articles, data.article]);
            setNewArticleContent("");
            toast.success("Article créé avec succès !");
          } else {
            toast.error("Erreur de création de l'article.");
          }
        })
        .catch((error) => {
          console.error("Erreur de création de l'article", error);
          toast.error("Erreur de création de l'article.");
        });
    } else {
      toast.error("Veuillez entrer le contenu de l'article.");
    }
  };

  // Fonction pour ajouter un commentaire
  const handleAddComment = (articleId, comment) => {
    if (!comment.trim()) return;
    setArticles(
      articles.map((article) =>
        article._id === articleId
          ? { ...article, comments: [...(article.comments || []), comment] }
          : article
      )
    );
    toast.success("Commentaire ajouté avec succès !");
  };

  // Fonction pour éditer un article
  const handleEdit = (articleId) => {
    const newContent = prompt("Modifiez le contenu de votre article :");
    if (newContent) {
      fetch(`http://localhost:3001/articles/${articleId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("userToken")}`,
        },
        credentials: "include",
        body: JSON.stringify({ content: newContent }),
      })
        .then((response) => {
          if (!response.ok) throw new Error("Erreur de modification");
          return response.json();
        })
        .then(() => {
          setArticles(
            articles.map((article) =>
              article._id === articleId ? { ...article, content: newContent } : article
            )
          );
          toast.success("Article modifié avec succès !");
        })
        .catch((error) => {
          console.error(error);
          toast.error("Erreur lors de la modification de l'article.");
        });
    }
  };

  // Fonction pour supprimer un article
  const handleDelete = (articleId) => {
    fetch(`http://localhost:3001/articles/${articleId}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("userToken")}`,
      },
      credentials: "include",
    })
      .then((response) => {
        if (!response.ok) throw new Error("Erreur de suppression");
        return response.json();
      })
      .then(() => {
        setArticles(articles.filter((article) => article._id !== articleId));
        toast.success("Article supprimé avec succès !");
      })
      .catch((error) => {
        console.error(error);
        toast.error("Erreur lors de la suppression de l'article.");
      });
  };

  // Fonction pour liker un article
  const handleLike = (articleId) => {
    fetch(`http://localhost:3001/articles/${articleId}/like`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("userToken")}`,
      },
      credentials: "include",
    })
      .then(() => {
        setArticles(
          articles.map((article) =>
            article._id === articleId ? { ...article, likes: article.likes + 1 } : article
          )
        );
      })
      .catch((error) => console.error("Erreur lors du like", error));
  };

  // Fonction pour disliker un article
  const handleDislike = (articleId) => {
    fetch(`http://localhost:3001/articles/${articleId}/dislike`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("userToken")}`,
      },
      credentials: "include",
    })
      .then(() => {
        setArticles(
          articles.map((article) =>
            article._id === articleId ? { ...article, likes: article.likes - 1 } : article
          )
        );
      })
      .catch((error) => console.error("Erreur lors du dislike", error));
  };

  return (
    <div className={`${styles.container} ${darkMode ? styles.dark : ""}`}>
      <ToastContainer />
      <div className={styles.header}>
        <div className={styles.userSection}>
          <span className={styles.welcome}>Hello {username}</span>
          <button onClick={handleLogout} className={styles.userButton}>
            <FaUser size={24} />
          </button>
        </div>
      </div>
      <div className={styles.publication}>
        <textarea
          className={styles.commentTextarea}
          placeholder="Écrivez votre article ici..."
          rows={4}
          value={newArticleContent}
          onChange={(e) => setNewArticleContent(e.target.value)}
        />
        <div>
          <input type="file" onChange={handleImageUpload} />
          <button className={styles.createButton} onClick={handleCreate}>
            Créer
          </button>
        </div>
      </div>
      {articles.map((article) => (
        <div key={article._id} className={styles.articleBox}>
          {article.urlToImage && (
            <img
              src={article.urlToImage}
              alt="Article"
              className={styles.articleImage}
            />
          )}
          <p className={styles.paragraph}>{article.content}</p>
          <div className={styles.articleActions}>
            <div className={styles.leftActions}>
              <button
                className={styles.actionButton}
                onClick={() => handleLike(article._id)}
              >
                <FaThumbsUp /> {article.likes}
              </button>
              <button
                className={styles.actionButton}
                onClick={() => handleDislike(article._id)}
              >
                <FaThumbsDown />
              </button>
            </div>
            <div className={styles.rightActions}>
              <button
                className={styles.actionButton}
                onClick={() => handleEdit(article._id)}
              >
                <FaEdit />
              </button>
              <button
                className={styles.actionButton}
                onClick={() => handleDelete(article._id)}
              >
                <FaTrash />
              </button>
            </div>
          </div>
          <div className={styles.commentSection}>
            {(article.comments || []).map((comment, index) => (
              <div key={index} className={styles.comment}>
                <FaComment /> {comment}
              </div>
            ))}
            <textarea
              className={styles.commentTextarea}
              placeholder="Ajouter un commentaire..."
              rows={2}
              onKeyPress={(e) => {
                if (e.key === "Enter") {
                  handleAddComment(article._id, e.target.value);
                  e.target.value = "";
                  e.preventDefault();
                }
              }}
            />
          </div>
        </div>
      ))}
      <div onClick={toggleDarkMode} className={styles.modeSwitch}>
        <FaMoon size={24} />
      </div>
    </div>
  );
};

export default Articles;
