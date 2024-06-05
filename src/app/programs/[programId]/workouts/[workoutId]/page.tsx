
import { sdk } from '../../../../../lib/client'
import styles from './Workout.module.css';
import { GetWorkoutQuery } from '@/generated/graphql';



interface WorkoutProps {
  workoutId: string;
  programId: string;
}

const Workout = async ({ params }: { params: WorkoutProps }) => {
  const { workoutId,programId } = params;
  const response = await sdk.GetWorkout({ id: workoutId });
  const workout: GetWorkoutQuery['workout'] = response.data.workout;

  return (
    <div className={styles.container}>
      <h1>{workout?.name}</h1>
      <p>{workout?.description}</p>
      {workout?.image && (
        <img src={workout.image.url} alt={workout.name ?? 'Workout Image'} className={styles.workoutImage} />
      )}
      <div className={styles.exercisesList}>
        {workout?.excercises.map((exercise) => (
          <div key={exercise.id} className={styles.exerciseCard}>
            <h2>{exercise.name}</h2>
            {/* <p>{exercise.}</p>
            {exercise.image && (
              <img src={exercise.image.url} alt={exercise.name ?? 'Exercise Image'} className={styles.exerciseImage} />
            )} */}
            <a href={`/programs/${programId}/workouts/${workoutId}/exercises/${exercise.id}`} className={styles.link}>View Exercise</a>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Workout;
