import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Button } from '../Button'
import { useAuth } from '../contexts/AuthContext'
import './auth.css'

export default function Login() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const { login } = useAuth();

    function handleSubmit(e) {
        e.preventDefault();
        setError('');
        fetch('http://localhost:3000/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password })
        })
            .then(res => {
                if (res.status === 200) {
                    const userData = { email };
                    login(userData);
                    alert('Inicio de sesión exitoso');
                    navigate('/', { replace: true });
                } else {
                    setError('Credenciales inválidas. Verifica tu email y contraseña.');
                }
            })
            .catch(() => setError('No se pudo conectar al servidor.'));
    }

    return (
        <div className="auth-page">
            <div className="auth-card">
                <h2>Iniciar sesión</h2>
                <form className="auth-form" onSubmit={handleSubmit}>
                    <div className="field">
                        <label className="auth-label">Email</label>
                        <input
                            className="auth-input"
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="tucorreo@ejemplo.com"
                            required
                        />
                    </div>
                    <div className="field">
                        <label className="auth-label">Contraseña</label>
                        <input
                            className="auth-input"
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="••••••••"
                            required
                        />
                    </div>
                    {error && <div className="auth-error">{error}</div>}
                    <div className="form-actions">
                        <Button type="submit" className="btn-primary">Entrar</Button>
                    </div>
                </form>

                <p className="auth-footer">
                    ¿No tienes cuenta? <Link to="/register">Regístrate</Link>
                </p>
            </div>
        </div>
    )
}
