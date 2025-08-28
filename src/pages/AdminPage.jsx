import { Outlet } from 'react-router-dom';
import { SliderComponent } from '../components';

const AdminPage = () => {

  return (
    <div className="flex">
      <SliderComponent />

      <main className="flex-1 p-8">
        <Outlet />
      </main>
    </div>
  );
};

export default AdminPage;
