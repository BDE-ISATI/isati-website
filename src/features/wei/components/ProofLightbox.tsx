import { Dialog, DialogBackdrop, DialogPanel, DialogTitle } from "@headlessui/react";
import type { ValidationWithRelations } from "@/shared/types/sharedTypes";
import ProofCarousel from "@/features/wei/components/ProofCarousel";
import Button from "@/shared/components/ui/Button";
import XIcon from "@/assets/icons/x.svg?react";

interface ProofLightboxProps {
  validation: ValidationWithRelations
  open: boolean
  onClose: () => void
}

export default function ProofLightbox({ validation, open, onClose }: ProofLightboxProps) {

  const challenge = validation.expand?.challenge;
  const user = validation.expand?.user;

  return (
    <Dialog open={open} onClose={onClose} className="relative z-50">
      <DialogBackdrop transition className="fixed inset-0 bg-black/70 transition duration-200 data-closed:opacity-0" />

      <div className="fixed inset-0 flex items-center justify-center p-4">
        <DialogPanel
          transition
          className="flex w-full max-w-3xl flex-col gap-3 rounded-md border border-border bg-card p-4 text-card-foreground shadow-lg transition duration-200 data-closed:scale-95 data-closed:opacity-0 sm:p-6"
        >
          <div className="flex flex-row items-start justify-between gap-3">
            <div className="flex min-w-0 flex-col">
              <DialogTitle className="truncate font-semibold">
                {challenge?.title || "Preuve"}
              </DialogTitle>
              {user?.username && (
                <span className="truncate text-sm text-muted-foreground">{user.username}</span>
              )}
            </div>

            <Button type="button" onClick={onClose} variant="ghost" size="icon" aria-label="Fermer">
              <XIcon className="h-5 w-5" />
            </Button>
          </div>

          <ProofCarousel validation={validation} />
        </DialogPanel>
      </div>
    </Dialog>
  );
}
