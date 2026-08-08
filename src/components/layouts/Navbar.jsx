const navLinks = [
  { name: "Home", href: "#home" },
  { name: "About", href: "#about" },
   { name: "Education", href: "#education" },
  { name: "Skills", href: "#skills" },
  { name: "Experience", href: "#experience" },
  { name: "Projects", href: "#projects" },
  { name: "Contact", href: "#contact" },
];

function Navbar() {
  return (
    <nav className="fixed top-0 left-0 z-50 w-full border-b border-slate-800 bg-slate-950/80 backdrop-blur-md">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6">
        
        {/* Logo */}
        <a
          href="#home"
          className="text-2xl font-bold text-white transition hover:text-cyan-400"
        >
          Shahrazad<span className="text-cyan-400">.</span>
        </a>

        {/* Navigation */}
        <ul className="hidden items-center gap-8 md:flex">
          {navLinks.map((link) => (
            <li key={link.name}>
              <a
                href={link.href}
                className="relative text-slate-300 transition duration-300 hover:text-cyan-400 after:absolute after:left-0 after:-bottom-1 after:h-[2px] after:w-0 after:bg-cyan-400 after:transition-all after:duration-300 hover:after:w-full"
              >
                {link.name}
              </a>
            </li>
          ))}
        </ul>

        {/* Mobile Menu Button (Coming Soon) */}
        <button className="text-3xl text-white md:hidden">
          ☰
        </button>
      </div>
    </nav>
  );
}

export default Navbar;