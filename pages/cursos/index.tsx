import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import card from "../../styles/components/cursos/card.module.css";
import Image from "next/image";
import Link from "next/link";
import Painel from "../../components/painel/Painel";
import { CategoryType } from "../../types/Category";

interface CursoProps {
  categories: CategoryType[];
}

const Curso: React.FC<CursoProps> = ({ categories }: CursoProps) => {
  const { data: session, status: sessionStatus } = useSession();
  const router = useRouter();

  useEffect(() => {
    const checkSession = async () => {
      if (!session) {
        await router.push("/");
      }
    };

    checkSession();
  }, [session, router]);

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
