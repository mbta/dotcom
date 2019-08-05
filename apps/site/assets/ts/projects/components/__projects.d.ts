export interface Project {
  date: string;
  id: number;
  image: Image | null;
  path: string;
  routes: Route[];
  status: string | null;
  text: string;
  title: string;
}

export interface Image {
  url: string;
  alt: string;
}

export interface Route {
  mode: string;
  id: string;
  group: string;
}
