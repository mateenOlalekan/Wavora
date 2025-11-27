import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import logo from "../../assets/logo.svg";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { scroller } from "react-scroll";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scroll, setScroll] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const links = [
    { name: "Home", type: "route", to: "/" },
    { name: "About Us", type: "route", to: "/about" },
    { name: "Features", type: "scroll", to: "features" },
    { name: "Pricing", type: "scroll", to: "pricing" },
    { name: "FAQ", type: "scroll", to: "faq" },
    { name: "Contact", type: "route", to: "/contact" },
  ];

  const handleScroll = (id) => {
    if (location.pathname !== "/") {
      navigate("/");
      setTimeout(() => {
        scroller.scrollTo(id, {
          smooth: true,
          duration: 600,
          offset: -70,
        });
      }, 100);
    } else {
      scroller.scrollTo(id, {
        smooth: true,
        duration: 600,
        offset: -70,
      });
    }
    setIsOpen(false);
  };

  useEffect(() => {
    const handleScrollEvent = () => {
      setScroll(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScrollEvent);

    return () => window.removeEventListener("scroll", handleScrollEvent);
  }, []);

  return (
    <nav
      className={`${
        scroll ? "shadow-lg bg-slate-100" : "bg-white"
      } w-full py-4 flex justify-center items-center fixed top-0 left-0 z-50 md:px-3 px-4 transition-all duration-300`}
    >
      <div className="flex justify-between items-center w-full max-w-7xl">
        {/* Logo */}
        <img src={logo} alt="App Logo" className="h-10 w-auto" />

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-6">
          {links.map((link) =>
            link.type === "scroll" ? (
              <button
                key={link.name}
                onClick={() => handleScroll(link.to)}
                className="cursor-pointer group relative text-green-700 hover:text-green-500 transition-colors duration-300"
              >
                {link.name}
                <span className="absolute left-0 -bottom-1 h-[2px] w-0 bg-green-500 transition-all duration-300 group-hover:w-full"></span>
              </button>
            ) : (
              <Link
                key={link.name}
                to={link.to}
                onClick={() => setIsOpen(false)}
                className="group relative text-green-700 hover:text-green-500 transition-colors duration-300"
              >
                {link.name}
                <span className="absolute left-0 -bottom-1 h-[2px] w-0 bg-green-500 transition-all duration-300 group-hover:w-full"></span>
              </Link>
            )
          )}
        </div>

        {/* Desktop Buttons */}
        <div className="hidden md:flex items-center gap-3">
          <Link
            to="/login"
            className="px-4 py-2 text-black border rounded-sm hover:bg-gray-100 transition"
          >
            Log In
          </Link>
          <Link
            to="/register"
            className="px-4 py-2 bg-black text-white rounded-sm hover:bg-gray-800 transition"
          >
            Sign Up
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-black"
          onClick={() => setIsOpen((prev) => !prev)}
          aria-expanded={isOpen}
          aria-controls="mobile-menu"
        >
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <div
        id="mobile-menu"
        className={`fixed top-0 right-0 h-full w-72 bg-white/95 backdrop-blur-lg shadow-2xl transform transition-all duration-500 ease-in-out z-50 ${
          isOpen ? "translate-x-0 opacity-100" : "translate-x-full opacity-0"
        }`}
      >
        <div className="flex justify-between items-center px-6 py-4 border-b border-gray-200">
          <img src={logo} alt="App Logo" className="h-8 w-auto" />
          <button
            onClick={() => setIsOpen(false)}
            className="text-gray-600 hover:text-black transition"
          >
            <X size={26} />
          </button>
        </div>

        {/* Links */}
        <div className="flex flex-col gap-6 px-6 py-8 text-lg font-medium">
          {links.map((link) =>
            link.type === "scroll" ? (
              <button
                key={link.name}
                onClick={() => handleScroll(link.to)}
                className="text-left cursor-pointer relative group text-gray-800 hover:text-green-600 transition"
              >
                {link.name}
                <span className="absolute left-0 -bottom-1 h-[2px] w-0 bg-green-600 transition-all duration-300 group-hover:w-full"></span>
              </button>
            ) : (
              <Link
                key={link.name}
                to={link.to}
                onClick={() => setIsOpen(false)}
                className="relative group text-gray-800 hover:text-green-600 transition"
              >
                {link.name}
                <span className="absolute left-0 -bottom-1 h-[2px] w-0 bg-green-600 transition-all duration-300 group-hover:w-full"></span>
              </Link>
            )
          )}
        </div>

        {/* Divider */}
        <div className="px-6">
          <hr className="border-gray-300" />
        </div>

        {/* Auth Buttons */}
        <div className="flex flex-col gap-4 px-6 py-6">
          <Link
            to="/login"
            onClick={() => setIsOpen(false)}
            className="w-full px-4 py-3 text-center border border-gray-400 text-gray-700 rounded-xl hover:bg-gray-100 transition"
          >
            Log In
          </Link>
          <Link
            to="/signup"
            onClick={() => setIsOpen(false)}
            className="w-full px-4 py-3 text-center bg-gradient-to-r from-green-600 to-green-400 text-white rounded-xl shadow-lg hover:opacity-90 transition"
          >
            Sign Up
          </Link>
        </div>
      </div>

      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
          onClick={() => setIsOpen(false)}
        ></div>
      )}
    </nav>
  );
}
