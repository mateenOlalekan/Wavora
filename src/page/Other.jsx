import { useTheme } from "../context/ThemeContext";

function Other() {
  const { theme, toggleTheme } = useTheme();

  return (
    <div className={`w-full h-screen transition-all duration-1000 ${theme ? "bg-amber-600" : "bg-green-700"}`}>
      <button
        onClick={toggleTheme}
        className="p-2 rounded bg-gray-800 text-white"
      >
        Current theme: {theme.toString()}
      </button>
    </div>
  );
}

export default Other;
