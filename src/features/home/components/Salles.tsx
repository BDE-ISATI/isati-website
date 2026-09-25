import useSalles from "@/features/home/hook/useSalles";
import type { Room, Course } from '@/features/home/hook/useSalles';

export default function Salles() {

  const { data = [], isPending, error } = useSalles();

  console.log("Données PocketBase:", data);

  if (isPending) return <div> <h1>Les salles sont en cours de chargement</h1> </div>; 
  if (error) return <div> <h1>Aie, y'a un soucis, va falloir que cherche une salle tout seul</h1> </div>;

  async function maj() {
    const response = await fetch("http://127.0.0.1:8090/api/sync-rooms", {
    method: "POST"
  });

  const data2 = await response.json();
  console.log(data2);
  }

  function enMinutes(heureString: string): number {
    const [h, m] = heureString.split(":").map(Number);
    return h! * 60 + m!;
  }

  function isAvailable(salle:Room) {
    const now = new Date();
    const aujourdhui = now.toLocaleDateString("fr-CA");
    
    const heureActuelle = now.toLocaleTimeString("fr-FR", { 
      hour: "2-digit", 
      minute: "2-digit" 
    });

    const coursDuJour = salle.edt.filter((c) => c.day === aujourdhui);

    if (coursDuJour.length == 0) {
      return {
        state:true,
        next_change:"fin de journée"
      }
    }

    //Fusionne les cours avec une pause <= 15 min
    let coursFusion: Course[] = [];

    let debutBloc = coursDuJour[0]!.startHour;
    let finBloc = coursDuJour[0]!.endHour;

    for (let i = 1; i < coursDuJour.length; i++) {
      const finEnMinutes = enMinutes(finBloc);
      const debutSuivantEnMinutes = enMinutes(coursDuJour[i]!.startHour);

      if (finEnMinutes + 15 >= debutSuivantEnMinutes) {
        finBloc = coursDuJour[i]!.endHour;
      } else {
        coursFusion.push({ day: aujourdhui, startHour: debutBloc, endHour: finBloc });
        
        debutBloc = coursDuJour[i]!.startHour;
        finBloc = coursDuJour[i]!.endHour;
      }
    }
    coursFusion.push({ day: aujourdhui, startHour: debutBloc, endHour: finBloc });

    //Récupère les cours qui restent de la journée
    const coursRestants = coursFusion.filter((c) => c.endHour > heureActuelle);
    
    if (coursRestants.length == 0) {
      return {
        state:true,
        next_change:"fin de journée"
      }
    }

    //Si je suis pendant un cours
    if (coursRestants[0]!.startHour <= heureActuelle) {

      return {
        state:false,
        next_change:coursRestants[0]!.endHour
      }
    }

    //Si je suis avant un cours
    else {
      return {
        state:true,
        next_change:coursRestants[0]?.startHour
      }
    }
    
  }


  return (
    <div className="mt-14 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 w-full p-4">

    <button className="h-32 w-128 bg-slate-200" onClick={maj}> Mettre à jour</button>
    {data.map((salle) => {
      
      const { state, next_change } = isAvailable(salle);
      
      return(
        <div
            key={salle.name}
            style={{ backgroundColor:state ? "#12c912b0" : "#ff00009a"  }}
          >
            {/* En-tête de la carte (Nom de la salle) */}
            <div className="bg-black/30 p-4 border-b border-white/5 backdrop-blur-md">
              <h3 className="text-2xl font-extrabold text-white uppercase tracking-wider text-center truncate">
                {salle.name}
              </h3>
            </div>

            {/* Corps de la carte (Données) */}
            <div className="flex flex-col items-center justify-center p-6 flex-grow space-y-5">
              

              {/* Bloc Heure avec typographie distincte */}
              <div className="flex flex-col items-center text-center">
                <span className="text-white/60 text-xs font-medium uppercase tracking-wider mb-1">
                  {state ? "Disponible jusqu'à" : "Se libère à"}
                </span>
                <span className="text-white font-mono text-3xl font-light">
                  {next_change}
                </span>
              </div>

            </div>
          </div>
      )
    })
    }

    </div>
  );
}