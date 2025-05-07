import { useState } from "react";
import { auth } from "../services/firebase";
import { signInWithEmailAndPassword, sendEmailVerification, sendPasswordResetEmail } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import '../styles/theme.css'
import '../styles/App.css'
import Logo from '../images/logo-nota-facil.png'

export default function Login() {
    const [email, setEmail] = useState("")
    const [senha, setSenha] = useState("")

    const navigate = useNavigate()

    const handleLogin = async (e) => {
        e.preventDefault()

        if (!email || !senha) {
            alert("Preencha todos os campos!");
            return;
        }

        try{
            const userCredential = await signInWithEmailAndPassword(auth, email, senha);
            const user = userCredential.user;

            if (!user.emailVerified) {
                alert("Por favor, verifique seu e-mail antes de fazer login.");
                if (confirm("Reenviar verificação?")) {
                    reenviarVerificacao()
                }
                return
            }

            navigate("/home");
        } catch(error) {
            console.error("Erro ao logar:", error)
            if (error.code === "auth/invalid-credential") {
                alert("Senha incorreta!");
            } else if (error.code === "auth/user-not-found") {
                alert("Usuário não encontrado!");
            } else if (error.code === "auth/invalid-email") {
                alert("E-mail inválido!");
            } else {
                alert("Erro no login. Verifique os dados e tente novamente");
            }
        }
    }

    const reenviarVerificacao = () => {
        const user = auth.currentUser;
    
        if (user) {
            sendEmailVerification(user)
                .then(() => {
                    alert("E-mail de verificação reenviado com sucesso!");
                })
                .catch((error) => {
                    console.error("Erro ao reenviar verificação:", error);
                    alert("Erro ao reenviar e-mail: " + error.message);
                });
        } else {
            alert("Usuário não está autenticado.");
        }
    }

    const enviarRedefinicaoSenha = async () => {
        if (!email) {
            alert("Informe seu e-mail para redefinir a senha.")
            return
        }
        if (!confirm("Deseja redefinir sua senha?")) {
            return
        }

        try {
            await sendPasswordResetEmail(auth, email)
            alert("E-mail de redefinição de senha enviado!")
        } catch (error) {
            console.error("Erro ao enviar e-mail de redefinição:", error)
            alert("Não foi possível enviar a redefinição de senha")
        }
    }

    const handleCadastro = () => {
        navigate("/signin")
    }

    return (
        <div className="login-container">
            <form className="login-form"  onSubmit={handleLogin}> 
                <div className="login-header">
                    <img src={Logo} alt="Logo" className="login-logo" />
                    <h2 className="login-title">Login</h2>
                </div>

                <input 
                    className="login-input"
                    type="email"
                    placeholder="Digite seu e-mail"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <input
                    className="login-input"
                    type="password"
                    placeholder="Digite sua senha"
                    value={senha}
                    onChange={(e) => setSenha(e.target.value)}
                />

                <button className="login-button" type="submit">Entrar</button>


                <p className="link-text">
                    Não possui conta?{" "}
                    <span className="link" onClick={handleCadastro}>
                        Cadastre-se
                    </span>
                </p>
                <p className="login-text" onClick={enviarRedefinicaoSenha}>
                    Esqueceu sua senha?
                </p>

                
                {/* Área para outros métodos 
                <div style={styles.otherLoginContainer}>
                    <p style={styles.otherLoginTitle}>ou entre com</p>

            
                    <div style={styles.buttonsContainer}>
              
                        <button style={styles.otherButton}>Google</button>
                        <button style={styles.otherButton}>GitHub</button>
                        <button style={styles.otherButton}>Smartphone</button>
                    </div>
                </div>
                */}

            </form>
        </div>
    );
}
