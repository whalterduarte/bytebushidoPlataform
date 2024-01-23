import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import card from "../../styles/components/cursos/card.module.css";
import Image from "next/image";
import Link from "next/link";
import Painel from "../../components/painel/Painel";
import { CategoryType } from "../../types/Category";
import axios from "axios";

interface CursoProps {
  categories: CategoryType[];
}

const Curso: React.FC<CursoProps> = ({ categories }: CursoProps) => {
  const { data: session, status: sessionStatus } = useSession();
  const router = useRouter();
  const [accessToken, setAccessToken] = useState<string | null>(null);

  useEffect(() => {
    const fetchToken = async () => {
      try {
        if (session) {
          const res = await axios.get(
            `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/auth/session`
          );
          const sessionData = res.data;
          setAccessToken(sessionData.user.token);
        }
      } catch (error) {
        console.error("Error fetching token:", error);
      }
    };

    fetchToken();
  }, [session]);

  const fetchData = async () => {
    try {
      if (accessToken) {
        const res = await axios.get(`https://api-byte.vercel.app/cursos`, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });

        const data = res.data;
        console.log("Dados da API:", data);
      }
    } catch (error) {
      console.error("Erro ao buscar categorias:", error);
    }
  };

  useEffect(() => {
    if (accessToken) {
      fetchData();
    }
  }, [accessToken]);

  return (
    <div>
      {sessionStatus === "loading" && <div>Carregando...</div>}
      {sessionStatus === "authenticated" && (
        <div>
          {/* Conteúdo do componente Curso */}

          {session?.user?.role === "admin" && <Painel />}
          {session?.user?.role !== "admin" && (
            <main>
              <h1>Cursos</h1>
              <div className={card.main}>
                {categories && categories.length > 0 ? (
                  categories.map((cat) => (
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
                      <Link
                        className={card.category}
                        href={`cursos/${cat.slug}`}
                      >
                        {cat.title}
                      </Link>
                    </Link>
                  ))
                ) : (
                  <p>Nenhum curso disponível.</p>
                )}
              </div>
            </main>
          )}
        </div>
      )}
    </div>
  );
};

export default Curso;
