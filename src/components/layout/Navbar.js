import Link from "next/link";
import { useTranslation } from "react-i18next";
import { useState, useRef, useEffect } from "react";
import { FiSearch } from "react-icons/fi";
import axios from "axios";

export default function Navbar() {
  const { t, i18n } = useTranslation();
  const [showSearch, setShowSearch] = useState(false);
  const [showServices, setShowServices] = useState(false);
  const [services, setServices] = useState([]);
  const servicesRef = useRef(null);

  const changeLang = (lng) => {
    i18n.changeLanguage(lng);
    document.documentElement.dir = lng === "ar" ? "rtl" : "ltr";
  };

  useEffect(() => {
    if (!showServices) return;
    const fetchServices = async () => {
      try {
        const res = await axios.get("http://localhost:1337/api/services");
        setServices(res.data.data);
      } catch (err) {
        console.error("Failed to fetch services", err);
      }
    };

    fetchServices();
  }, [showServices]);

  useEffect(() => {
    if (!showServices) return;
    function handleClick(e) {
      if (servicesRef.current && !servicesRef.current.contains(e.target)) {
        setShowServices(false);
      }
    }
    document.addEventListener("mousedown", handleClick, true);
    return () => document.removeEventListener("mousedown", handleClick, true);
  }, [showServices]);

  return (
    <nav className="fixed top-0 left-0 w-full flex items-center h-16 z-10 bg-transparent px-8">
      <div className="flex items-center flex-shrink-0 mr-8">
        <Link href="/">
          <img
            src="/profile.png"
            alt="Logo"
            className="h-10 w-10 rounded-full bg-white object-cover shadow"
          />
        </Link>
      </div>
      <div className="flex-1 flex items-center justify-center">
        <div className="flex items-center space-x-6">
          <Link className="text-white hover:text-blue-400" href="/">
            {t("home")}
          </Link>
          <Link className="text-white hover:text-blue-400" href="/about">
            {t("about")}
          </Link>
          <div className="relative" ref={servicesRef}>
            <button
              className="text-white hover:text-blue-400 flex items-center gap-1 focus:outline-none"
              onClick={() => setShowServices((s) => !s)}
              aria-expanded={showServices}
              aria-haspopup="true"
              type="button"
            >
              {t("services")}{" "}
              <span className="text-xs">
                {showServices ? "\u25B4" : "\u25BE"}
              </span>
            </button>
            {showServices && (
              <div
                className="fixed left-0 right-0 top-20 mx-auto bg-[#4B2615] text-white rounded-b-2xl shadow-lg py-10 px-16 w-full max-w-[98vw] z-50 flex flex-wrap gap-10 border border-[#4B2615] text-base"
                style={{ borderTopLeftRadius: 0, borderTopRightRadius: 0 }}
              >
                {services.map((service) => (
                  <Link
                    key={service.documentId}
                    href={`/services/${service.documentId}`}
                    className="hover:text-blue-400 transition"
                  >
                    {i18n.language === "ar"
                      ? service.title_ar
                      : service.title_en}
                  </Link>
                ))}
              </div>
            )}
          </div>
          <Link className="text-white hover:text-blue-400" href="/blog">
            {t("blog")}
          </Link>
          <Link className="text-white hover:text-blue-400" href="/team">
            {t("team")}
          </Link>
          <Link className="text-white hover:text-blue-400" href="/contact">
            {t("contact")}
          </Link>
        </div>
      </div>
      <div className="flex items-center space-x-6">
        <div className="relative flex items-center">
          <button
            className="text-white text-xl focus:outline-none"
            onClick={() => setShowSearch((s) => !s)}
            aria-label="Search"
          >
            <FiSearch />
          </button>
          {showSearch && (
            <input
              type="text"
              autoFocus
              placeholder="Search..."
              className="ml-2 w-48 px-4 py-2 rounded-full border border-[#e0cfc2] text-[#4B2615] bg-white focus:outline-none focus:ring-2 focus:ring-[#4B2615] shadow transition duration-300"
              onBlur={() => setShowSearch(false)}
              style={{ minWidth: "180px" }}
            />
          )}
        </div>
        <button className="ml-2 px-4 py-2 border border-white rounded text-white hover:bg-white hover:text-[#4B2615] transition text-sm">
          {t("BookAppointment" || "Book Appointment")}
        </button>
        <button onClick={() => changeLang("en")} className="text-white">
          EN
        </button>
        <button onClick={() => changeLang("ar")} className="text-white">
          العربية
        </button>
      </div>
    </nav>
  );
}
