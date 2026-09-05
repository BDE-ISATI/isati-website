import { Link } from "react-router";


export default function NotFound() {
  return (
    <div className="flex flex-1 items-center justify-center px-4">
      <div className="w-full max-w-lg flex flex-col items-center gap-2 text-center -mt-16">
        <h1 className="text-lg font-semibold">
          Cette page n'est malheureusement pas disponible.
        </h1>
        <p className="text-sm text-muted-foreground">
          Le lien que vous avez suivi est peut-être rompu, ou la page a été supprimée.{" "}
          <Link to="/" className="text-accent font-medium hover:underline">
            Retour à ISATI.
          </Link>
        </p>
      </div>
    </div>
  );
}
