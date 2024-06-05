
import { sdk } from '@/lib/client';
import styles from './Programs.module.css'




const Programs = async () => {
  const { data: { programs } }= await sdk.GetPrograms();
  
 

  // const programImages = programs.map(program => program.image?.url);
 
console.log(programs?.[0]?.image?.url)
  return (
    <div className={styles.container}>
      <h1>Fitness Programs</h1>
      <div className={styles.programsList}>
        {programs.map((program) => (
          <div key={program.id} className={styles.programCard}>
            <h2>{program.name}</h2>
            <p>{program.description}</p>
           
            {program.image && (
              
              <img src={program.image.url} alt={program.name ?? 'Program Image'} className={styles.programImage} />
            )}
            <a href={`/programs/${program.id}`} className={styles.link}>View Workouts</a>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Programs;





  
