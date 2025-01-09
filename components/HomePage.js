import React, { useState, useEffect } from "react";
import LoginModal from "./LoginModal";
import SignUpModal from "./SignUpModal";
import styles from "../styles/Home.module.css";


const HomePage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [articles, setArticles] = useState([]);
  const [userArticles, setUserArticles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isSignUpModalOpen, setIsSignUpModalOpen] = useState(false);
  const [showPublishedArticles, setShowPublishedArticles] = useState(false);
  const [selectedArticle, setSelectedArticle] = useState(null); // État pour l'article sélectionné
  const [isFooterVisible, setFooterVisible] = useState(true);

  useEffect(() => {
    const fetchUserArticles = async () => {
      try {
        const response = await fetch("http://localhost:3001/articles", {
          credentials: "include",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("userToken")}`,
          },
        });
        const data = await response.json();
        setUserArticles(data.articles || []);
      } catch (error) {
        console.error("Erreur de récupération des articles publiés :", error);
      }
    };

    fetchUserArticles();
  }, []);

  const handleSearch = async () => {
    if (!searchQuery.trim()) {
      setArticles([]);
      return;
    }

    setLoading(true);

    try {
      const response = await fetch(
        `https://newsapi.org/v2/everything?q=${searchQuery}&apiKey=dbc7838ae12142f2854a558c17766e05`
      );

      if (response.ok) {
        const data = await response.json();
        setArticles(data.articles || []);
      } else {
        console.error("Erreur lors de la recherche :", await response.json());
      }
    } catch (error) {
      console.error("Erreur réseau :", error);
    } finally {
      setLoading(false);
    }
  };

  const togglePublishedArticles = () => {
    setShowPublishedArticles(!showPublishedArticles);
  };

  const truncateText = (text, maxLength) => {
    if (typeof text !== "string") {
      return ""; // Retourne une chaîne vide si text n'est pas une chaîne
    }
    return text.length > maxLength ? text.substring(0, maxLength) + "..." : text;
  };

  const handleArticleClick = (article) => {
    setSelectedArticle(article);
  };

  const handleBackToArticles = () => {
    setSelectedArticle(null);  // Retour à la liste des articles
    setFooterVisible(true);  // Réafficher le footer
  };

  const handleReadMore = (articleId) => {
    // Vérifier l'ID de l'article et afficher un log
    console.log("Article ID:", articleId);

    // Cacher le footer quand l'utilisateur clique sur "Lire plus"
    setFooterVisible(false);

    // Chercher l'article dans les deux listes : API et articles créés
    let article = articles.find((a) => a.id === articleId || a._id === articleId);

    if (!article) {
      article = userArticles.find((a) => a._id === articleId); // Recherche dans les articles créés
    }

    // Vérifier si l'article est trouvé
    if (article) {
      setSelectedArticle(article);  // Afficher l'article complet
    } else {
      console.error("Article non trouvé");
    }
  };

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div className={styles.app}>
      <header className={styles.header}>
        <a href="/" className={styles.logo}>
          <h1>Expressive</h1>
        </a>

        {/* Bouton hamburger */}
  <div className={styles.hamburger} onClick={() => setIsMenuOpen(!isMenuOpen)}>
    <div className={styles.bar}></div>
    <div className={styles.bar}></div>
    <div className={styles.bar}></div>
  </div>

        <nav className={styles.nav}>
          <button
            onClick={() => setIsLoginModalOpen(true)}
            className={styles.navLink}
          >
            Connexion
          </button>
          <button
            onClick={() => setIsSignUpModalOpen(true)}
            className={styles.navLink}
          >
            Inscription
          </button>
          <button onClick={togglePublishedArticles} className={styles.navLink}>
            Articles publiés
          </button>
        </nav>
      </header>

      <main className={styles.main}>
        {selectedArticle ? (
          // Affichage des détails de l'article
          <div className={styles.articleDetails}>
            <button onClick={handleBackToArticles} className={styles.backButton}>
              Retour
            </button>
            <h2>{selectedArticle.title}</h2>
            <img
              src={selectedArticle.urlToImage || "https://via.placeholder.com/150"}
              alt={selectedArticle.title}
              className={styles.articleImage}
            />
            <p>{selectedArticle.content || "Contenu indisponible"}</p>
          </div>
        ) : showPublishedArticles ? (
          // Liste des articles publiés
          <div>
            <h2>Articles publiés</h2>
            <div className={styles.articlesContainer}>
              {userArticles.length > 0 ? (
                userArticles.map((article) => (
                  <div key={article._id} className={styles.articleItem}>
                    {article.urlToImage && (
                      <img
                        src={article.urlToImage}
                        alt="Article"
                        className={styles.articleImage}
                      />
                    )}
                    <h3>{truncateText(article.title || "", 50)}</h3>
                    <p>{truncateText(article.content || "", 100)}</p>
                    <button
                      onClick={() => handleArticleClick(article)}
                      className={styles.readMoreButton}
                    >
                      Lire la suite
                    </button>
                  </div>
                ))
              ) : (
                <p>Aucun article publié.</p>
              )}
            </div>
          </div>
        ) : (
          // Barre de recherche et articles
          <div>
            <div className={styles.description}>
              <p>
                Expressive est un blog qui permet de créer des articles, les
                publier, lire des articles et trouver toute sorte d'article via
                la barre de recherche.
              </p>
            </div>
            <div className={styles.searchContainer}>
              <h2 className={styles.title}>Découvrez et explorez</h2>
              <div className={styles.searchBar}>
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Rechercher des articles..."
                  className={styles.searchInput}
                />
                <button
                  onClick={handleSearch}
                  disabled={loading}
                  className={styles.searchButton}
                >
                  {loading ? "Chargement..." : "Rechercher"}
                </button>
              </div>
            </div>

            <div className={styles.articlesContainer}>
              {searchQuery.trim() && articles.length > 0 ? (
                <div className={styles.articlesGrid}>
                  {articles.map((article, index) => (
                    <div key={index} className={styles.articleItem}>
                      <img
                        src={
                          article.urlToImage ||
                          "https://via.placeholder.com/150"
                        }
                        alt={article.title}
                        className={styles.articleImage}
                      />
                      <h3>{article.title}</h3>
                      <p>{article.description}</p>
                      <button
                        onClick={() => handleReadMore(article.id)}
                        className={styles.readMoreButton}
                      >
                        Lire la suite
                      </button>
                    </div>
                  ))}
                </div>
              ) : (
                searchQuery.trim() && <p>Aucun article trouvé.</p>
              )}
            </div>
          </div>
        )}
      </main>

      {isFooterVisible && (
        <footer className={styles.footer}>
          <p>
            &copy; {new Date().getFullYear()} Expressive. Tous droits réservés.
          </p>
        </footer>
      )}

      {isLoginModalOpen && (
        <LoginModal closeModal={() => setIsLoginModalOpen(false)} />
      )}
      {isSignUpModalOpen && (
        <SignUpModal closeModal={() => setIsSignUpModalOpen(false)} />
      )}
    </div>
  );
};

export default HomePage;
