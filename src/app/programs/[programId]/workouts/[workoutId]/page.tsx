
import { sdk } from '../../../../../lib/client'
import styles from './Workout.module.css';
import { GetWorkoutQuery } from '@/generated/graphql';
import WorkoutDetail from   './WorkoutDetail'


interface WorkoutPageProps {
  params: {
    workoutId: string;
    programId: string;
  };
}

const WorkoutPage = async ({ params }: WorkoutPageProps) => {
  const { workoutId, programId } = params;
  const response = await sdk.GetWorkout({ id: workoutId });
  const workout: GetWorkoutQuery['workout'] = response.data.workout;

  const formattedWorkout = {
    name: workout?.name ?? '',
    description: workout?.description ?? '',
    image: workout?.image?.url ?? '',
    exercises: workout?.excercises?.map(exercise => ({
      id: exercise.id,
      name: exercise.name ?? 'No name',
      description: exercise.description ?? 'No description',
      video: exercise.video ?? '',
    })) ?? [],
  };

  return (
    <div className={styles.container}>
      <WorkoutDetail
        name={formattedWorkout.name}
        description={formattedWorkout.description}
        // image={formattedWorkout.image}
        exercises={formattedWorkout.exercises}
        programId={programId}
        workoutId={workoutId}
      />
    </div>
  );
};

export default WorkoutPage;
