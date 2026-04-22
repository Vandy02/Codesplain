import { useState } from "react";
import Header from "./Header"
import CodeExplainForms from "./forms/CodeExplainForms"

const CodeEntry = () => {
  const [isDark, setIsDark] = useState(true);
  const toggleTheme = () => setIsDark(!isDark);
  return (
    <div 
      className={`min-h-screen transition-colors duration-500 ease-in-out relative flex flex-col justify-between items-center p-6
      ${isDark ? "bg-gray-900 text-gray-100" : "bg-orange-50 text-gray-900"}`}
    >
    <button 
        onClick={toggleTheme}
        className={`absolute top-6 right-6 p-3 rounded-full text-2xl shadow-lg transition-transform hover:scale-110 
        ${isDark ? "bg-gray-800 shadow-gray-900/50" : "bg-white shadow-orange-200/50"}`}
        title="Toggle Theme"
      >
        {isDark ? "☀️" : "🌙"}
      </button>
      
    <div className="min-h-screen bg-gray-50 text-gray-900 flex flex-col justify-center items-center">
        <Header />
        <CodeExplainForms /></div>
      <footer className="mt-12 mb-4 text-sm font-medium opacity-60 hover:opacity-100 transition-opacity duration-300">
        Built with 🤍 by{" "}
        <a 
          href="https://vandanakerketta.com" 
          target="_blank" 
          rel="noopener noreferrer"
          className={`underline decoration-wavy underline-offset-4 transition-colors
          ${isDark ? "decoration-indigo-400 hover:text-indigo-400" : "decoration-orange-400 hover:text-orange-500"}`}
        >
          Vandana
        </a>
      </footer>

    </div>
  )
}

export default CodeEntry
