import { useMemo } from "react";

interface EsirPeopleTextProps {
  totalStudents?: number;
  dispersionLevel?: number; 
}

export default function StudentCount({ 
  totalStudents = 450, 
  dispersionLevel = 6 
}: EsirPeopleTextProps) {
  const LETTER_BLUEPRINTS: Record<string, number[][]> = {
    E: [
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
    S: [
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
    I: [
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
    R: [
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
  };

  const points = useMemo(() => {
    const rawCoords: { x: number; y: number }[] = [];
    const spacing = 18;
    let offsetX = 0;

    ["E", "S", "I", "R"].forEach((letter) => {
      const grid = LETTER_BLUEPRINTS[letter];
      grid.forEach((row, rIdx) => {
        row.forEach((cell, cIdx) => {
          if (cell === 1) {
            rawCoords.push({
              x: offsetX + cIdx * spacing,
              y: rIdx * spacing,
            });
          }
        });
      });
      offsetX += (grid[0].length + 2) * spacing;
    });

    const result: { x: number; y: number }[] = [];
    
    for (let i = 0; i < totalStudents; i++) {
      const baseCoord = rawCoords[i % rawCoords.length];
      
      // Application de la variable dispersionLevel
      const dispersionX = Math.sin(i * 12.9898) * dispersionLevel;
      const dispersionY = Math.cos(i * 78.233) * dispersionLevel;

      result.push({
        x: baseCoord.x + dispersionX,
        y: baseCoord.y + dispersionY,
      });
    }

    result.sort((a, b) => a.y - b.y);

    return { coords: result, totalWidth: offsetX };
  }, [totalStudents, dispersionLevel]);

  return (
    <section className="flex flex-row items-center justify-center py-5 px-4 bg-red-600 text-white select-none">

        <div className="flex flex-col text-center mb-10">
        <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight">
          + de <span className="text-[100px]">{totalStudents}</span> Étudiants à l'
        </h2>
      </div>


      <div className="w-full max-w-5xl overflow-x-auto flex justify-center p-4">
        <svg
          viewBox={`-15 -15 ${points.totalWidth + 30} 220`}
          className="w-full h-auto max-h-[350px]"
        >
          {points.coords.map((pt, i) => (
            <g
              key={i}
              transform={`translate(${pt.x}, ${pt.y})`}
              className="group cursor-pointer hover:scale-100 transition-transform duration-150 origin-bottom"
            >
              <circle
                cx="0"
                cy="-4"
                r="2.5"
                className="fill-white group-hover:fill-white transition-colors duration-150"
              />
              <path
                d="M -4,4 C -4,0 -2,-1 0,-1 C 2,-1 4,0 4,4 Z"
                className="fill-white stroke-slate-950 stroke-[0.5px] group-hover:fill-white transition-colors duration-150"
              />
            </g>
          ))}
        </svg>
      </div>

    
    </section>
  );
}