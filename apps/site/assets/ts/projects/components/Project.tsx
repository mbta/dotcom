import { Image } from "./Image"
import { Route } from "./Route"

export interface Project {
  date: string;
  date_end: string;
  id: number;
  image: Image | null;
  location: string | null;
  path: string;
  routes: Route[];
  status: string | null;
  text: string;
  title: string;
  topic: string;
}
