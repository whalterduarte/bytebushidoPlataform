export type CategoryType = {
  id: number;
  slug: string;
  title: string;
  photo: string;
  createdAt: string;
  categoria: Categoria;
  subcategorias: SubCategory[];
};

export type Categoria = {
  id: number;
  slug: string;
  title: string;
  photo: string;
  createdAt: string;
  subcategorias: SubCategory[];
  cursos: CourseType[];  // Adicione esta linha
};

export type SubCategory = {
  id: number;
  slugSubCategory: string;
  categoriaId: number;
  title: string;
  photo: string;
  createdAt: string;
  cursos: CourseType[];
};

export type CourseType = {
  id: number;
  slugCursos: string;  // Corrija aqui para referenciar slugCursos
  photo: string,
  title: string;
  file: string;
  createdAt: string;
  subcategoriaId: number;
  subcategoria: SubCategory;
};
