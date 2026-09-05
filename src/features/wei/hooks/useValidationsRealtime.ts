import { useEffect } from "react";
import { useQueryClient } from "@tanstack/react-query";
import type { UnsubscribeFunc } from "pocketbase";
import pb from "@/shared/lib/pocketbase";

const STALE_KEYS = [["validations"], ["validation"], ["teamScores"], ["teamScore"], ["teamMembers"], ["participationScores"]];

export default function useValidationsRealtime(enabled: boolean) {
  const queryClient = useQueryClient();

  useEffect(() => {
    if (!enabled) return;

    let cancelled = false;
    let unsubscribe: UnsubscribeFunc | undefined;

    pb.collection("validations")
      .subscribe("*", () => {
        STALE_KEYS.forEach((queryKey) => queryClient.invalidateQueries({ queryKey }));
      })
      .then((fn) => {
        if (cancelled) fn();
        else unsubscribe = fn;
      })
      .catch(() => undefined);

    return () => {
      cancelled = true;
      unsubscribe?.();
    };
  }, [enabled, queryClient]);
}
