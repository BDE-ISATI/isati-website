import pb from "@/shared/lib/pocketbase";
import type { ValidationWithRelations } from "@/shared/types/sharedTypes";

const VIDEO_PATTERN = /\.(mp4|mov|webm|m4v)$/i;

export type ProofFile = {
  name: string
  url: string
  isVideo: boolean
}

export default function proofFiles(validation: ValidationWithRelations): ProofFile[] {
  if (!Array.isArray(validation.proof_file)) return [];

  return validation.proof_file.map((name) => ({
    name: name,
    url: pb.files.getURL(validation, name),
    isVideo: VIDEO_PATTERN.test(name),
  }));
}

export function proofThumbUrl(validation: ValidationWithRelations, proof: ProofFile, thumb: string) {
  return proof.isVideo ? proof.url : pb.files.getURL(validation, proof.name, { thumb: thumb });
}
