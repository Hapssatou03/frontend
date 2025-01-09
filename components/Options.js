import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { FaArrowLeft } from "react-icons/fa";
import LoginModal from "../components/LoginModal";
import SignUpModal from "../components/SignUpModal";
import styles from "../styles/Options.module.css";

const Options = () => {
  const [showLogin, setShowLogin] = useState(false);
  const [showSignUp, setShowSignUp] = useState(false);
  const router = useRouter();

  const handleBackClick = () => {
    router.push("/");
  };

  return (
    <div className={styles.container}>
      <div className={styles.backButton} onClick={handleBackClick}>
        <FaArrowLeft />
      </div>
      <div className={styles.welcomeContainer}>
        <h1 className={styles.welcome}>Bienvenue sur Expressive!</h1>
      </div>
    
      <button className={styles.button} onClick={() => setShowLogin(true)}>
        Connexion
      </button>
      <button className={styles.button} onClick={() => setShowSignUp(true)}>
        Inscription
      </button>

      {showLogin && <LoginModal closeModal={() => setShowLogin(false)} />}
      {showSignUp && <SignUpModal closeModal={() => setShowSignUp(false)} />}
    </div>
  );
};

export default Options;
