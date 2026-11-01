import { useMemo } from "react";

import IsatIcon from "@/assets/logos/isati_notext.svg?react";

const SPACING = 18;
const ICON_SIZE = 8;

const LETTER_BLUEPRINTS: number[][][] = [
  [
    [1, 1, 1, 1, 1, 1, 1, 1],
    [1, 1, 1, 1, 1, 1, 1, 1],
    [1, 1, 0, 0, 0, 0, 0, 0],
    [1, 1, 0, 0, 0, 0, 0, 0],
    [1, 1, 1, 1, 1, 1, 0, 0],
    [1, 1, 1, 1, 1, 1, 0, 0],
    [1, 1, 0, 0, 0, 0, 0, 0],
    [1, 1, 0, 0, 0, 0, 0, 0],
    [1, 1, 1, 1, 1, 1, 1, 1],
    [1, 1, 1, 1, 1, 1, 1, 1],
  ],
  [
    [0, 1, 1, 1, 1, 1, 1, 0],
    [1, 1, 1, 1, 1, 1, 1, 1],
    [1, 1, 0, 0, 0, 0, 0, 0],
    [1, 1, 1, 1, 1, 1, 0, 0],
    [0, 1, 1, 1, 1, 1, 1, 0],
    [0, 0, 0, 0, 0, 0, 1, 1],
    [0, 0, 0, 0, 0, 0, 1, 1],
    [1, 1, 0, 0, 0, 0, 1, 1],
    [1, 1, 1, 1, 1, 1, 1, 1],
    [0, 1, 1, 1, 1, 1, 1, 0],
  ],
  [
    [1, 1, 1, 1, 1, 1],
    [1, 1, 1, 1, 1, 1],
    [0, 0, 1, 1, 0, 0],
    [0, 0, 1, 1, 0, 0],
    [0, 0, 1, 1, 0, 0],
    [0, 0, 1, 1, 0, 0],
    [0, 0, 1, 1, 0, 0],
    [0, 0, 1, 1, 0, 0],
    [1, 1, 1, 1, 1, 1],
    [1, 1, 1, 1, 1, 1],
  ],
  [
    [1, 1, 1, 1, 1, 1, 0, 0],
    [1, 1, 1, 1, 1, 1, 1, 0],
    [1, 1, 0, 0, 0, 0, 1, 1],
    [1, 1, 0, 0, 0, 0, 1, 1],
    [1, 1, 1, 1, 1, 1, 1, 0],
    [1, 1, 1, 1, 1, 1, 0, 0],
    [1, 1, 0, 0, 1, 1, 0, 0],
    [1, 1, 0, 0, 1, 1, 0, 0],
    [1, 1, 0, 0, 0, 1, 1, 0],
    [1, 1, 0, 0, 0, 0, 1, 1],
  ],
];

interface StudentCountProps {
  totalStudents?: number;
  dispersionLevel?: number;
}

export default function StudentCount({ totalStudents = 450, dispersionLevel = 6 }: StudentCountProps) {

  const points = useMemo(() => {
    const rawCoords: { x: number; y: number }[] = [];
    let offsetX = 0;

    for (const grid of LETTER_BLUEPRINTS) {
      grid.forEach((row, rIdx) => {
        row.forEach((cell, cIdx) => {
          if (cell === 1) rawCoords.push({ x: offsetX + cIdx * SPACING, y: rIdx * SPACING });
        });
      });
      offsetX += ((grid[0]?.length ?? 0) + 2) * SPACING;
    }

    const result = Array.from({ length: totalStudents }, (_, i) => {
      const base = rawCoords[i % rawCoords.length] ?? { x: 0, y: 0 };
      return {
        x: base.x + Math.sin(i * 12.9898) * dispersionLevel,
        y: base.y + Math.cos(i * 78.233) * dispersionLevel,
      };
    });

    result.sort((a, b) => a.y - b.y);

    return { coords: result, totalWidth: offsetX };
  }, [totalStudents, dispersionLevel]);

  return (
    <section className="flex select-none flex-col items-center justify-center bg-accent px-4 py-5 text-white md:flex-row">
      <h2 className="mb-10 text-center text-3xl font-extrabold tracking-tight md:text-5xl">
        + de <span className="text-[100px]">{totalStudents}</span> Étudiants à l'
      </h2>

      <div className="flex w-full max-w-5xl justify-center overflow-x-auto p-4">
        <svg viewBox={`-15 -15 ${points.totalWidth + 30} 220`} className="h-auto max-h-[350px] w-full">
          {points.coords.map((pt, i) => (
            <g key={i} transform={`translate(${pt.x - ICON_SIZE / 2}, ${pt.y - ICON_SIZE / 2})`}>
              <IsatIcon width={ICON_SIZE} height={ICON_SIZE} className="fill-white" />
            </g>
          ))}
        </svg>
      </div>
    </section>
  );
}
