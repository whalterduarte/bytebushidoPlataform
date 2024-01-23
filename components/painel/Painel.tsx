import React, { useEffect } from "react";
import styles from "./Painel.module.css";
import MenuPainel from "../menuPainel/MenuPainel";
import axios from "axios";

const Painel = () => {
  return (
    <div className={styles.container}>
      <span>Bem Vindo voce e um : Administrado</span>
      <div>
        <MenuPainel />
      </div>
    </div>
  );
};

export default Painel;
