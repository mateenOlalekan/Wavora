import {
  Instagram,
  Linkedin,
  MapPin,
  Phone,
  Mail,
  ArrowRight,
} from "lucide-react";
import { BsTwitterX } from "react-icons/bs";
import logo from "../../assets/logo.svg";

function Footer() {
  const currentYear = new Date().getFullYear();

  const sections = [
    {
      title: "Products",
      items: ["Platform Overview", "Features & Tools", "Pricing"],
    },
    {
      title: "Company",
      items: ["About Us", "Mission & Vision", "Careers", "Blog & Insights"],
    },
  ];

  const socials = [
    { Icon: Instagram, bg: "bg-pink-500/10 hover:bg-pink-500/20", color: "text-pink-600" },
    { Icon: BsTwitterX, bg: "bg-gray-500/10 hover:bg-gray-500/20", color: "text-black" },
    { Icon: Linkedin, bg: "bg-blue-500/10 hover:bg-blue-500/20", color: "text-blue-600" },
  ];

  const contacts = [
    { Icon: Phone, text: "090 999 8877" },
    { Icon: Mail, text: "support@wavora.com" },
  ];

  return (
    <footer className="bg-[#ECFDF3] text-gray-800 border-t border-green-200 pt-10 pb-10 relative">

      {/* Decorative Shapes */}
      <div className="absolute inset-0 opacity-[0.07] pointer-events-none">
        {[
          "top-10 left-10 w-20 h-20 border-2 border-green-600",
          "bottom-20 right-20 w-16 h-16 border-2 border-green-400",
          "top-1/2 left-1/4 w-12 h-12 border border-green-500",
        ].map((c, i) => (
          <div key={i} className={`absolute rounded-full ${c}`} />
        ))}
      </div>

      <div className="relative max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          
          {/* Brand */}
          <div className="space-y-6 col-span-2 md:col-span-1">
            <img src={logo} alt="Logo" className="w-40" />

            <p className="text-gray-700 text-sm leading-relaxed max-w-xs">
              Wavora helps teams build seamless and scalable digital solutions that power modern businesses.
            </p>

            <div className="flex items-center gap-2 group cursor-pointer">
              <MapPin className="w-5 h-5 text-green-700 group-hover:scale-110 transition" />
              <span className="text-gray-700 text-sm group-hover:text-green-700 transition">View on Map</span>
              <ArrowRight className="w-4 h-4 text-green-700 group-hover:translate-x-1 transition" />
            </div>
          </div>

          {/* Dynamic Sections (Products + Company) */}
          {sections.map((section, i) => (
            <div key={i} className="space-y-6">
              <h2 className="font-bold text-lg text-green-700">{section.title}</h2>
              <div className="space-y-3">
                {section.items.map((item, idx) => (
                  <p
                    key={idx}
                    className="cursor-pointer flex items-center gap-2 text-gray-700 hover:text-green-700 transition group"
                  >
                    <span className="w-2 h-2 bg-green-400 rounded-full group-hover:bg-green-600 transition"></span>
                    {item}
                  </p>
                ))}
              </div>
            </div>
          ))}

          {/* Contact + Social */}
          <div className="space-y-6">
            <h2 className="font-bold text-lg text-green-700">Get in Touch</h2>

            <div className="space-y-4">
              {contacts.map(({ Icon, text }, i) => (
                <div key={i} className="flex items-center gap-3 group">
                  <div className="p-2 bg-green-500/10 rounded-lg group-hover:bg-green-500/20 transition">
                    <Icon className="w-4 h-4 text-green-700" />
                  </div>
                  <span className="text-gray-700 group-hover:text-green-700 transition">{text}</span>
                </div>
              ))}
            </div>

            <div className="space-y-3">
              <h3 className="font-semibold text-gray-700 text-sm">FOLLOW US</h3>
              <div className="flex space-x-3">
                {socials.map(({ Icon, bg, color }, i) => (
                  <div
                    key={i}
                    className={`p-3 rounded-xl ${bg} cursor-pointer transition hover:scale-105`}
                  >
                    <Icon className={`w-5 h-5 ${color}`} />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-green-300 pt-8 mt-6">
          <div className="flex flex-col md:flex-row items-center justify-between text-sm gap-4">
            <p className="text-gray-600">
              © {currentYear} Wavora — Empowering Digital Innovation.
            </p>

            <div className="flex space-x-6 text-gray-600">
              {["Privacy Policy", "Terms of Service", "Cookies"].map((item, i) => (
                <span key={i} className="cursor-pointer hover:text-green-700 transition">
                  {item}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
