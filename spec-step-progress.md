# Spec — Composant `StepProgress`

Composant générique de frise à étapes. À implémenter tel quel, sans initiative sur l'API.

## Emplacement

```
src/shared/components/StepProgress/
├── StepProgress.tsx
└── index.ts          # re-export nommé
```

**Stack de style : Tailwind.** Aucun fichier CSS séparé, aucun CSS Module.
Pour composer les classes conditionnelles, réutiliser l'utilitaire déjà présent dans le projet (`cn`, `clsx` ou `tailwind-merge` — **vérifier `package.json` avant**, ne pas ajouter de dépendance). S'il n'y en a aucun, un template literal suffit.

## Portée — contrainte non négociable

Ce composant **ne connaît ni les dates, ni le WEI, ni aucun type métier**.

- ❌ Aucun import depuis `features/`, aucun import de `pocketbase-types`
- ❌ Aucune manipulation de `Date`
- ❌ Aucun appel réseau, aucun hook de données
- ✅ Reçoit une liste d'étapes et un nombre. Affiche. C'est tout.

Toute la logique temporelle vivra dans `features/wei/lib/milestones.ts`, hors de ce composant.

## API

```ts
export type StepProgressStep = {
  id: string
  label: string
  sublabel?: string
  tone?: 'default' | 'warning' | 'danger'   // défaut: 'default'
}

export type StepProgressProps = {
  steps: StepProgressStep[]
  value: number
  orientation?: 'horizontal' | 'vertical' | 'responsive'  // défaut: 'responsive'
  label: string          // aria-label de la frise, obligatoire
  className?: string
}
```

### Sémantique de `value`

Un flottant qui encode à la fois la position et l'entre-deux :

| `value` | Signification |
|---|---|
| `0` | sur la première étape |
| `2` | sur l'étape d'index 2 |
| `2.5` | entre l'étape 2 et l'étape 3 |
| `steps.length - 1` | sur la dernière étape |

C'est ce qui rend le composant réutilisable ailleurs (inscription multi-étapes, suivi de commande…).

## Structure de rendu

Alterner nœuds et connecteurs — **n nœuds, n−1 connecteurs** :

```
[nœud 0][connecteur 0][nœud 1][connecteur 1][nœud 2]
```

Chaque connecteur est un `flex: 1` contenant une piste et un remplissage. Les nœuds ont une largeur fixe.

⚠️ **Ne pas** positionner une barre unique en absolu par-dessus les nœuds. Le découpage en segments donne le demi-remplissage gratuitement et évite tout calcul de position.

## Calculs

```ts
// remplissage du connecteur i (entre le nœud i et i+1), en %
const fill = Math.min(1, Math.max(0, value - i)) * 100

// statut du nœud i
const status =
  i < value  ? 'done'
: i === value ? 'current'
:               'upcoming'
```

Note : quand `value` est un demi (2.5), aucun nœud n'est `current`. C'est voulu — le connecteur à moitié rempli porte l'information « en transit ».

**Borner `value` en entrée** : `clamp(value, 0, steps.length - 1)`. Traiter `NaN` comme `0`.

## Rendu horizontal

- Conteneur `display: flex; align-items: center`
- Les labels sont **positionnés en absolu sous leur nœud**, `transform: translateX(-50%)`, pour ne pas déformer l'espacement des connecteurs
- **Exception aux extrémités** : le premier label est aligné à gauche (`translateX(0)`), le dernier à droite (`translateX(-100%)`). Sans ça ils débordent du conteneur
- Le conteneur a un `padding-bottom` réservant la hauteur des labels (qui sont hors flux)
- `text-align: center` sur les labels intermédiaires, `max-width` d'environ 10 rem pour forcer le retour à la ligne plutôt que le chevauchement

## Rendu vertical

- `flex-direction: column`
- Labels à droite des nœuds, **dans le flux** — pas d'absolu, c'est inutile ici
- Les connecteurs deviennent verticaux : la piste et le remplissage inversent largeur et hauteur

## Mode `responsive`

Bascule **par variantes Tailwind uniquement**, jamais par `useMediaQuery` ou détection JS : un rendu initial faux au montage est visible et évitable.

Point de bascule = le `md:` de Tailwind (768px par défaut). Pas de prop pour le régler.

`orientation` sélectionne un jeu de classes :

```ts
const layout = {
  horizontal: 'flex-row items-center',
  vertical:   'flex-col items-start',
  responsive: 'flex-col items-start md:flex-row md:items-center',
}[orientation]
```

⚠️ Les classes conditionnelles doivent être **des chaînes complètes et littérales** dans le code, comme ci-dessus. Ne jamais construire un nom de classe par concaténation (`` `flex-${dir}` ``) : Tailwind ne le compilera pas.

Cette contrainte s'applique aussi aux nœuds et connecteurs, dont l'axe change. Prévoir des tables de correspondance du même type plutôt que des morceaux de classes assemblés.

## Accessibilité

**Ne pas utiliser `role="progressbar"`.** Il est fait pour une valeur continue ; ici les étapes sont discrètes et nommées.

- Élément racine : `<ol>` avec l'`aria-label` reçu en prop
- Chaque étape : `<li>`
- Étape courante : `aria-current="step"`
- Statut annoncé par du texte visuellement masqué dans chaque `<li>` : « Terminé », « En cours », « À venir ». Utiliser la classe `sr-only` de Tailwind, ne pas la réécrire
- Les connecteurs sont décoratifs : `aria-hidden="true"`
- Les icônes ou pastilles de nœud sont décoratives également — l'information passe par le texte

## Thème

Classes Tailwind pour tout le statique. **Une seule exception** : la couleur d'accent passe par une variable CSS.

```tsx
// racine
<ol
  style={{ '--sp-accent': accent } as React.CSSProperties}
  className="[--sp-accent:theme(colors.neutral.900)] …"
>
```

et à l'usage : `bg-[var(--sp-accent)]`, `border-[var(--sp-accent)]`.

**Pourquoi.** Tailwind compile les classes à la construction : `bg-${team.color}` ou `bg-[${color}]` avec une variable ne produit **aucune classe**. C'est l'erreur la plus fréquente sur ce genre de composant. La variable CSS est le seul moyen de faire passer une couleur dynamique (`style={{ '--sp-accent': team.color }}`), et elle a une valeur de repli via `[--sp-accent:…]` dans `className`.

Le reste en Tailwind pur :

| Élément | Direction |
|---|---|
| nœud fait | `bg-[var(--sp-accent)] border-[var(--sp-accent)]` |
| nœud courant | `bg-white border-[var(--sp-accent)] ring-4 ring-[var(--sp-accent)]/20` |
| nœud à venir | `bg-white border-neutral-300` |
| piste | `bg-neutral-200` |
| remplissage | `bg-[var(--sp-accent)]` |
| label fait / courant | `text-neutral-900` |
| label à venir | `text-neutral-400` |
| `tone: 'warning'` | `border-amber-500 text-amber-600` |
| `tone: 'danger'` | `border-red-500 text-red-600` |

`tone` n'affecte **que le nœud et son label**, jamais les connecteurs.

Toutes ces valeurs sont indicatives : si le projet a déjà des couleurs de thème (`primary`, `muted`…), les utiliser à la place plutôt que `neutral-*` en dur.

## Animation

- Remplissage : `transition-[width] duration-[400ms] ease-out` (et `transition-[height]` en vertical)
- Nœuds : `transition-colors duration-200`
- Accessibilité : `motion-reduce:transition-none` sur les deux

## Cas limites à gérer explicitement

| Cas | Comportement attendu |
|---|---|
| `steps` vide | ne rien rendre (`return null`) |
| `steps.length === 1` | rendre le nœud seul, aucun connecteur, pas de division par zéro |
| `value` hors bornes | borné silencieusement |
| `value` = `NaN` / `undefined` | traité comme `0` |
| `label` long | retour à la ligne, pas de troncature ni de chevauchement |
| `sublabel` absent | pas d'espace réservé vide |

## Vérification avant de rendre le travail

1. `npm run build` (typecheck inclus) et `npm run lint` passent
2. Le composant ne contient aucun import de `features/` ni de `pocketbase-types`
3. **Aucun nom de classe Tailwind construit dynamiquement** — rechercher toute interpolation dans un `className` et la remplacer par une table de correspondance
4. Vérifier le rendu après `npm run build`, pas seulement en `dev` : une classe non compilée peut passer inaperçue autrement
5. Rendu correct avec `value={0}`, `value={2}`, `value={2.5}`, `value={steps.length - 1}`
6. Rendu correct avec `steps.length === 1`
7. En `responsive`, la bascule se fait au redimensionnement sans saut au chargement
8. Navigation clavier et lecture d'écran : l'ordre et le statut des étapes sont annoncés

## Hors périmètre

Ne pas implémenter dans cette tâche :
- `features/wei/lib/milestones.ts`
- `features/wei/components/WeiTimeline.tsx`
- la validation de cohérence des dates
- les pages du panel admin
