export const WINDOW_TEMP_CONTENT = `
<style>
    body {
        background-color: rgb(249 250 251);
    }
    
    div {
        position: fixed;
        inset: 0px;
        z-index: 50;
        display: flex;
        justify-content: center;
        flex-grow: 1;
        align-items: center;
    }

    svg {
        fill: #0369a1;
        width: 2rem;
        height: 2rem;
        flex-shrink: 0;
        animation: spin 2s infinite linear;
    }

    @media (min-width: 350px) {
        svg {
            width: 2.25rem;
            height: 2.25rem;
        }
    }

    @media (min-width: 640px) {
        svg {
            height: 2.5rem;
            width: 2.5rem;
        }
    }

    @media (min-width: 768px) {
        svg {
            width: 2.75rem;
            height: 2.75rem;
        }
    }

    @media (min-width: 1024px) {
        svg {
            width: 3rem;
            height: 3rem;
        }
    }

    @keyframes spin {
        from {transform: rotate(0deg);}
        to {transform: rotate(360deg);}   
    }
</style>

<div>
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 60.14 69.34">
        <path d="M60.14 17.34 30.07 0 0 17.34v34.67l30.07 17.33 30.07-17.33z" />
    </svg>
</div>`;

//note: you have to add to this file all tailwind classes that can have dynamic names
/**
 * const backgroundColorVariants =
  "bg-GF bg-MTF bg-FIT bg-UF bg-FEF bg-ISF bg-RTF bg-ASP bg-UND bg-gray-300 bg-red-300 bg-emerald-300 bg-sky-300 bg-amber-300 bg-violet-300 bg-gray-500 bg-red-500 bg-emerald-500 bg-sky-500 bg-amber-500 bg-violet-500 bg-gray-700 bg-red-700 bg-emerald-700 bg-sky-700 bg-amber-700 bg-violet-700 bg-gray-900 bg-red-900 bg-emerald-900 bg-sky-900 bg-amber-900 bg-violet-900 " +
  "!bg-GF !bg-MTF !bg-FIT !bg-UF !bg-FEF !bg-ISF !bg-RTF !bg-ASP !bg-UND !bg-gray-300 !bg-red-300 !bg-emerald-300 !bg-sky-300 !bg-amber-300 !bg-violet-300 !bg-gray-500 !bg-red-500 !bg-emerald-500 !bg-sky-500 !bg-amber-500 !bg-violet-500 !bg-gray-700 !bg-red-700 !bg-emerald-700 !bg-sky-700 !bg-amber-700 !bg-violet-700 !bg-gray-900 !bg-red-900 !bg-emerald-900 !bg-sky-900 !bg-amber-900 !bg-violet-900 " +
  "md:bg-GF md:bg-MTF md:bg-FIT md:bg-UF md:bg-FEF md:bg-ISF md:bg-RTF md:bg-ASP md:bg-UND md:bg-gray-300 md:bg-red-300 md:bg-emerald-300 md:bg-sky-300 md:bg-amber-300 md:bg-violet-300 md:bg-gray-500 md:bg-red-500 md:bg-emerald-500 md:bg-sky-500 md:bg-amber-500 md:bg-violet-500 md:bg-gray-700 md:bg-red-700 md:bg-emerald-700 md:bg-sky-700 md:bg-amber-700 md:bg-violet-700 md:bg-gray-900 md:bg-red-900 md:bg-emerald-900 md:bg-sky-900 md:bg-amber-900 md:bg-violet-900 " +
  "hover:bg-GF hover:bg-MTF hover:bg-FIT hover:bg-UF hover:bg-FEF hover:bg-ISF hover:bg-RTF hover:bg-ASP hover:bg-UND hover:bg-gray-300 hover:bg-red-300 hover:bg-emerald-300 hover:bg-sky-300 hover:bg-amber-300 hover:bg-violet-300 hover:bg-gray-500 hover:bg-red-500 hover:bg-emerald-500 hover:bg-sky-500 hover:bg-amber-500 hover:bg-violet-500 hover:bg-gray-700 hover:bg-red-700 hover:bg-emerald-700 hover:bg-sky-700 hover:bg-amber-700 hover:bg-violet-700 hover:bg-gray-900 hover:bg-red-900 hover:bg-emerald-900 hover:bg-sky-900 hover:bg-amber-900 hover:bg-violet-900 " +
  "checked:bg-GF checked:bg-MTF checked:bg-FIT checked:bg-UF checked:bg-FEF checked:bg-ISF checked:bg-RTF checked:bg-ASP checked:bg-UND checked:bg-gray-300 checked:bg-red-300 checked:bg-emerald-300 checked:bg-sky-300 checked:bg-amber-300 checked:bg-violet-300 checked:bg-gray-500 checked:bg-red-500 checked:bg-emerald-500 checked:bg-sky-500 checked:bg-amber-500 checked:bg-violet-500 checked:bg-gray-700 checked:bg-red-700 checked:bg-emerald-700 checked:bg-sky-700 checked:bg-amber-700 checked:bg-violet-700 checked:bg-gray-900 checked:bg-red-900 checked:bg-emerald-900 checked:bg-sky-900 checked:bg-amber-900 checked:bg-violet-900 " +
  "group-hover:bg-GF group-hover:bg-MTF group-hover:bg-FIT group-hover:bg-UF group-hover:bg-FEF group-hover:bg-ISF group-hover:bg-RTF group-hover:bg-ASP group-hover:bg-UND group-hover:bg-gray-300 group-hover:bg-red-300 group-hover:bg-emerald-300 group-hover:bg-sky-300 group-hover:bg-amber-300 group-hover:bg-violet-300 group-hover:bg-gray-500 group-hover:bg-red-500 group-hover:bg-emerald-500 group-hover:bg-sky-500 group-hover:bg-amber-500 group-hover:bg-violet-500 group-hover:bg-gray-700 group-hover:bg-red-700 group-hover:bg-emerald-700 group-hover:bg-sky-700 group-hover:bg-amber-700 group-hover:bg-violet-700 group-hover:bg-gray-900 group-hover:bg-red-900 group-hover:bg-emerald-900 group-hover:bg-sky-900 group-hover:bg-amber-900 group-hover:bg-violet-900 ";

 * const textColorVariants =
  "text-GF text-MTF text-FIT text-UF text-FEF text-ISF text-RTF text-ASP text-UND text-gray-300 text-red-300 text-emerald-300 text-sky-300 text-amber-300 text-violet-300 text-gray-500 text-red-500 text-emerald-500 text-sky-500 text-amber-500 text-violet-500 text-gray-700 text-red-700 text-emerald-700 text-sky-700 text-amber-700 text-violet-700 text-gray-900 text-red-900 text-emerald-900 text-sky-900 text-amber-900 text-violet-900 " +
  "hover:text-GF hover:text-MTF hover:text-FIT hover:text-UF hover:text-FEF hover:text-ISF hover:text-RTF hover:text-ASP hover:text-UND hover:text-gray-300 hover:text-red-300 hover:text-emerald-300 hover:text-sky-300 hover:text-amber-300 hover:text-violet-300 hover:text-gray-500 hover:text-red-500 hover:text-emerald-500 hover:text-sky-500 hover:text-amber-500 hover:text-violet-500 hover:text-gray-700 hover:text-red-700 hover:text-emerald-700 hover:text-sky-700 hover:text-amber-700 hover:text-violet-700 hover:text-gray-900 hover:text-red-900 hover:text-emerald-900 hover:text-sky-900 hover:text-amber-900 hover:text-violet-900 " +
  "group-hover:text-GF group-hover:text-MTF group-hover:text-FIT group-hover:text-UF group-hover:text-FEF group-hover:text-ISF group-hover:text-RTF group-hover:text-ASP group-hover:text-UND group-hover:text-gray-300 group-hover:text-red-300 group-hover:text-emerald-300 group-hover:text-sky-300 group-hover:text-amber-300 group-hover:text-violet-300 group-hover:text-gray-500 group-hover:text-red-500 group-hover:text-emerald-500 group-hover:text-sky-500 group-hover:text-amber-500 group-hover:text-violet-500 group-hover:text-gray-700 group-hover:text-red-700 group-hover:text-emerald-700 group-hover:text-sky-700 group-hover:text-amber-700 group-hover:text-violet-700 group-hover:text-gray-900 group-hover:text-red-900 group-hover:text-emerald-900 group-hover:text-sky-900 group-hover:text-amber-900 group-hover:text-violet-900 ";

 * const fillColorVariants =
  "fill-GF fill-MTF fill-FIT fill-UF fill-FEF fill-ISF fill-RTF fill-ASP fill-UND fill-gray-300 fill-red-300 fill-emerald-300 fill-sky-300 fill-amber-300 fill-violet-300 fill-gray-500 fill-red-500 fill-emerald-500 fill-sky-500 fill-amber-500 fill-violet-500 fill-gray-700 fill-red-700 fill-emerald-700 fill-sky-700 fill-amber-700 fill-violet-700 fill-gray-900 fill-red-900 fill-emerald-900 fill-sky-900 fill-amber-900 fill-violet-900 " +
  "group-hover:fill-GF group-hover:fill-MTF group-hover:fill-FIT group-hover:fill-UF group-hover:fill-FEF group-hover:fill-ISF group-hover:fill-RTF group-hover:fill-ASP group-hover:fill-UND group-hover:fill-gray-300 group-hover:fill-red-300 group-hover:fill-emerald-300 group-hover:fill-sky-300 group-hover:fill-amber-300 group-hover:fill-violet-300 group-hover:fill-gray-500 group-hover:fill-red-500 group-hover:fill-emerald-500 group-hover:fill-sky-500 group-hover:fill-amber-500 group-hover:fill-violet-500 group-hover:fill-gray-700 group-hover:fill-red-700 group-hover:fill-emerald-700 group-hover:fill-sky-700 group-hover:fill-amber-700 group-hover:fill-violet-700 group-hover:fill-gray-900 group-hover:fill-red-900 group-hover:fill-emerald-900 group-hover:fill-sky-900 group-hover:fill-amber-900 group-hover:fill-violet-900 ";

 * const borderColorVariants =
  "border-GF border-MTF border-FIT border-UF border-FEF border-ISF border-RTF border-ASP border-UND border-gray-300 border-red-300 border-emerald-300 border-sky-300 border-amber-300 border-violet-300 border-gray-500 border-red-500 border-emerald-500 border-sky-500 border-amber-500 border-violet-500 border-gray-700 border-red-700 border-emerald-700 border-sky-700 border-amber-700 border-violet-700 border-gray-900 border-red-900 border-emerald-900 border-sky-900 border-amber-900 border-violet-900 " +
  "hover:border-GF hover:border-MTF hover:border-FIT hover:border-UF hover:border-FEF hover:border-ISF hover:border-RTF hover:border-ASP hover:border-UND hover:border-gray-300 hover:border-red-300 hover:border-emerald-300 hover:border-sky-300 hover:border-amber-300 hover:border-violet-300 hover:border-gray-500 hover:border-red-500 hover:border-emerald-500 hover:border-sky-500 hover:border-amber-500 hover:border-violet-500 hover:border-gray-700 hover:border-red-700 hover:border-emerald-700 hover:border-sky-700 hover:border-amber-700 hover:border-violet-700 hover:border-gray-900 hover:border-red-900 hover:border-emerald-900 hover:border-sky-900 hover:border-amber-900 hover:border-violet-9000 " +
  "checked:border-GF checked:border-MTF checked:border-FIT checked:border-UF checked:border-FEF checked:border-ISF checked:border-RTF checked:border-ASP checked:border-UND checked:border-gray-300 checked:border-red-300 checked:border-emerald-300 checked:border-sky-300 checked:border-amber-300 checked:border-violet-300 checked:border-gray-500 checked:border-red-500 checked:border-emerald-500 checked:border-sky-500 checked:border-amber-500 checked:border-violet-500 checked:border-gray-700 checked:border-red-700 checked:border-emerald-700 checked:border-sky-700 checked:border-amber-700 checked:border-violet-700 checked:border-gray-900 checked:border-red-900 checked:border-emerald-900 checked:border-sky-900 checked:border-amber-900 checked:border-violet-900 " +
  "focus:border-GF focus:border-MTF focus:border-FIT focus:border-UF focus:border-FEF focus:border-ISF focus:border-RTF focus:border-ASP focus:border-UND focus:border-gray-300 focus:border-red-300 focus:border-emerald-300 focus:border-sky-300 focus:border-amber-300 focus:border-violet-300 focus:border-gray-500 focus:border-red-500 focus:border-emerald-500 focus:border-sky-500 focus:border-amber-500 focus:border-violet-500 focus:border-gray-700 focus:border-red-700 focus:border-emerald-700 focus:border-sky-700 focus:border-amber-700 focus:border-violet-700 focus:border-gray-900 focus:border-red-900 focus:border-emerald-900 focus:border-sky-900 focus:border-amber-900 focus:border-violet-900 ";

 * const outlineColorVariants =
  "outline-GF outline-MTF outline-FIT outline-UF outline-FEF outline-ISF outline-RTF outline-ASP outline-UND outline-gray-300 outline-red-300 outline-emerald-300 outline-sky-300 outline-amber-300 outline-violet-300 outline-gray-500 outline-red-500 outline-emerald-500 outline-sky-500 outline-amber-500 outline-violet-500 outline-gray-700 outline-red-700 outline-emerald-700 outline-sky-700 outline-amber-700 outline-violet-700 outline-gray-900 outline-red-900 outline-emerald-900 outline-sky-900 outline-amber-900 outline-violet-900 " +
  "hover:outline-GF hover:outline-MTF hover:outline-FIT hover:outline-UF hover:outline-FEF hover:outline-ISF hover:outline-RTF hover:outline-ASP hover:outline-UND hover:outline-gray-300 hover:outline-red-300 hover:outline-emerald-300 hover:outline-sky-300 hover:outline-amber-300 hover:outline-violet-300 hover:outline-gray-500 hover:outline-red-500 hover:outline-emerald-500 hover:outline-sky-500 hover:outline-amber-500 hover:outline-violet-500 hover:outline-gray-700 hover:outline-red-700 hover:outline-emerald-700 hover:outline-sky-700 hover:outline-amber-700 hover:outline-violet-700 hover:outline-gray-900 hover:outline-red-900 hover:outline-emerald-900 hover:outline-sky-900 hover:outline-amber-900 hover:outline-violet-9000 " +
  "checked:outline-GF checked:outline-MTF checked:outline-FIT checked:outline-UF checked:outline-FEF checked:outline-ISF checked:outline-RTF checked:outline-ASP checked:outline-UND checked:outline-gray-300 checked:outline-red-300 checked:outline-emerald-300 checked:outline-sky-300 checked:outline-amber-300 checked:outline-violet-300 checked:outline-gray-500 checked:outline-red-500 checked:outline-emerald-500 checked:outline-sky-500 checked:outline-amber-500 checked:outline-violet-500 checked:outline-gray-700 checked:outline-red-700 checked:outline-emerald-700 checked:outline-sky-700 checked:outline-amber-700 checked:outline-violet-700 checked:outline-gray-900 checked:outline-red-900 checked:outline-emerald-900 checked:outline-sky-900 checked:outline-amber-900 checked:outline-violet-900 " +
  "focus:outline-GF focus:outline-MTF focus:outline-FIT focus:outline-UF focus:outline-FEF focus:outline-ISF focus:outline-RTF focus:outline-ASP focus:outline-UND focus:outline-gray-300 focus:outline-red-300 focus:outline-emerald-300 focus:outline-sky-300 focus:outline-amber-300 focus:outline-violet-300 focus:outline-gray-500 focus:outline-red-500 focus:outline-emerald-500 focus:outline-sky-500 focus:outline-amber-500 focus:outline-violet-500 focus:outline-gray-700 focus:outline-red-700 focus:outline-emerald-700 focus:outline-sky-700 focus:outline-amber-700 focus:outline-violet-700 focus:outline-gray-900 focus:outline-red-900 focus:outline-emerald-900 focus:outline-sky-900 focus:outline-amber-900 focus:outline-violet-900 ";

 * const ringColorVariants =
  "ring-GF ring-MTF ring-FIT ring-UF ring-FEF ring-ISF ring-RTF ring-ASP ring-UND ring-gray-300 ring-red-300 ring-emerald-300 ring-sky-300 ring-amber-300 ring-violet-300 ring-gray-500 ring-red-500 ring-emerald-500 ring-sky-500 ring-amber-500 ring-violet-500 ring-gray-700 ring-red-700 ring-emerald-700 ring-sky-700 ring-amber-700 ring-violet-700 ring-gray-900 ring-red-900 ring-emerald-900 ring-sky-900 ring-amber-900 ring-violet-900 " +
  "hover:ring-GF hover:ring-MTF hover:ring-FIT hover:ring-UF hover:ring-FEF hover:ring-ISF hover:ring-RTF hover:ring-ASP hover:ring-UND hover:ring-gray-300 hover:ring-red-300 hover:ring-emerald-300 hover:ring-sky-300 hover:ring-amber-300 hover:ring-violet-300 hover:ring-gray-500 hover:ring-red-500 hover:ring-emerald-500 hover:ring-sky-500 hover:ring-amber-500 hover:ring-violet-500 hover:ring-gray-700 hover:ring-red-700 hover:ring-emerald-700 hover:ring-sky-700 hover:ring-amber-700 hover:ring-violet-700 hover:ring-gray-900 hover:ring-red-900 hover:ring-emerald-900 hover:ring-sky-900 hover:ring-amber-900 hover:ring-violet-9000 " +
  "checked:ring-GF checked:ring-MTF checked:ring-FIT checked:ring-UF checked:ring-FEF checked:ring-ISF checked:ring-RTF checked:ring-ASP checked:ring-UND checked:ring-gray-300 checked:ring-red-300 checked:ring-emerald-300 checked:ring-sky-300 checked:ring-amber-300 checked:ring-violet-300 checked:ring-gray-500 checked:ring-red-500 checked:ring-emerald-500 checked:ring-sky-500 checked:ring-amber-500 checked:ring-violet-500 checked:ring-gray-700 checked:ring-red-700 checked:ring-emerald-700 checked:ring-sky-700 checked:ring-amber-700 checked:ring-violet-700 checked:ring-gray-900 checked:ring-red-900 checked:ring-emerald-900 checked:ring-sky-900 checked:ring-amber-900 checked:ring-violet-900 " +
  "focus:ring-GF focus:ring-MTF focus:ring-FIT focus:ring-UF focus:ring-FEF focus:ring-ISF focus:ring-RTF focus:ring-ASP focus:ring-UND focus:ring-gray-300 focus:ring-red-300 focus:ring-emerald-300 focus:ring-sky-300 focus:ring-amber-300 focus:ring-violet-300 focus:ring-gray-500 focus:ring-red-500 focus:ring-emerald-500 focus:ring-sky-500 focus:ring-amber-500 focus:ring-violet-500 focus:ring-gray-700 focus:ring-red-700 focus:ring-emerald-700 focus:ring-sky-700 focus:ring-amber-700 focus:ring-violet-700 focus:ring-gray-900 focus:ring-red-900 focus:ring-emerald-900 focus:ring-sky-900 focus:ring-amber-900 focus:ring-violet-900 ";

 * const strokeColorVariants =
  "stroke-GF stroke-MTF stroke-FIT stroke-UF stroke-FEF stroke-ISF stroke-RTF stroke-ASP stroke-UND stroke-gray-300 stroke-red-300 stroke-emerald-300 stroke-sky-300 stroke-amber-300 stroke-violet-300 stroke-gray-500 stroke-red-500 stroke-emerald-500 stroke-sky-500 stroke-amber-500 stroke-violet-500 stroke-gray-700 stroke-red-700 stroke-emerald-700 stroke-sky-700 stroke-amber-700 stroke-violet-700 stroke-gray-900 stroke-red-900 stroke-emerald-900 stroke-sky-900 stroke-amber-900 stroke-violet-900 " +
  "hover:stroke-GF hover:stroke-MTF hover:stroke-FIT hover:stroke-UF hover:stroke-FEF hover:stroke-ISF hover:stroke-RTF hover:stroke-ASP hover:stroke-UND hover:stroke-gray-300 hover:stroke-red-300 hover:stroke-emerald-300 hover:stroke-sky-300 hover:stroke-amber-300 hover:stroke-violet-300 hover:stroke-gray-500 hover:stroke-red-500 hover:stroke-emerald-500 hover:stroke-sky-500 hover:stroke-amber-500 hover:stroke-violet-500 hover:stroke-gray-700 hover:stroke-red-700 hover:stroke-emerald-700 hover:stroke-sky-700 hover:stroke-amber-700 hover:stroke-violet-700 hover:stroke-gray-900 hover:stroke-red-900 hover:stroke-emerald-900 hover:stroke-sky-900 hover:stroke-amber-900 hover:stroke-violet-900 " +
  "group-hover:stroke-GF group-hover:stroke-MTF group-hover:stroke-FIT group-hover:stroke-UF group-hover:stroke-FEF group-hover:stroke-ISF group-hover:stroke-RTF group-hover:stroke-ASP group-hover:stroke-UND group-hover:stroke-gray-300 group-hover:stroke-red-300 group-hover:stroke-emerald-300 group-hover:stroke-sky-300 group-hover:stroke-amber-300 group-hover:stroke-violet-300 group-hover:stroke-gray-500 group-hover:stroke-red-500 group-hover:stroke-emerald-500 group-hover:stroke-sky-500 group-hover:stroke-amber-500 group-hover:stroke-violet-500 group-hover:stroke-gray-700 group-hover:stroke-red-700 group-hover:stroke-emerald-700 group-hover:stroke-sky-700 group-hover:stroke-amber-700 group-hover:stroke-violet-700 group-hover:stroke-gray-900 group-hover:stroke-red-900 group-hover:stroke-emerald-900 group-hover:stroke-sky-900 group-hover:stroke-amber-900 group-hover:stroke-violet-900 ";

 * const divideColorVariants =
  "hover:divide-GF hover:divide-MTF hover:divide-FIT hover:divide-UF hover:divide-FEF hover:divide-ISF hover:divide-RTF hover:divide-ASP hover:divide-UND hover:divide-gray-300 hover:divide-red-300 hover:divide-emerald-300 hover:divide-sky-300 hover:divide-amber-300 hover:divide-violet-300 hover:divide-gray-500 hover:divide-red-500 hover:divide-emerald-500 hover:divide-sky-500 hover:divide-amber-500 hover:divide-violet-500 hover:divide-gray-700 hover:divide-red-700 hover:divide-emerald-700 hover:divide-sky-700 hover:divide-amber-700 hover:divide-violet-700 hover:divide-gray-900 hover:divide-red-900 hover:divide-emerald-900 hover:divide-sky-900 hover:divide-amber-900 hover:divide-violet-900 ";

 * const decorationColorVariants =
  "decoration-GF decoration-MTF decoration-FIT decoration-UF decoration-FEF decoration-ISF decoration-RTF decoration-ASP decoration-UND decoration-gray-300 decoration-red-300 decoration-emerald-300 decoration-sky-300 decoration-amber-300 decoration-violet-300 decoration-gray-500 decoration-red-500 decoration-emerald-500 decoration-sky-500 decoration-amber-500 decoration-violet-500 decoration-gray-700 decoration-red-700 decoration-emerald-700 decoration-sky-700 decoration-amber-700 decoration-violet-700 decoration-gray-900 decoration-red-900 decoration-emerald-900 decoration-sky-900 decoration-amber-900 decoration-violet-900 ";
 */
