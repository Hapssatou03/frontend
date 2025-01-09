import styles from "../styles/Inspiration.module.css";

const Inspiration = () => {
  return (
    <div className={styles.container}>
      <h1>Inspiration</h1>
      <section>
        <h2>Inspiration du jour</h2>
        <p>
          Chaque jour est une nouvelle opportunité de créer quelque chose
          d'extraordinaire. Laissez-vous inspirer par la beauté du monde qui
          vous entoure, les histoires des autres, et les rêves que vous portez
          en vous. N'oubliez jamais que l'inspiration peut venir de n'importe où
          et de n'importe qui.
        </p>
      </section>
      <section>
        <h2>Citations inspirantes</h2>
        <ul>
          <li>
            “La seule façon de faire du bon travail est d'aimer ce que vous
            faites.” – Steve Jobs
          </li>
          <li>
            “Ne jugez pas chaque jour à la récolte que vous faites mais aux
            graines que vous plantez.” – Robert Louis Stevenson
          </li>
          <li>
            “Le succès, c'est aller d'échec en échec sans perdre son
            enthousiasme.” – Winston Churchill
          </li>
        </ul>
      </section>
    </div>
  );
};

export default Inspiration;
