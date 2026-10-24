import { SYMBOL_PATH } from "@/components/ui/logo";

const MIN_MS = 1200;
const MAX_MS = 4000;

const script = `(function(){var d=document.documentElement;var reduce=window.matchMedia&&window.matchMedia("(prefers-reduced-motion: reduce)").matches;var min=reduce?200:${MIN_MS};var t0=Date.now();var finished=false;d.setAttribute("data-loader","active");function finish(){if(finished)return;finished=true;setTimeout(function(){d.setAttribute("data-loader","done");},Math.max(0,min-(Date.now()-t0)));}if(document.readyState==="complete"){finish();}else{window.addEventListener("load",finish);}setTimeout(finish,${MAX_MS});})();`;

const sansStyle = { fontFamily: "var(--font-plex-sans), 'Helvetica Neue', Arial, sans-serif" };
const monoStyle = { fontFamily: "var(--font-plex-mono), 'Courier New', monospace" };

export function SiteLoader() {
  return (
    <>
      <div id="site-loader" className="site-loader" aria-hidden="true">
        <div className="site-loader__inner">
          <svg viewBox="0 0 360 64" className="site-loader__mark" focusable="false">
            <g transform="translate(0,4)">
              <path d={SYMBOL_PATH} pathLength={1} className="site-loader__symbol" />
            </g>
            <line x1="168" x2="168" y1="8" y2="56" className="site-loader__divider" />
            <text x="200" y="38" fontSize="48" fontWeight="600" letterSpacing="-0.5" style={sansStyle} className="site-loader__name">
              Infinity
            </text>
            <text x="201.75" y="58" fontSize="9" letterSpacing="2.575" style={monoStyle} className="site-loader__sub">
              ENGENHARIA E PERÍCIAS
            </text>
          </svg>
          <div className="site-loader__track">
            <span className="site-loader__bar" />
          </div>
        </div>
      </div>
      <script dangerouslySetInnerHTML={{ __html: script }} />
    </>
  );
}
