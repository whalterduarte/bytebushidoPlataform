import React, { useEffect, useState } from "react";
import styles from "./userDetails.module.css";
import { User } from "../../types/User";
import { Session } from "next-auth";
import axios from "axios";
import Image from "next/image";
import { FaGithub } from "react-icons/fa";
import { LiaLinkedinIn } from "react-icons/lia";
import Link from "next/link";
import EdicaoModal from "./EdicaoModal";

interface UserComponentProps {
  session: Session | null;
}

const UserDetails: React.FC<UserComponentProps> = ({ session }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isEdit, setIsEdit] = useState(false);

  const openEditModal = () => {
    setIsEdit(true);
  };
  const closeEditModal = () => {
    setIsEdit(false);
  };
  //aqui
  useEffect(() => {
    const fetchToken = async () => {
      try {
        if (session) {
          const res = await axios.get(
            `https://aluno-bytebushido.vercel.app/api/auth/session`
          );
          const sessionData = res.data;
          setToken(sessionData.user.token);
        }
      } catch (error) {
        console.error("Error fetching token:", error);
      }
    };

    fetchToken();
  }, [session]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (token) {
          const res = await axios.get(`${process.env.BASEAPI}/users`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          console.log("API response:", res.data);
          setUser(res.data.user);
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchData();
  }, [token]);

  return (
    <div className={styles.container}>
      {user?.photo && (
        <Image
          className={styles.imgUser}
          src={user.photo}
          alt=""
          width={300}
          height={300}
        />
      )}
      <div>
        <a href={`${user?.git}`} target="_blank">
          <FaGithub className={`${styles.icon} ${styles.githubIcon}`} />
        </a>
        <a href={`${user?.linkedin}`} target="_blank">
          <LiaLinkedinIn className={`${styles.icon} ${styles.linkedinIcon}`} />
        </a>
      </div>
      <div className={styles.area}>
        <h3>
          Nome: <span>{user?.name}</span>
        </h3>
        <h3>
          E-Mail: <span>{user?.email}</span>
        </h3>
        <div className={styles.editarea}>
          {" "}
          <div className={styles.editarea}>
            <button className={styles.editInfo} onClick={openEditModal}>
              Editar informações
            </button>
          </div>
        </div>
      </div>
      {isEdit && <EdicaoModal closeEditModal={closeEditModal} />}
    </div>
  );
};

export default UserDetails;
