export type CategoryType = {
  id: number;
  slug: string;
  title: string;
  photo: string;
  createdAt: string;
  categoria: Categoria;
  subcategorias: SubcategoryType[];
};

export type Categoria = {
  id: number;
  slug: string;
  title: string;
  photo: string;
  createdAt: string;
  subcategorias: SubcategoryType[];
  cursos: CursoType[]; // Adicione esta linha
};

export type SubcategoryType = {
  id: number;
  slugSub: string;
  categoriaId: number;
  title: string;
  photo: string;
  createdAt: string;
  slug: string;
  cursos: CursoType[];
};

export type CursoType = {
  id: number;
  slugCurso: string;
  photo: string;
  title: string;
  video: string;
  description: string;
  git: string;
  createdAt: string;
  subcategoriaId: number;
  subcategoria: SubcategoryType;
};
