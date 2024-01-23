import React, { useState } from "react";
import style from "./Navbar.module.css";
import { Home, Menu, PlayCircleOutline, YouTube } from "@material-ui/icons";
import CloseIcon from "@material-ui/icons/Close";
import Image from "next/image";
import Link from "next/link";
import { signOut, useSession } from "next-auth/react";
import UserComponent from "../user/User";

const NavBar = () => {
  const { data: session } = useSession();

  const [isExpanded, setIsExpanded] = useState(false);

  const toggleWidth = () => {
    setIsExpanded((open) => !open);
  };

  return (
    <nav className={`${style.container} ${isExpanded ? style.expanded : ""}`}>
      {isExpanded ? (
        <CloseIcon
          className={style.icon}
          onClick={toggleWidth}
          style={{ cursor: "pointer" }}
        />
      ) : (
        <Menu
          className={style.icon}
          onClick={toggleWidth}
          style={{ cursor: "pointer" }}
        />
      )}

      {isExpanded ? (
        <Link href="/" className={`${style.links} ${style.linksExpanded}`}>
          <Home className={style.home} fontSize="large" />
          <span className={style.link}>Home</span>
        </Link>
      ) : (
        <Link href="/" className={style.links}>
          <Home fontSize="large" className={style.home} />
        </Link>
      )}

      {isExpanded ? (
        <Link
          href="/cursos"
          className={`${style.links} ${style.linksExpanded}`}
        >
          <PlayCircleOutline fontSize="large" className={style.home} />
          <span className={style.link}>Cursos</span>
        </Link>
      ) : (
        <Link href="/cursos" className={style.links}>
          <PlayCircleOutline fontSize="large" className={style.home} />
        </Link>
      )}

      {isExpanded ? (
        <a
          href="https://youtube.com"
          className={`${style.links} ${style.linksExpanded}`}
        >
          <YouTube fontSize="large" className={style.home} />
          <span className={style.link}>Youtube</span>
        </a>
      ) : (
        <a href="https://youtube.com" className={style.links}>
          <YouTube fontSize="large" className={style.home} />
        </a>
      )}

      <div className={style.login}>
        {session ? (
          <Link href={"/login"}>
            <UserComponent session={session}></UserComponent>
          </Link>
        ) : (
          <Link className={style.loginLink} href="/login">
            ENTRAR
          </Link>
        )}
      </div>
    </nav>
  );
};

export default NavBar;
