import { Link } from "react-router-dom"

function SliderComponent () {
    return (
        <nav className="h-screen w-64 bg-gray-900 text-white flex flex-col shadow-lg">
            <div className="px-6 py-4 text-2xl font-bold border-b border-gray-700">
                Conference viewer
            </div>

            <ul className="flex-1 px-4 py-6 space-y-4">
                <li>
                    <Link to="/admin/conferences" className="block px-3 py-2 rounded-md hover:bg-gray-800 transition">
                        Conférences
                    </Link>
                </li>
                <li>
                    <Link to="/admin/users" className="block px-3 py-2 rounded-md hover:bg-gray-800 transition">
                        Utilisateurs
                    </Link>
                </li>
            </ul>

            <div className="px-4 py-6 border-t border-gray-700">
                <button className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-2 px-4 rounded-lg transition">
                    Deconnexion
                </button>
            </div>
        </nav>
    )
}

export default SliderComponent