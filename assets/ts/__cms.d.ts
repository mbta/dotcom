export interface Teaser {
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
  mode: string | null;
  id: string;
  group: string;
}
