const Header = () => {
  return (
    <header className="flex flex-col justify-center items-center text-center mb-10 mt-4">
        
        <h1 
          className="text-6xl md:text-7xl font-normal mb-2 text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 to-purple-500 dark:from-indigo-400 dark:to-orange-400 drop-shadow-sm"
          style={{ fontFamily: "'Pacifico', cursive", paddingBottom: "10px" }}
        >
          Codesplain
        </h1>
        
        <p className="text-lg md:text-xl opacity-80 font-medium">
          Explain code in simple terms ✨
        </p>
        
    </header>
  )
}

export default Header
