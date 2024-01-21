import React, { useState } from "react";
import axios from "axios";
import style from "../styles/components/cadastro.module.css";
interface FormData {
  email: string;
  name: string;
  password: string;
  photo: File | null;
  git: string;
  linkedin: string;
}

const Cadastro: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    email: "",
    name: "",
    password: "",
    photo: null,
    git: "",
    linkedin: "",
  });

  const [showError, setShowError] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFormData({ ...formData, photo: e.target.files[0] });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      setShowError(false);
      setErrorMessage(null);

      const formDataToSend = new FormData();
      formDataToSend.append("email", formData.email);
      formDataToSend.append("name", formData.name);
      formDataToSend.append("password", formData.password);
      if (formData.photo) {
        formDataToSend.append("photo", formData.photo);
      }

      if (formData.git) {
        formDataToSend.append("git", formData.git);
      }
      if (formData.linkedin) {
        formDataToSend.append("linkedin", formData.linkedin);
      }

      const response = await axios.post(
        "http://localhost:3001/register",
        formDataToSend
      );

      console.log(response.data);

      if (response.data.success) {
        window.alert("Cadastrado com sucesso");
        window.location.href = "/login";
      } else {
        console.error("Erro no cadastro:", response.data.Server);

        // Exibe a mensagem de erro retornada pela API
        setErrorMessage((response.data.Server as string) || "Erro no cadastro");
        setShowError(true);
      }
    } catch (error: any) {
      console.error("Erro no cadastro:", error);

      // Exibe a mensagem de erro padrão em caso de erro geral
      setShowError(true);
      setErrorMessage(
        (error.response?.data?.Server as string) ||
          "Erro no cadastro. Tente novamente mais tarde."
      );
    }
  };

  return (
    <div className={style.container}>
      <h1>Cadastro</h1>

      <form onSubmit={handleSubmit} className={style.login}>
        {showError && (
          <p className={style.error}>
            {errorMessage || "Todos os campos são obrigatórios"}
          </p>
        )}
        <div className={style.inputContainer}>
          <label>Email:</label>
          <input
            type="email"
            name="email"
            onChange={handleInputChange}
            className={style.input}
          />
        </div>

        <div className={style.inputContainer}>
          <label>Nome:</label>
          <input
            type="text"
            name="name"
            onChange={handleInputChange}
            className={style.input}
          />
        </div>

        <div className={style.inputContainer}>
          <label>Senha:</label>
          <input
            type="password"
            name="password"
            onChange={handleInputChange}
            className={style.input}
          />
        </div>

        <div className={style.inputContainer}>
          <label>Foto de perfil:</label>
          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className={style.input}
          />
        </div>

        <div className={style.inputContainer}>
          <label>GitHub:</label>
          <input
            type="text"
            name="git"
            onChange={handleInputChange}
            className={style.input}
          />
        </div>

        <div className={style.inputContainer}>
          <label>LinkedIn:</label>
          <input
            type="text"
            name="linkedin"
            onChange={handleInputChange}
            className={style.input}
          />
        </div>

        <button type="submit" className={style.loginButton}>
          Cadastrar
        </button>
      </form>
    </div>
  );
};

export default Cadastro;
