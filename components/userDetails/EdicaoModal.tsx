import React from "react";
import styles from "./EditModal.module.css";

interface EdicaoModalProps {
  closeEditModal: () => void;
}

const EdicaoModal: React.FC<EdicaoModalProps> = ({ closeEditModal }) => {
  return (
    <div className={styles.modal}>
      <button className={styles.closemodal} onClick={closeEditModal}>
        Fechar Modal
      </button>
      <h2>Modal de Edição</h2>
      {/* Conteúdo do modal de edição */}
    </div>
  );
};

export default EdicaoModal;
