import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import card from "../../styles/components/cursos/card.module.css";
import style from "../../styles/components/cursos/cursos.module.css";

import { CategoryType } from "../../types/Category";

interface CursoProps {
  categories: CategoryType[];
}

const Curso: React.FC<CursoProps> = ({ categories }) => {
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
            <main className={style.container}>
              <h1 className={card.curso}>Cursos</h1>
            </main>
          )}
        </div>
      )}
    </div>
  );
};

export default Curso;
