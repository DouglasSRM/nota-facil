import { useState } from "react";
import { auth } from "../services/firebase";
import { createUserWithEmailAndPassword, sendEmailVerification } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import '../styles/theme.css'
import '../styles/App.css'
import Logo from '../images/logo-nota-facil.png'

export default function Signin() {

    const navigate = useNavigate()

    const [email, setEmail] = useState("")
    const [senha, setSenha] = useState("")
    const [confirmaSenha, setConfirmaSenha] = useState("")
    const [loading, setLoading] = useState(false);

    const handleCadastro = async (e) => {
        e.preventDefault() 

        if (!email || !senha || !confirmaSenha) {
            alert("Preencha todos os campos!");
            return;
        }
        
        if (senha != confirmaSenha) {
            alert("As duas senhas devem ser iguais!")
            return
        }  

        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, senha);
            const user = userCredential.user;

            await sendEmailVerification(user);

            alert("Usuário cadastrado! Verifique seu e-mail antes de fazer login.");
            navigate("/");
        } catch(error) {
            console.error("Erro ao cadastrar:", error);
            alert("Erro ao cadastrar. Verifique os dados e tente novamente.");
        } finally {
            setLoading(false);
        }
    }   

    const goToLogin = () => navigate("/")

    return (
        <div className="login-container">
            <form className="login-form" onSubmit={handleCadastro}>
                <div className="login-header">
                    <img src={Logo} alt="Logo" className="login-logo" />
                    <h2 className="login-title">Cadastro</h2>
                </div>
                
                <input
                    className="login-input"
                    type="email"
                    placeholder="Digite seu e-mail"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
                <input
                    className="login-input"
                    type="password"
                    placeholder="Digite sua senha"
                    value={senha}
                    onChange={(e) => setSenha(e.target.value)}
                    required
                />
                <input
                    className="login-input"
                    type="password"
                    placeholder="Confirme sua senha"
                    value={confirmaSenha}
                    onChange={(e) => setConfirmaSenha(e.target.value)}
                    required
                />

                <button className="login-button"
                        type="submit"
                        disabled={loading}
                >{loading ? "Cadastrando..." : "Cadastrar"}</button>

                <p className="link-text">
                    Já tem conta?{" "}
                    <span className="link" onClick={goToLogin}>
                        Faça login
                    </span>
                </p>
            </form>
        </div>
    );
}
