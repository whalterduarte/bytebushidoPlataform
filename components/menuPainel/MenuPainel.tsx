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
            Adcionar Categoria
          </Link>
          <Link className={styles.link} href={"/painel/addsubcategory"}>
            Adcionar Sub Categoria do curso
          </Link>
          <Link className={styles.link} href={"/painel/addcurso"}>
            Adcionar Curso
          </Link>
          <Link className={styles.link} href={"/"}>
            Gerenciar Conteudo
          </Link>
          <Link className={styles.link} href={"/"}>
            Gerenciar Usuarios
          </Link>
        </header>
        <Image src={"/bytebushido.png"} alt="" width={300} height={300} />
      </nav>
      <div>Estatisticas "ESPAÇO PARA FUTURA IMPLEMENTAÇÃO"</div>
    </main>
  );
};

export default MenuPainel;
