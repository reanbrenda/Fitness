'use client';

import { useEffect, useState, useRef } from 'react';
import { sdk } from '../../../../../../lib/client';
import { GetWorkoutQuery } from '@/generated/graphql';
import styles from './StartWorkout.module.css';

interface StartWorkoutPageProps {
  params: {
    workoutId: string;
    programId: string;
  };
}

const StartWorkoutPage = async ({ params }: StartWorkoutPageProps) => {
  const { workoutId } = params;
  const response = await sdk.GetWorkout({ id: workoutId });
  const workout: GetWorkoutQuery['workout'] = response.data.workout;

  const formattedExercises = workout?.excercises.map(exercise => ({
    id: exercise.id,
    name: exercise.name ?? 'Unnamed Exercise',
    description: exercise.description ?? 'No description available',
    video: exercise.video ?? ''
  })) || [];

  return (
    <WorkoutPlayer exercises={formattedExercises} />
  );
};

interface Exercise {
  id: string;
  name: string;
  description: string;
  video: string;
}

interface WorkoutPlayerProps {
  exercises: Exercise[];
}

const WorkoutPlayer: React.FC<WorkoutPlayerProps> = ({ exercises }) => {
  const [currentExerciseIndex, setCurrentExerciseIndex] = useState(0);
  const [countdown, setCountdown] = useState<number | null>(null);
  const playerRef = useRef<YT.Player | null>(null);

  useEffect(() => {
    const loadYouTubeAPI = () => {
      const script = document.createElement('script');
      script.src = 'https://www.youtube.com/iframe_api';
      script.async = true;
      document.body.appendChild(script);
      script.onload = () => {
        if (window.YT) {
          window.YT.ready(() => {
            setCurrentExerciseIndex(0);
          });
        }
      };
      return () => {
        document.body.removeChild(script);
      };
    };

    if (!window.YT) {
      loadYouTubeAPI();
    } else {
      setCurrentExerciseIndex(0);
    }
  }, []);

  useEffect(() => {
    if (!exercises[currentExerciseIndex]?.video || !window.YT) return;

    const currentVideoId = exercises[currentExerciseIndex].video.split('v=')[1];

    const onPlayerStateChange = (event: YT.OnStateChangeEvent) => {
      if (event.data === window.YT.PlayerState.ENDED) {
        if (currentExerciseIndex < exercises.length - 1) {
          startCountdown();
        } else {
          setCurrentExerciseIndex((prevIndex) => prevIndex + 1);
        }
      }
    };

    const playerOptions = {
      videoId: currentVideoId,
      playerVars: {
        autoplay: 1,
        rel: 0,
        showinfo: 0,
        modestbranding: 1,
      },
      events: {
        onStateChange: onPlayerStateChange,
      },
    };

    if (playerRef.current) {
      playerRef.current.cueVideoById(currentVideoId);
    } else {
      playerRef.current = new window.YT.Player(`player-${currentVideoId}`, playerOptions);
    }

    return () => {
      if (playerRef.current) {
        playerRef.current.destroy();
        playerRef.current = null;
      }
    };
  }, [currentExerciseIndex, exercises]);

  const startCountdown = () => {
    let countdownValue = 10;
    setCountdown(countdownValue);

    const countdownInterval = setInterval(() => {
      countdownValue -= 1;
      setCountdown(countdownValue);

      if (countdownValue === 0) {
        clearInterval(countdownInterval);
        setCurrentExerciseIndex((prevIndex) => prevIndex + 1);
        setCountdown(null);
      }
    }, 1000);
  };

  const handlePrevious = () => {
    if (currentExerciseIndex > 0) {
      setCurrentExerciseIndex((prevIndex) => prevIndex - 1);
    }
  };

  const handleNext = () => {
    if (currentExerciseIndex < exercises.length - 1) {
      setCurrentExerciseIndex((prevIndex) => prevIndex + 1);
    }
  };

  if (currentExerciseIndex >= exercises.length) {
    return <div className={styles.container}><h1>Workout Complete!</h1></div>;
  }

  const currentExercise = exercises[currentExerciseIndex];
  const currentVideoId = currentExercise.video.split('v=')[1];

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>{currentExercise.name}</h1>
      <div id={`player-${currentVideoId}`} className={styles.video}></div>
      {countdown !== null && <div className={styles.countdown}>Next exercise in {countdown} seconds</div>}
      <div className={styles.buttonContainer}>
        <button className={styles.button} onClick={handlePrevious} disabled={currentExerciseIndex === 0}>Previous</button>
        <button className={styles.button} onClick={handleNext} disabled={currentExerciseIndex >= exercises.length - 1}>Next</button>
      </div>
    </div>
  );
};

export default StartWorkoutPage;
