import { useAuth } from '../contexts/AuthContext';

export default function Account() {
    const { user } = useAuth();

    if (!user) return <div>Debes iniciar sesión para ver tu cuenta.</div>;

    return (
        <div className="account-page">
            <h2>Mi cuenta</h2>
            <p><strong>Nombre:</strong> {user.name || 'Sin nombre'}</p>
            <p><strong>Email:</strong> {user.email}</p>
            {/* Puedes agregar más datos aquí */}
        </div>
    );
}
