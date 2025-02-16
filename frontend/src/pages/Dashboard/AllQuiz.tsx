import { AppContextType, useAppContext } from '@/context/appContext';
import customFetch from '@/utils/axios';
import { UserType } from '@/utils/types';
import { useEffect } from 'react';

function AllQuiz() {
  const { user } = useAppContext() as AppContextType;
  console.log(user);
  const data = { teacherId: user?.id };

  const fetchQuiz = async () => {
    const response = await customFetch.get('/quiz');
    console.log(data);
    console.log('fetching quiz');
    console.log(response);
  };

  useEffect(() => {
    fetchQuiz();
  }, [user]);

  return <div>AllQuiz</div>;
}

export default AllQuiz;
