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

export interface Link {
  alt: string;
  url: string;
}

export interface Banner {
  blurb: string;
  link: Link;
  thumb: Image;
  banner_type: "default" | "important";
  text_position: "left" | "right";
  category: string;
  routes: Route[];
  title: string;
  updated_on: string;
  utm_url: string;
}

export interface ProjectTeaser {
  id: string;
  type: "project";
  path: string;
  title: string;
  routes: Route[];
  image: Image;
  text: string | null;
  topic: string | null;
  date: string | null; // Need to post-process?
  date_end: string | null;
  location: Location | null;
  status: string | null;
}

export interface ProjectTeaserWithDate extends ProjectTeaser {
  formatted_date: string;
}
