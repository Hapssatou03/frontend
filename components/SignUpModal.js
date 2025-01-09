import { useState } from "react";
import { FaUserPlus } from "react-icons/fa";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import styles from "../styles/Modal.module.css";

const SignUpModal = ({ closeModal }) => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/;

    if (!formData.username || !formData.email || !formData.password) {
      toast.error("Veuillez remplir tous les champs.");
      return;
    }

    if (!emailRegex.test(formData.email)) {
      toast.error("Veuillez entrer un email valide.");
      return;
    }

    if (!passwordRegex.test(formData.password)) {
      toast.error(
        "Le mot de passe doit contenir au moins 8 caractères, dont une majuscule, une minuscule, un chiffre et un caractère spécial."
      );
      return;
    }

    try {
      const response = await fetch("http://localhost:3001/users/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();
      if (response.ok && result.result) {
        toast.success("Inscription réussie !");
        setTimeout(() => {
          closeModal();
        }, 1000);
      } else {
        toast.error(result.error || "Erreur inconnue.");
      }
    } catch (error) {
      toast.error("Une erreur s'est produite. Veuillez réessayer.");
    }
  };

  return (
    <div className={styles.modal}>
      <div className={styles.modalContent}>
        <button className={styles.close} onClick={closeModal}>
          X
        </button>
        <ToastContainer />
        {/* <h2>Inscription</h2> */}
        <div className={styles.icon}>
          <FaUserPlus size={50} />
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
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Entrez votre email"
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
            S'inscrire
          </button>
        </form>
      </div>
    </div>
  );
};

export default SignUpModal;
