import styles from "../styles/MentionsLegales.module.css";

const Mention = () => {
  return (
    <div className={styles.container}>
      <h1>Mentions Légales</h1>
      <section>
        <h2>1. Présentation du site</h2>
        <p>
          Conformément aux dispositions des articles 6-III et 19 de la Loi
          n°2004-575 du 21 juin 2004 pour la Confiance dans l'économie
          numérique, dite L.C.E.N., il est porté à la connaissance des
          utilisateurs et visiteurs du site les présentes mentions légales.
        </p>
        <p>
          Le site [votre_nom_de_domaine.com] est accessible à l'adresse suivante
          : [URL_du_site] (ci-après "le Site"). L'accès et l'utilisation du Site
          sont soumis aux présentes "Mentions légales" détaillées ci-dessous
          ainsi qu'aux lois et/ou règlements applicables.
        </p>
      </section>
      <section>
        <h2>2. Conditions générales d’utilisation du site</h2>
        <p>
          L’utilisation du site [votre_nom_de_domaine.com] implique
          l’acceptation pleine et entière des conditions générales d’utilisation
          ci-après décrites.
        </p>
      </section>
      <section>
        <h2>3. Description des services fournis</h2>
        <p>
          Le site [votre_nom_de_domaine.com] a pour objet de fournir une
          information concernant l’ensemble des activités de la société.
        </p>
      </section>
      <section>
        <h2>4. Propriété intellectuelle et contrefaçons</h2>
        <p>
          [votre_nom_de_domaine.com] est propriétaire des droits de propriété
          intellectuelle ou détient les droits d’usage sur tous les éléments
          accessibles sur le site.
        </p>
      </section>
      <section>
        <h2>5. Limitations de responsabilité</h2>
        <p>
          [votre_nom_de_domaine.com] ne pourra être tenu responsable des
          dommages directs et indirects causés au matériel de l’utilisateur,
          lors de l’accès au site [votre_nom_de_domaine.com].
        </p>
      </section>
      <section>
        <h2>6. Gestion des données personnelles</h2>
        <p>
          Le client est informé des réglementations concernant la communication
          marketing, la loi du 21 Juin 2014 pour la confiance dans l'Économie
          Numérique, la Loi Informatique et Liberté du 06 Août 2004 ainsi que du
          Règlement Général sur la Protection des Données (RGPD : n° 2016-679).
        </p>
      </section>
      <section>
        <h2>7. Liens hypertextes et cookies</h2>
        <p>
          Le site [votre_nom_de_domaine.com] contient un certain nombre de liens
          hypertextes vers d’autres sites, mis en place avec l’autorisation de
          [votre_nom_de_domaine.com].
        </p>
      </section>
      <section>
        <h2>8. Droit applicable et attribution de juridiction</h2>
        <p>
          Tout litige en relation avec l’utilisation du site
          [votre_nom_de_domaine.com] est soumis au droit français. Il est fait
          attribution exclusive de juridiction aux tribunaux compétents de
          Paris.
        </p>
      </section>
      <section>
        <h2>9. Les principales lois concernées</h2>
        <p>
          Loi n° 78-87 du 6 janvier 1978, notamment modifiée par la loi n°
          2004-801 du 6 août 2004 relative à l'informatique, aux fichiers et aux
          libertés.
        </p>
      </section>
      <section>
        <h2>10. Lexique</h2>
        <p>
          Utilisateur : Internaute se connectant, utilisant le site susnommé.
          Informations personnelles : « les informations qui permettent, sous
          quelque forme que ce soit, directement ou non, l'identification des
          personnes physiques auxquelles elles s'appliquent ».
        </p>
      </section>
    </div>
  );
};

export default Mention;
