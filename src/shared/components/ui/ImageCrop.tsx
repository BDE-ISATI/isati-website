import { useState } from "react";
import Cropper, { type Area, type Point } from "react-easy-crop";

interface ImageCropProps {
  src: string,
  aspect?: number,
  cropShape?: "rect" | "round",
  onAreaChange: (area: Area) => void,
}

/**
 * Zone de recadrage : l'image se déplace à la souris et se redimensionne au
 * curseur de zoom. La zone retenue est remontée en pixels de l'image source.
 */
export default function ImageCrop({ src, aspect = 1, cropShape = "round", onAreaChange }: ImageCropProps) {

  const [ crop, setCrop ] = useState<Point>({ x: 0, y: 0 });
  const [ zoom, setZoom ] = useState<number>(1);

  return (
    <div className="flex flex-col gap-2">
      <div className="relative h-48 w-full overflow-hidden rounded-md bg-muted">
        <Cropper
          image={src}
          crop={crop}
          zoom={zoom}
          aspect={aspect}
          cropShape={cropShape}
          showGrid={false}
          onCropChange={setCrop}
          onZoomChange={setZoom}
          onCropComplete={(_croppedArea, croppedAreaPixels) => onAreaChange(croppedAreaPixels)}
        />
      </div>

      <input type="range" min={1} max={3} step={0.05} value={zoom} aria-label="Zoom"
        onChange={(e) => setZoom(Number(e.target.value))}
        className="w-full accent-accent"
      />
    </div>
  );
}
