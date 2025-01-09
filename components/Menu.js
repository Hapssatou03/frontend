import { useEffect, useRef } from "react";
import { useRouter } from "next/router";
import Typed from "typed.js";
import styles from "../styles/Home.module.css";

const Home = () => {
  const router = useRouter();
  const el = useRef(null);

  useEffect(() => {
    const typed = new Typed(el.current, {
      strings: ["Expressive"],
      typeSpeed: 100,
      backSpeed: 50,
      loop: true,
    });

    return () => {
      typed.destroy();
    };
  }, []);

  const handleButtonClick = () => {
    router.push("/options");
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <p className={styles.tagline}>
          Échangez, inspirez, et laissez votre voix résonner ! <br />
          {/* partagez vos articles et contribuez à un monde de découvertes! */}
        </p>
      </div>
      <div className={styles.titleContainer}>
        <span className={styles.title} ref={el}></span>
        <button className={styles.button} onClick={handleButtonClick}>
          Go to Options
        </button>
      </div>
    </div>
  );
};

export default Home;
