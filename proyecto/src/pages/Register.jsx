import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Button } from '../Button'
import './auth.css'

export default function Register() {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const navigate = useNavigate();

    function handleSubmit(e) {
        e.preventDefault();
        const myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        const raw = JSON.stringify({
            email,
            password,
            name
        });

        fetch("http://localhost:3000/register", {
            method: "POST",
            headers: myHeaders,
            body: raw,
            redirect: "follow"
        })
            .then((response) => {
                if (response.status === 200) {
                    alert("Registro exitoso");
                    navigate("/login", { replace: true });
                } else if (response.status === 400) {
                    return response.json().then(result => {
                        alert(result.error || "Datos inválidos");
                    });
                } else {
                    throw new Error("Error inesperado: " + response.status);
                }
            })
            .catch((error) => {
                alert("No se pudo conectar al servidor");
                console.error(error);
            });
    }

    return (
        <div className="auth-page">
            <div className="auth-card">
                <h2>Registro</h2>
                <form className="auth-form" onSubmit={handleSubmit}>
                    <div className="field">
                        <label className="auth-label">Nombre</label>
                        <input
                            className="auth-input"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder="Tu nombre"
                            required
                        />
                    </div>
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

                    <div className="form-actions">
                        <Button type="submit" className="btn-primary">Crear cuenta</Button>
                    </div>
                </form>

                <p className="auth-footer">
                    ¿Ya tienes cuenta? <Link to="/login">Inicia sesión</Link>
                </p>
            </div>
        </div>
    )
}
