import { useState, useEffect, useCallback } from 'react';
import { getUsers, changePermissionType, deleteUser } from '../services/userService';

const UsersPage = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchUsers = useCallback(async () => {
    try {
      setLoading(true);
      const data = await getUsers();
      setUsers(data);
    } catch (err) {
      console.error('Erreur lors du chargement des utilisateurs:', err);
      setError('Impossible de charger les utilisateurs');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  const handleTypeChange = async (userId, newType) => {
    try {
      await changePermissionType(userId, newType);
      setUsers(prev =>
        prev.map(user => 
          (user.id === userId) ? { ...user, type: newType } : user
        )
      );
    } catch (err) {
      console.error('Erreur lors de la mise à jour du type:', err);
    }
  };

  const handleDeleteUser = async (userId) => {
    try {
      await deleteUser(userId);
      setUsers(prev => prev.filter(user => user.id !== userId));
    } catch (err) {
      console.error('Erreur lors de la suppression de l’utilisateur:', err);
    }
  };

  if (loading) return <p>Chargement...</p>;
  if (error) return <p className="text-red-600">{error}</p>;

  return (
    <main className="flex flex-col p-8">
      <h1 className="text-3xl font-bold mb-6">Gestion des utilisateurs</h1>

      {users.length > 0 && (
        <ul className="mb-6 space-y-4">
          {users.map(user => (
            <li
              key={user._id}
              className="p-4 border rounded-lg bg-white shadow flex flex-col md:flex-row justify-between items-start md:items-center"
            >
              <div className="mb-4 md:mb-0">
                <h3 className="font-semibold text-lg">{user.id}</h3>
                <span className="text-sm text-gray-400">ID: {user._id}</span>
              </div>

              <div className="flex space-x-2 items-center">
                <select
                  value={user.type}
                  onChange={(e) => handleTypeChange(user.id, e.target.value)}
                  className="border rounded-lg p-2"
                >
                  <option value="admin">Admin</option>
                  <option value="user">Utilisateur</option>
                </select>

                <button
                  onClick={() => handleDeleteUser(user.id)}
                  className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors"
                >
                  Supprimer
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </main>
  );
};

export default UsersPage;