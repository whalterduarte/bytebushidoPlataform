import { GetServerSideProps, GetServerSidePropsContext } from "next";
import axios from "axios";
import { getSession } from "next-auth/react";
import styles from "./Cursos.module.css";
import { FaGitSquare } from "react-icons/fa";
import {
  CategoryType,
  SubcategoryType,
  CursoType,
} from "../../../types/Category";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import ReactPlayer from "react-player";

interface CategoriaProps {
  category: CategoryType;
}

const Categoria: React.FC<CategoriaProps> = ({ category }: CategoriaProps) => {
  const router = useRouter();
  const { slug } = router.query;
  const [selectedCurso, setSelectedCurso] = useState<CursoType | null>(null);
  const [selectedSubcategory, setSelectedSubcategory] =
    useState<SubcategoryType | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setSelectedCurso(null);
    const subcategory = category?.subcategorias.find(
      (sub) => sub.slug === slug
    );
    setSelectedSubcategory(subcategory || null);
  }, [slug, category]);

  const handleCursoClick = (curso: CursoType) => {
    setSelectedCurso(curso);
  };

  if (error) {
    return <div>Erro ao carregar dados da categoria: {error}</div>;
  }

  return (
    <div className={styles.mainContainer}>{/* Restante do código... */}</div>
  );
};

export const getServerSideProps: GetServerSideProps = async (
  context: GetServerSidePropsContext
) => {
  const slug = context.params?.slug;
  const session = await getSession(context);

  if (!session) {
    return {
      redirect: {
        destination: "/login",
        permanent: false,
      },
    };
  }

  try {
    const res = await axios.get(`https://api-byte.vercel.app/cursos`, {
      headers: {
        Authorization: `Bearer ${session.user.token || ""}`,
      },
    });

    const categories = res.data.categories;
    const category = categories.find((cat: CategoryType) => cat.slug === slug);

    if (!category) {
      throw new Error("Categoria não encontrada");
    }

    return {
      props: {
        category,
      },
      revalidate: 60 * 5, // Revalidar a cada 5 minutos
    };
  } catch (error) {
    console.error("Erro ao buscar detalhes da categoria:", error);

    return {
      props: {
        category: null,
      },
    };
  }
};

export default Categoria;
