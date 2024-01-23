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

  useEffect(() => {
    setSelectedCurso(null);
    const subcategory = category.subcategorias.find((sub) => sub.slug === slug);
    setSelectedSubcategory(subcategory || null);
  }, [slug, category]);

  const handleCursoClick = (curso: CursoType) => {
    setSelectedCurso(curso);
  };

  return (
    <div className={styles.mainContainer}>
      <div className={styles.menuContainer}>
        <aside className={styles.sidebar}>
          {category.subcategorias.map((sub) => (
            <div key={sub.id} onClick={() => setSelectedSubcategory(sub)}>
              <Image
                className={styles.subPhoto}
                src={sub.photo}
                alt={sub.title}
                width={50}
                height={50}
              />
            </div>
          ))}
        </aside>
      </div>
      <div className={styles.page}>
        <div className={styles.submenu}>
          <main className={styles.mainContent}>
            {selectedSubcategory ? (
              <div className={styles.cursomenu} key={selectedSubcategory.id}>
                {selectedSubcategory.cursos.length > 0 ? (
                  selectedSubcategory.cursos.map((curso) => (
                    <div
                      className={styles.titleCurso}
                      key={curso.id}
                      onClick={() => handleCursoClick(curso)}
                    >
                      {curso.title}
                    </div>
                  ))
                ) : (
                  <div className={styles.noCursoMessage}>
                    Nada por aqui ainda. Estamos trabalhando duro para trazer
                    novos cursos em breve. Fique de olho!
                  </div>
                )}
              </div>
            ) : (
              <div className={styles.cursomenu}>
                <p className={styles.titleCurso}>
                  Selecione uma curso no menu superior.
                </p>
              </div>
            )}
          </main>

          <div>
            {selectedCurso ? (
              <div className={styles.selectedCursoContent}>
                <ReactPlayer
                  url={selectedCurso.video}
                  controls
                  width="100%"
                  height="100%"
                  config={{
                    file: {
                      attributes: {
                        controlsList: "nodownload",
                      },
                    },
                  }}
                />
              </div>
            ) : (
              <div className={styles.welcome}>
                <Image
                  className={styles.imgWelcome}
                  src={"/torre.png"}
                  alt=""
                  height={500}
                  width={500}
                />
              </div>
            )}
          </div>
        </div>
        <div>
          {selectedCurso ? (
            <div className={styles.info}>
              <h1 className={styles.titleInfo}>{selectedCurso.title}</h1>
              <p className={styles.descInfo}>{selectedCurso.description}</p>
              <a
                href={selectedCurso.git}
                target="_blank"
                rel="noopener noreferrer"
              >
                <span>
                  <FaGitSquare />
                  GitHub do projeto
                </span>
              </a>
            </div>
          ) : (
            <></>
          )}
        </div>
      </div>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async (
  context: GetServerSidePropsContext
) => {
  const slug = context.params?.slug;
  const session = await getSession(context);

  if (!session) {
    throw new Error("Usuário não autenticado");
  }

  try {
    const res = await axios.get(`https://api-byte.vercel.app/cursos`, {
      headers: {
        Authorization: `Bearer ${session.user.token || ""}`,
      },
    });

    const categories = res.data.categories;
    const category = categories.find((cat: CategoryType) => cat.slug === slug);

    return {
      props: {
        category,
      },
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
