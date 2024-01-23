import { useEffect } from "react";
import { getSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useState } from "react";
import styles from "../../../styles/components/addcategory.module.css";
import axios, { AxiosRequestConfig } from "axios";
import { CategoryType } from "../../../types/Category";

const AddSubcategoria = () => {
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [photo, setPhoto] = useState<File | null>(null);
  const [selectedCategoryId, setSelectedCategoryId] = useState<number | string>(
    ""
  );
  const [error, setError] = useState<string | null>(null);
  const [categories, setCategories] = useState<CategoryType[]>([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const session = await getSession();

        if (session) {
          const response = await axios.get<{ categories: CategoryType[] }>(
            `https://api-byte.vercel.app/cursos`,
            {
              headers: {
                Authorization: `Bearer ${session.user.token}`,
              },
            }
          );
          setCategories(response.data.categories);
        } else {
          // Se não houver sessão, redirecione para a página de login
          router.push("/login");
        }
      } catch (error) {
        console.error("Erro ao buscar categorias:", error);
      }
    };

    fetchCategories();
  }, [router]);

  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const selectedFile = e.target.files[0];

      if (
        selectedFile.type === "image/jpeg" ||
        selectedFile.type === "image/png" ||
        selectedFile.type === "image/jpg"
      ) {
        setPhoto(selectedFile);
        setError(null);
      } else {
        setPhoto(null);
        setError(
          "Apenas arquivos nos formatos JPG, JPEG ou PNG são permitidos."
        );
        e.target.value = "";
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
      formData.append("photo", photo as Blob);
      formData.append("categoriaId", String(selectedCategoryId));

      const config: AxiosRequestConfig<FormData> = {
        headers: {
          Authorization: `Bearer ${session.user.token}`,
        },
      };

      const response = await axios.post(
        `https://api-byte.vercel.app/cursos/categorias/subcategorias`,
        formData,
        config
      );

      if (response.status === 201) {
        alert("Subcategoria adicionada com sucesso!");
        router.push("/cursos");
      } else {
        console.error("Erro ao adicionar subcategoria:", response.data.error);

        setError(
          (response.data.Server as string) ||
            response.data.error ||
            "Erro ao adicionar subcategoria"
        );
      }
    } catch (error: any) {
      console.error("Erro ao adicionar subcategoria:", error);

      setError(
        (error.response?.data?.Server as string) ||
          "Erro ao adicionar subcategoria. Tente novamente mais tarde."
      );
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.main}>
        <h1>Adicionar Subcategoria</h1>
        <form onSubmit={handleSubmit} className={styles.form}>
          {error && <p className={styles.error}>{error}</p>}
          <div className={styles.inputContainer}>
            <label>Título da Subcategoria:</label>
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
          <div className={styles.inputContainer}>
            <label>Categoria:</label>
            <select
              value={selectedCategoryId}
              onChange={(e) => setSelectedCategoryId(e.target.value)}
              className={styles.input}
            >
              <option value="" disabled>
                Selecione uma categoria
              </option>
              {categories.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.title}
                </option>
              ))}
            </select>
          </div>
          <button type="submit" className={styles.submitButton}>
            Adicionar Subcategoria
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddSubcategoria;
