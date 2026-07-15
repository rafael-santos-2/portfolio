import { useEffect, useState } from "react";
import { Sun, Moon } from "lucide-react";

export default function ThemeToggle() {
  const [light, setLight] = useState(false);

  useEffect(() => {
    if (localStorage.getItem("theme") === "light") {
      setLight(true);
      document.documentElement.classList.add("light");
    }
  }, []);

  const toggle = () => {
    const next = !light;
    setLight(next);
    document.documentElement.classList.toggle("light", next);
    localStorage.setItem("theme", next ? "light" : "dark");
  };

  return (
    <button
      onClick={toggle}
      aria-label="Wissel thema"
      className="flex items-center gap-1.5 font-mono text-[11px] uppercase tracking-wider text-muted-foreground hover:text-primary transition-colors"
    >
      {light ? <Sun className="w-3 h-3" /> : <Moon className="w-3 h-3" />}
      <span className="hidden md:inline">{light ? "LIGHT" : "DARK"}</span>
    </button>
  );
}
