/** Applies the saved (or system) theme before first paint to avoid a flash. */
export function ThemeScript() {
  const code = `(function(){var d=document.documentElement;try{var t=localStorage.getItem("theme");if(!t&&window.matchMedia("(prefers-color-scheme: light)").matches)t="light";d.setAttribute("data-theme",t||"dark")}catch(e){d.setAttribute("data-theme","dark")}})()`;
  return <script dangerouslySetInnerHTML={{ __html: code }} />;
}
