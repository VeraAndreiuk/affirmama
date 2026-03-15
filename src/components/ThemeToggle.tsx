import React from "react";

interface Props {
  theme: "light" | "dark";
  toggleTheme: () => void;
}

const ThemeToggle: React.FC<Props> = ({ theme, toggleTheme }) => {
  return (
    <button
      type="button"
      className="ghost-button theme-toggle"
      onClick={toggleTheme}
      aria-label={
        theme === "dark"
          ? "Переключить на светлую тему"
          : "Переключить на тёмную тему"
      }
    >
      {theme === "dark" ? "Светлая тема" : "Тёмная тема"}
    </button>
  );
};

export default ThemeToggle;

