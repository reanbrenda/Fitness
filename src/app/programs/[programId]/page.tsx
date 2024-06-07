import styles from './Program.module.css';
import { sdk } from '../../../lib/client'
import {GetProgramQuery, GetProgramsQuery } from '@/generated/graphql';
import Navbar from '../../navbar'
import Image from 'next/image';



interface ProgramProps {
  programId: string;
}

const Program = async ({ params }: { params: ProgramProps }) => {
  const { programId } = params;
  const response = await sdk.GetProgram({ id: programId });
  const program: GetProgramQuery['program'] = response.data.program;

  return (
    <div>
      <Navbar showHomeLink={true} />
      <div className={styles.container}>
        <h1 className={styles.programName}>{program?.name}</h1>
        <div className={styles.workoutsList}>
          {program?.workouts.map((workout) => (
            <div key={workout.id} className={styles.workoutCard}>
              <div className={styles.imageContainer}>
                {workout.image && (
                  <Image
                    src={workout.image.url}
                    alt={workout.name ?? 'Workout Image'}
                    layout="fill"
                    objectFit="cover"
                    className={styles.workoutImage}
                  />
                )}
              </div>
              <div className={styles.cardContent}>
                <h2 className={styles.workoutName}>{workout.name}</h2>
                <p>{workout.description}</p>
                <a href={`/programs/${program.id}/workouts/${workout.id}`} className={styles.button}>
                  View Exercises
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Program;
