
import { sdk } from '../../../../../../../lib/client'
import styles from './Exercise.module.css';
import { GetExerciseQuery } from '@/generated/graphql';


interface ExercisePageProps {
  params: {
    exerciseId: string;
  };
}



const ExercisePage = async ({ params }: ExercisePageProps) => {
  const { exerciseId } = params;
  const response = await sdk.GetExercise({ id: exerciseId });
  const exercise: GetExerciseQuery['excercise'] = response.data.excercise;

  if (!exercise) {
    return <div className={styles.container}>Exercise not found</div>;
  }

  const videoId = exercise.video?.split('v=')[1];

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>{exercise.name}</h1>
      <p className={styles.description}>{exercise.description}</p>
      <div className={styles.videoContainer}>
        <iframe
          src={`https://www.youtube.com/embed/${videoId}`}
          frameBorder="0"
          allow="autoplay; encrypted-media"
          allowFullScreen
        ></iframe>
      </div>
      <p className={styles.duration}>Duration: </p>
    </div>
  );
};

export default ExercisePage;
