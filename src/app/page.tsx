
import { sdk } from '@/lib/client';
import styles from './Programs.module.css'
import WelcomeSection from './Welcome';
import Navbar from './navbar';

import Image from 'next/image';


const Programs = async () => {
  const { data: { programs } } = await sdk.GetPrograms();

  return (
    <div className={styles.container}>
      <div className={styles.mainContent}>
        <WelcomeSection />
        <div className={styles.programsList}>
          {programs.map((program) => (
            <div key={program.id} className={styles.programCard}>
              <div className={styles.imageContainer}>
                {program.image && (
                  <Image 
                    src={program.image.url} 
                    alt={program.name ?? 'Program Image'} 
                    layout="fill" 
                    objectFit="cover" 
                    objectPosition="center" 
                    className={styles.programImage} 
                  />
                )}
              </div>
              <div className={styles.cardContent}>
                <h2 className={styles.programName}>{program.name}</h2>
                <p>{program.description}</p>
                <a href={`/programs/${program.id}`} className={styles.button}>View Workouts</a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Programs;
