import type { FunctionComponent, SVGProps } from "react";

type Icon = FunctionComponent<SVGProps<SVGSVGElement>>;

export interface FeaturedEvent {
  label: string;
  title: string;
  description: string;
  poster: string;
  link: string;
}

export interface Club {
  name: string;
  description: string;
  Icon: Icon;
}

export interface Member {
  id: string;
  name: string;
  role: string;
  avatar: string; // URL ou import de la photo
}

export interface Pole {
  id: string;
  title: string;
  description?: string;
  members: Member[];
}
