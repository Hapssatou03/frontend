import { useState } from "react";
import { FaSignOutAlt, FaUser } from "react-icons/fa";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import styles from "../styles/Modal.module.css";
import { useRouter } from "next/router";

const LoginModal = ({ closeModal }) => {
  const [formData, setFormData] = useState({ username: "", password: "" });
  const { push } = useRouter();

  const handleLogout = () => {
    localStorage.removeItem("userToken");
    localStorage.removeItem("username");
    toast.info("Vous avez été déconnecté(e).");
    push("/");
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.username || !formData.password) {
      toast.error("Veuillez remplir tous les champs.");
      return;
    }

    try {
      const response = await fetch("http://localhost:3001/users/signin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(formData),
      });

      const result = await response.json();
      if (response.ok && result.result) {
        localStorage.setItem("username", formData.username);
        localStorage.setItem("userToken", result.token);

        toast.success(
          `Bienvenue, ${formData.username} ! Nous sommes ravis de vous revoir.`,
          {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          }
        );

        setTimeout(() => {
          closeModal();
          push("/articles");
        }, 1000);
      } else {
        toast.error(result.error || "Erreur inconnue.");
      }
    } catch (error) {
      toast.error("Une erreur s'est produite. Veuillez réessayer.");
    }
  };

  const username = localStorage.getItem("username");

  return (
    <div className={styles.modal}>
      <div className={styles.modalContent}>
        <button className={styles.close} onClick={closeModal}>
          X
        </button>
        <ToastContainer />
        {username && (
          <div className={styles.logoutSection}>
            <span>Connecté(e) en tant que {username}</span>
            <button
              onClick={handleLogout}
              className={styles.logoutButton}
              title="Se déconnecter"
            >
              <FaSignOutAlt size={24} />
            </button>
          </div>
        )}

        <div className={styles.icon}>
          <FaUser size={50} />
        </div>
        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.inputGroup}>
            <label htmlFor="username">Nom d'utilisateur</label>
            <input
              type="text"
              id="username"
              name="username"
              value={formData.username}
              onChange={handleChange}
              placeholder="Entrez votre nom d'utilisateur"
              className={styles.inputField}
            />
          </div>
          <div className={styles.inputGroup}>
            <label htmlFor="password">Mot de passe</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Entrez votre mot de passe"
              className={styles.inputField}
            />
          </div>
          <button type="submit" className={styles.button}>
            Se connecter
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginModal;
