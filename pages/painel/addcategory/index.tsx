import { getSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useState } from "react";
import styles from "../../../styles/components/addcategory.module.css";
import axios from "axios";

const AddCategoria = () => {
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [photo, setPhoto] = useState<File | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const selectedFile = e.target.files[0];

      if (
        selectedFile.type === "image/jpeg" ||
        selectedFile.type === "image/png" ||
        selectedFile.type === "image/jpg"
      ) {
        setPhoto(selectedFile);
        setError(null); // Limpa qualquer mensagem de erro anterior
      } else {
        setPhoto(null); // Define a foto como nula para indicar que não deve ser enviada
        setError(
          "Apenas arquivos nos formatos JPG, JPEG ou PNG são permitidos."
        );
        e.target.value = ""; // Limpa a seleção do usuário para garantir a consistência
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const session = await getSession();

    if (!session) {
      router.push("/login");
      return;
    }

    try {
      const formData = new FormData();
      formData.append("title", title);
      if (photo) {
        formData.append("photo", photo);
      }

      const config = {
        headers: {
          Authorization: `Bearer ${session.user.token}`,
        },
      };

      const response = await axios.post(
        `${process.env.BASEAPI}/cursos/category`,
        formData,
        config
      );

      if (response.status === 201) {
        alert("Categoria adicionada com sucesso!");
        router.push("/cursos");
      } else {
        console.error("Erro ao adicionar categoria:", response.data.error);

        // Exibe a mensagem de erro retornada pela API
        setError(
          (response.data.Server as string) ||
            response.data.error ||
            "Erro ao adicionar categoria"
        );
      }
    } catch (error: any) {
      console.error("Erro ao adicionar categoria:", error);

      setError(
        (error.response?.data?.Server as string) ||
          "Erro ao adicionar categoria. Tente novamente mais tarde."
      );
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.main}>
        <h1>Adicionar Categoria</h1>
        <form onSubmit={handleSubmit} className={styles.form}>
          {error && <p className={styles.error}>{error}</p>}
          <div className={styles.inputContainer}>
            <label>Título da Categoria:</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className={styles.input}
            />
          </div>
          <div className={styles.inputContainer}>
            <label>Foto (JPG, PNG, JPEG):</label>
            <input
              type="file"
              accept=".jpg, .jpeg, .png"
              onChange={handlePhotoChange}
              className={styles.input}
            />
          </div>
          <button type="submit" className={styles.submitButton}>
            Adicionar Categoria
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddCategoria;
