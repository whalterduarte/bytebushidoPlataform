import { GetServerSideProps, GetServerSidePropsContext } from "next";
import axios from "axios";
import { getSession } from "next-auth/react";
import styles from "./Cursos.module.css";
import { FaGitSquare } from "react-icons/fa";
import { CategoryType, SubcategoryType, CursoType } from "../../../types/Category";
import Image from "next/image";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { Player, ControlBar, ForwardControl, PlaybackRateMenuButton } from "video-react";
import "video-react/dist/video-react.css"; // Importe o CSS do video-react

interface CategoriaProps {
  category: CategoryType;
}

const Categoria: React.FC<CategoriaProps> = ({ category }: CategoriaProps) => {
  const router = useRouter();
  const { slug } = router.query;
  const [selectedCurso, setSelectedCurso] = useState<CursoType | null>(null);
  const [selectedSubcategory, setSelectedSubcategory] = useState<SubcategoryType | null>(null);
  const [playbackRate, setPlaybackRate] = useState<number>(1.0); // Estado para controlar a velocidade de reprodução
  const [quality, setQuality] = useState<string>("auto"); // Estado para controlar a qualidade do vídeo, padrão para "auto"

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
                  Selecione um curso no menu superior.
                </p>
              </div>
            )}
          </main>

          <div className={styles.selectedCursoContent}>
            {selectedCurso ? (
              <div >
                <Player
                  src={selectedCurso.video}
                  fluid={true}
                  
                  autoPlay
                  playsInline
                >
                  <ControlBar autoHide={false}>
                    <ForwardControl />
                    <PlaybackRateMenuButton rates={[0.5, 0.75, 1, 1.25, 1.5, 2]} />
                    {/* Aqui você pode adicionar outros controles, como o botão de qualidade */}
                  </ControlBar>
                </Player>
              </div>
            ) : (
              <div className={styles.welcome}>
               {/* AQUI VAI FICAR A INDEX DOS CURSOS */}
               <h1>BEM VINDO BYTE BUSHIDO</h1>
              </div>
            )}
          </div>
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
                <span className={styles.git}>
                  <FaGitSquare />
                  GitHub do projeto
                </span>
                <span className={styles.git}>
                  <FaGitSquare />
                  Forum
                </span>
              </a>
            </div>
          ) : (
            <></>
          )}
        </div>
        <br />
    </div>
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
    const res = await axios.get(`${process.env.BASEAPI}/cursos`, {
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
