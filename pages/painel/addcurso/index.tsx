// pages/cursos/categorias/subcategorias/addcurso.tsx

import { useEffect } from "react";
import { getSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useState } from "react";
import styles from "../../../styles/components/addcategory.module.css";
import axios, { AxiosRequestConfig } from "axios";
import { CategoryType } from "../../../types/Category";

const AddCurso = () => {
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [git, setGit] = useState("");
  const [video, setVideo] = useState<File | null>(null);
  const [selectedSubcategoryId, setSelectedSubcategoryId] = useState<
    number | string
  >("");
  const [error, setError] = useState<string | null>(null);
  const [categories, setCategories] = useState<CategoryType[]>([]);
  const [uploadProgress, setUploadProgress] = useState<number | null>(null);

  useEffect(() => {
    const fetchSubcategories = async () => {
      try {
        const session = await getSession();

        if (session) {
          const response = await axios.get<{
            categories: CategoryType[];
          }>(`${process.env.BASEAPI}/cursos`, {
            headers: {
              Authorization: `Bearer ${session.user.token}`,
            },
          });

          setCategories(response.data.categories);
        } else {
          router.push("/login");
        }
      } catch (error) {
        console.error("Erro ao buscar subcategorias:", error);
      }
    };

    fetchSubcategories();
  }, []);

  const handleVideoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const selectedVideo = e.target.files[0];
      setVideo(selectedVideo);
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
      formData.append("description", description);
      formData.append("git", git);
      formData.append("subcategoriaId", String(selectedSubcategoryId));
      formData.append("video", video as Blob);

      const config: AxiosRequestConfig<FormData> = {
        headers: {
          Authorization: `Bearer ${session.user.token}`,
          "Content-Type": "multipart/form-data",
        },
        onUploadProgress: (progressEvent: any) => {
          const progress = Math.round(
            (progressEvent.loaded / progressEvent.total) * 100
          );
          setUploadProgress(progress);
        },
      };

      const response = await axios.post(
        `${process.env.BASEAPI}/cursos/categorias/subcategorias/cursos`,
        formData,
        config
      );

      if (response.status === 201) {
        alert("Curso adicionado com sucesso!");
        router.push("/cursos");
      } else {
        console.error("Erro ao adicionar curso:", response.data.error);
        setError(
          (response.data.Server as string) ||
            response.data.error ||
            "Erro ao adicionar curso"
        );
      }
    } catch (error: any) {
      console.error("Erro ao adicionar curso:", error);
      setError(
        (error.response?.data?.Server as string) ||
          "Erro ao adicionar curso. Tente novamente mais tarde."
      );
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.main}>
        <h1>Adicionar Curso</h1>
        <form onSubmit={handleSubmit} className={styles.form}>
          {error && <p className={styles.error}>{error}</p>}
          <div className={styles.inputContainer}>
            <label>Título do Curso:</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className={styles.input}
            />
          </div>
          <div className={styles.inputContainer}>
            <label>Descrição:</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className={styles.input}
            />
          </div>
          <div className={styles.inputContainer}>
            <label>Git:</label>
            <input
              type="text"
              value={git}
              onChange={(e) => setGit(e.target.value)}
              className={styles.input}
            />
          </div>
          <div className={styles.inputContainer}>
            <label>Video (MP4):</label>
            <input
              type="file"
              accept=".mp4"
              onChange={handleVideoChange}
              className={styles.input}
            />
          </div>
          {uploadProgress !== null && (
            <div className={styles.progressContainer}>
              <label>Progresso de Upload:</label>
              <progress value={uploadProgress} max={100} />
              <span>{`${uploadProgress}%`}</span>
            </div>
          )}
          <div className={styles.inputContainer}>
            <label>Subcategoria:</label>
            <select
              value={selectedSubcategoryId}
              onChange={(e) => setSelectedSubcategoryId(e.target.value)}
              className={styles.input}
            >
              <option value="" disabled>
                {categories.length > 0
                  ? "Selecione uma subcategoria"
                  : "Carregando subcategorias..."}
              </option>
              {categories.length > 0 &&
                categories.map((category) =>
                  category.subcategorias.map((subcategory) => (
                    <option key={subcategory.id} value={subcategory.id}>
                      {subcategory.title}
                    </option>
                  ))
                )}
            </select>
          </div>
          <button type="submit" className={styles.submitButton}>
            Adicionar Curso
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddCurso;
