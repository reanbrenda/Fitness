
import { sdk } from '../../../../../../../lib/client'
import styles from './Exercise.module.css';
import { GetExerciseQuery } from '@/generated/graphql';

interface ExerciseProps {
    exerciseId: string;
  }
const Exercise = async ({ params }: { params: ExerciseProps }) => {
    const { exerciseId } = params;
    const response = await sdk.GetExercise({ id: exerciseId });
    const excercise:GetExerciseQuery ['excercise'] = response.data.excercise
    return (
        <div className={styles.container}>
          <h1>{excercise?.name}</h1>
          {excercise?.video && (
            <div className={styles.videoContainer}>
              <iframe
                width="560"
                height="315"
                src={`https://www.youtube.com/embed/${excercise.video.split('v=')[1]}`}
                title={excercise.name ?? 'Exercise Video'}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
          )}
        </div>
      );
    };
    
    export default Exercise;


