import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import confetti from 'canvas-confetti';

import imgBanner from '../../assets/images/capa.png';

type Celebration = {
  id: string | number;
  title: string;
  subtitle?: string;
};

export function CelebrationModal({
  celebration,
  open,
  onOpenChange,
}: {
  celebration: Celebration | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  const launchConfetti = () => {
    const end = Date.now() + 3 * 1000;
    const colors = ['#a786ff', '#fd8bbc', '#eca184', '#f8deb1'];

    const frame = () => {
      if (Date.now() > end) return;

      confetti({
        particleCount: 2,
        angle: 60,
        spread: 55,
        startVelocity: 60,
        origin: { x: 0, y: 0.5 },
        colors,
      });

      confetti({
        particleCount: 2,
        angle: 120,
        spread: 55,
        startVelocity: 60,
        origin: { x: 1, y: 0.5 },
        colors,
      });

      requestAnimationFrame(frame);
    };

    frame();
  };

  const handleClose = () => {
    launchConfetti();
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="p-0 overflow-hidden rounded-xl max-w-xl">
        <img src={imgBanner} alt="" className="w-full" />

        <div className="p-6">
          <DialogHeader>
            <DialogTitle className="text-3xl font-semibold text-gray-900">
              {celebration?.title ?? 'Celebração'}
            </DialogTitle>
            {celebration?.subtitle && (
              <DialogDescription
                className="text-base mt-2 text-gray-600"
                dangerouslySetInnerHTML={{
                  __html: celebration.subtitle,
                }}
              />
            )}
          </DialogHeader>

          <DialogFooter className="mt-6">
            <div className="flex items-center gap-3">
              <Button variant="ghost" onClick={handleClose}>
                Fechar
              </Button>
            </div>
          </DialogFooter>
        </div>
      </DialogContent>
    </Dialog>
  );
}
