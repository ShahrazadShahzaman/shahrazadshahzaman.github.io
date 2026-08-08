function Footer() {
  return (
    <footer className="border-t border-slate-800 bg-slate-950 py-8">
      <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4">

        <h2 className="text-white font-semibold">
          Shahrazad<span className="text-cyan-400">.</span>
        </h2>

        <p className="text-slate-500 text-sm">
          © {new Date().getFullYear()} Shahrazad. All Rights Reserved.
        </p>

      </div>
    </footer>
  );
}

export default Footer;