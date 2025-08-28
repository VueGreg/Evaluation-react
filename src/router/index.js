import { createBrowserRouter } from 'react-router-dom';
import { AdminPage, ConferencePage, HomePage, LoginPage, UsersPage, RegisterPage } from '../pages';

const router = createBrowserRouter([
  { path: '/', element: <HomePage /> },
  { path: '/login', element: <LoginPage /> },
  { path: '/register', element: <RegisterPage /> },
  {
    path: '/admin',
    element: <AdminPage />,
    children: [
      { path: 'conferences', element: <ConferencePage /> },
      { path: 'users', element: <UsersPage /> },
    ]
  }
]);

export default router;