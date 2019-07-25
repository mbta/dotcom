import { Image } from "./Image";
import { Route } from "./Route";

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
