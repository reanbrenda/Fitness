'use client';

import { useRouter } from 'next/navigation';
import styles from './WorkoutDetail.module.css';

export interface Exercise {
  id: string;
  name: string;
  description: string;
  video: string;
}

interface WorkoutDetailProps {
  name: string;
  description: string;
  exercises: Exercise[];
  programId: string;
  workoutId: string;
}

const WorkoutDetail: React.FC<WorkoutDetailProps> = ({ name, description, exercises, programId, workoutId }) => {
  const router = useRouter();

  const handleViewExercise = (exerciseId: string) => {
    router.push(`/programs/${programId}/workouts/${workoutId}/exercises/${exerciseId}`);
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>{name}</h1>
      <p className={styles.description}>{description}</p>
      <button className={styles.startButton} onClick={() => router.push(`/programs/${programId}/workouts/${workoutId}/start`)}>Start Workout</button>
      <div className={styles.exercisesList}>
        {exercises.map((exercise: Exercise) => (
          <div key={exercise.id} className={styles.exerciseCard}>
            <h2 className={styles.exerciseTitle}>{exercise.name}</h2>
            <p className={styles.exerciseDescription}>{exercise.description}</p>
            {exercise.video && (
              <img
                src={`https://img.youtube.com/vi/${exercise.video.split('v=')[1]}/0.jpg`}
                alt={exercise.name}
                className={styles.exerciseThumbnail}
              />
            )}
            <button className={styles.viewButton} onClick={() => handleViewExercise(exercise.id)}>View Exercise</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WorkoutDetail;
