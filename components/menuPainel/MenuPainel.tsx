import React from "react";
import styles from "./Menu.module.css";
import Link from "next/link";
import Image from "next/image";

const MenuPainel = () => {
  return (
    <main className={styles.main}>
      <nav className={styles.nav}>
        <header className={styles.container}>
          <Link className={styles.link} href={"/painel/addcategory"}>
            Adicionar Categoria
          </Link>
          <Link className={styles.link} href={"/painel/addsubcategory"}>
            Adicionar Subcategoria do Curso
          </Link>
          <Link className={styles.link} href={"/painel/addcurso"}>
            Adicionar Curso
          </Link>
          <Link className={styles.link} href={"/"}>
            Gerenciar Conteúdo
          </Link>
          <Link className={styles.link} href={"/"}>
            Gerenciar Usuários
          </Link>
        </header>
        <Image src={"/bytebushido.png"} alt="" width={300} height={300} />
      </nav>
      <div>Estatísticas (ESPAÇO PARA FUTURA IMPLEMENTAÇÃO)</div>
    </main>
  );
};

export default MenuPainel;
