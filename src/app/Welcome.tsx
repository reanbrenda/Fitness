import styles from './WelcomeSection.module.css';

const WelcomeSection = () => {
  return (
    <section className={styles.welcomeSection}>
      <div className={styles.welcomeText}>
        <h1>Welcome to Your Online Workout</h1>
      </div>
      <div className={styles.programsLine}>
        <h2>Programs</h2>
      </div>
    </section>
  );
};

export default WelcomeSection;

