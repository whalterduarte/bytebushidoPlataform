import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import card from "../../styles/components/cursos/card.module.css";
import style from "../../styles/components/cursos/cursos.module.css";
import { getSession } from "next-auth/react";
import { CategoryType } from "../../types/Category";
import { GetServerSideProps } from "next";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";

interface CursoProps {
  categories: CategoryType[];
}

const Curso: React.FC<CursoProps> = ({ categories }: CursoProps) => {
  const { data: session, status: sessionStatus } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (sessionStatus === "unauthenticated") {
      router.push("/login");
    }
  }, [sessionStatus, router]);

  return (
    <div>
      {sessionStatus === "loading" && <div>Carregando...</div>}
      {sessionStatus === "authenticated" && (
        <div>
          {/* Conteúdo do componente Curso */}

          {session?.user?.role === "admin" && <p>Você é um administrador.</p>}
          {session?.user?.role !== "admin" && (
            <main>
              <h1>Cursos</h1>
              <h1 className={card.main}>
                {categories.map((cat) => (
                  <Link
                    href={`cursos/${cat.slug}`}
                    className={card.container}
                    key={cat.id}
                  >
                    <Image
                      className={card.img}
                      src={cat.photo}
                      alt={cat.title}
                      width={220}
                      height={200}
                    />
                    <Link className={card.category} href={`cursos/${cat.slug}`}>
                      {cat.title}
                    </Link>
                  </Link>
                ))}
              </h1>
            </main>
          )}
        </div>
      )}
    </div>
  );
};

export default Curso;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const slug = context.params?.slug;
  const session = await getSession(context);

  // Se o usuário não estiver autenticado, redirecione para a página de login
  if (!session) {
    return {
      redirect: {
        destination: "/login",
        permanent: false,
      },
    };
  }

  try {
    // Faça a chamada para a API com o slug e o token de acesso
    const res = await axios.get(`${process.env.BASEAPI}/cursos`, {
      headers: {
        Authorization: `Bearer ${
          session.user.token || session.user.token || ""
        }`,
      },
    });

    const data = res.data;

    return {
      props: {
        categories: data.categories || [],
      },
    };
  } catch (error) {
    console.error("Erro ao buscar categorias:", error);

    return {
      props: {
        categories: [],
      },
    };
  }
};
