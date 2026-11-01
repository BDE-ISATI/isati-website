import type { Create, Update } from "@/shared/types/pocketbase-types";

export interface FeaturedEvent {
  label: string;
  title: string;
  description: string;
  poster: string;
  link: string;
}

export type OrganigrammeMemberCreateData = Omit<Create<"organigramme_member">, "avatar"> & { avatar?: File | null }
export type OrganigrammeMemberUpdateData = Omit<Update<"organigramme_member">, "avatar"> & { avatar?: File | null }
