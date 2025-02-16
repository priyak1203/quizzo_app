import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { HomeLayout, Login } from './pages';
import { AddQuiz, AllQuiz, DashboardLayout, EditQuiz } from './pages/Dashboard';

const router = createBrowserRouter([
  {
    path: '/',
    element: <HomeLayout />,
    children: [{ index: true, element: <Login /> }],
  },
  {
    path: '/dashboard',
    element: <DashboardLayout />,
    children: [
      { index: true, element: <AllQuiz /> },
      {
        path: 'add-quiz',
        element: <AddQuiz />,
      },
      {
        path: 'edit-quiz/:id',
        element: <EditQuiz />,
      },
    ],
  },
]);

function App() {
  return (
    <>
      <RouterProvider router={router} />
      <Toaster
        toastOptions={{
          style: {
            textTransform: 'capitalize',
          },
        }}
      />
    </>
  );
}

export default App;
