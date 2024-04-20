// components/User.tsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import { User } from "../../types/User";
import { Session } from "next-auth";
import Image from "next/image";
import styles from "./User.module.css";

interface UserComponentProps {
  session: Session | null;
}

const UserComponent: React.FC<UserComponentProps> = ({ session }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  //
  useEffect(() => {
    const fetchToken = async () => {
      try {
        if (session) {
          const res = await axios.get(
            `${process.env.BASE}/api/auth/session`
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
          width={60}
          height={60}
        />
      )}
    </div>
  );
};

export default UserComponent;
