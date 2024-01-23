import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import card from "../../styles/components/cursos/card.module.css";
import { getSession } from "next-auth/react";
import { CategoryType } from "../../types/Category";
import { GetServerSideProps } from "next";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import Painel from "../../components/painel/Painel";
import { send } from "process";

interface CursoProps {
  categories: CategoryType[];
}

const Curso: React.FC<CursoProps> = ({ categories }: CursoProps) => {
  const { data: session, status: sessionStatus } = useSession();
  const router = useRouter();

  useEffect(() => {
    // Tratamento de redirecionamento no lado do cliente
    const redirectTimeout = setTimeout(() => {
      if (sessionStatus === "unauthenticated") {
        return <div>Voce esta {sessionStatus}</div>;
      }
    }, 1000);

    return () => clearTimeout(redirectTimeout);
  }, [sessionStatus, router]);

  if (sessionStatus === "loading") {
    return <div>Carregando...</div>;
  }

  if (sessionStatus === "unauthenticated") {
    return <div>Você não está autenticado. Redirecionando para o login...</div>;
  }

  // Agora, podemos renderizar o conteúdo do componente normalmente
  return (
    <div>
      {/* Conteúdo do componente Curso */}
      {session?.user?.role === "admin" && <Painel />}
      {session?.user?.role !== "admin" && (
        <main>
          <h1>Cursos</h1>
          {categories.length === 0 ? (
            <p>Nenhum curso disponível no momento.</p>
          ) : (
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
          )}
        </main>
      )}
    </div>
  );
};

export default Curso;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await getSession(context);

  try {
    if (!session) {
      throw new Error("Usuário não autenticado");
    }

    const res = await axios.get(`https://api-byte.vercel.app/cursos`, {
      headers: {
        Authorization: `Bearer ${session?.user?.token || ""}`,
      },
    });

    if (res.status !== 200) {
      console.error(
        "Erro ao buscar categorias - Status não OK:",
        res.status,
        res.statusText
      );
      throw new Error("Erro ao buscar categorias");
    }

    const data = res.data;

    if (!data || !data.categories) {
      console.error("Erro ao buscar categorias - Dados inválidos:", data);
      throw new Error("Erro ao buscar categorias");
    }

    return {
      props: {
        categories: data.categories,
      },
    };
  } catch (error) {
    console.error("Erro ao buscar categorias:", error);

    // Redirecionar para a página de login em caso de erro ou usuário não autenticado
    return {
      redirect: {
        destination: "/login",
        permanent: false,
      },
    };
  }
};
