import { GetStaticProps, GetStaticPaths } from "next";
import axios from "axios";
import { CategoryType } from "../../../types/Category";
import { ParsedUrlQuery } from "querystring";
import Image from "next/image";
import card from "../../../styles/components/cursos/card.module.css";
import style from "../../../styles/components/cursos/cursos.module.css";
import Link from "next/link";

const CategoryItem = () => {
  return <div>test</div>;
};

export default CategoryItem;
