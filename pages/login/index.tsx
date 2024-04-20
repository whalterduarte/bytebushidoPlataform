import { useState } from "react";
import { signIn, signOut, useSession } from "next-auth/react";
import { useRouter } from "next/router";
import style from "./Login.module.css";

import Link from "next/link";
import UserDetails from "../../components/userDetails/UserDetails";

const Login = () => {
  const { data: session } = useSession();
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorText, setErrorText] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    if (!email || !password) {
      setErrorText("Preencha os campos.");
      return;
    }

    setLoading(true);

    const result = await signIn("credentials", {
      redirect: false,
      email,
      password,
    });

    setLoading(false);

    if (result?.error) {
      setErrorText(
        "Credenciais inválidas. Verifique seu email e senha e tente novamente."
      );
    } else {
      setErrorText("Deu Certo!");

      router.push("/cursos");
    }
  };

  const handleLogout = async () => {
    await signOut();
    
  };

  return (
    <div>
      {session ? (
        <div>
          <div className={style.userDetails}>
            {/* PERFIL DO USUÁRIO */}
            <UserDetails session={session} />
            <button className={style.sair} onClick={handleLogout}>
              Sair
            </button>
          </div>
        </div>
      ) : (
        <div className={style.container}>
          <div className={style.login}>
            <h1>Login</h1>
            <label htmlFor="">Email:</label>
            <input
              className={style.input}
              type="email"
              placeholder="Digite seu email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={loading}
            />
            <label htmlFor="">Password:</label>
            <input
              className={style.input}
              type="password"
              placeholder="Digite sua senha"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              disabled={loading}
            />
            <div className={style.buttonContainer}>
              <button
                className={style.loginButton}
                disabled={loading}
                onClick={handleLogin}
              >
                Entrar
              </button>
              <Link className={style.cadastroButton} href={"/cadastro"}>
                Cadastrar
              </Link>
            </div>
          </div>
          {errorText && <p className={style.error}>{errorText}</p>}
          {loading && <p>Carregando...</p>}
        </div>
      )}
    </div>
  );
};

export default Login;
