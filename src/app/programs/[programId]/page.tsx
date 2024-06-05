import styles from './Program.module.css';
import { sdk } from '../../../lib/client'
import {GetProgramQuery, GetProgramsQuery } from '@/generated/graphql';





interface ProgramProps {
  programId: string;
}

const Program = async ({ params }: { params: ProgramProps }) => {
  const { programId } = params;
  const response = await sdk.GetProgram({ id: programId });
  const program: GetProgramQuery['program'] =response.data.program

  return (
    <div className={styles.container}>
      <h1>{program?.name}</h1>
      <div className={styles.workoutsList}>
        {program?.workouts.map((workout) => (
          <div key={workout.id} className={styles.workoutCard}>
            <h2>{workout.name}</h2>
            <p>{workout.description}</p>
            {workout.image && (
              <img src={workout.image.url} alt={workout.name ?? 'image'} className={styles.workoutImage} />
            )}
            <a href={`/programs/${program.id}/workouts/${workout.id}`} className={styles.link}>View Exercises</a>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Program;

