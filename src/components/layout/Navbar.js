import Link from "next/link";
import { useTranslation } from "react-i18next";
import { useState, useRef, useEffect } from "react";
import { FiSearch } from "react-icons/fi";
import axios from "axios";
import { useDispatch, useSelector } from 'react-redux';
import { setLanguage } from '../../redux/languageSlice';

export default function Navbar() {
  const { t, i18n } = useTranslation();
  const [showSearch, setShowSearch] = useState(false);
  const [showServices, setShowServices] = useState(false);
  const [services, setServices] = useState([]);
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const servicesRef = useRef(null);
  const dispatch = useDispatch();
  const lang = useSelector((state) => state.language.lang);

  const changeLang = (lng) => {
    dispatch(setLanguage(lng));
    i18n.changeLanguage(lng);
    localStorage.setItem('lang', lng);
    document.documentElement.dir = lng === 'ar' ? 'rtl' : 'ltr';
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
    <nav className="fixed top-0 left-0 w-full flex items-center h-16 z-10 bg-transparent px-4 md:px-8">
      <div className="flex items-center flex-shrink-0 mr-4 md:mr-8">
        <Link href="/">
          <img
            src="/logo.png"
            alt="Logo"
            className="h-8 w-8 md:h-10 md:w-10 rounded-lg bg-white object-cover shadow"
          />
        </Link>
      </div>
      <div className="flex-1 flex items-center justify-center">
        <div className="hidden md:flex items-center space-x-4 md:space-x-6">
          <Link
            className="text-white hover:text-blue-400 text-sm md:text-base"
            href="/"
          >
            {t("home")}
          </Link>
          <Link
            className="text-white hover:text-blue-400 text-sm md:text-base"
            href="/about"
          >
            {t("about")}
          </Link>
          <div className="relative" ref={servicesRef}>
            <button
              className="text-white hover:text-blue-400 flex items-center gap-1 focus:outline-none text-sm md:text-base"
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
                className="fixed left-0 right-0 top-20 mx-auto bg-[#4B2615] text-white rounded-b-2xl shadow-lg py-6 md:py-10 px-2 md:px-16 w-full max-w-[98vw] z-50 flex flex-wrap gap-4 md:gap-10 border border-[#4B2615] text-sm md:text-base"
                style={{ borderTopLeftRadius: 0, borderTopRightRadius: 0 }}
              >
                {services.map((service) => (
                  <Link
                    key={service.documentId}
                    href={`/services/${service.documentId}`}
                    className="hover:text-blue-400 transition min-w-[140px] md:min-w-[180px]"
                  >
                    {i18n.language === "ar"
                      ? service.title_ar
                      : service.title_en}
                  </Link>
                ))}
              </div>
            )}
          </div>
          <Link
            className="text-white hover:text-blue-400 text-sm md:text-base"
            href="/blogs"
          >
            {t("blog")}
          </Link>
          <Link
            className="text-white hover:text-blue-400 text-sm md:text-base"
            href="/team"
          >
            {t("team")}
          </Link>
          <Link
            className="text-white hover:text-blue-400 text-sm md:text-base"
            href="/contact"
          >
            {t("contact")}
          </Link>
        </div>
        {/* Mobile menu button */}
        <div className="md:hidden flex items-center">
          <button
            className="text-white text-2xl focus:outline-none"
            onClick={() => setShowMobileMenu((s) => !s)}
            aria-label="Open menu"
          >
            <span className="material-icons">menu</span>
          </button>
        </div>
      </div>
      {/* Mobile menu dropdown */}
      {showMobileMenu && (
        <div className="fixed top-16 left-0 w-full bg-[#4B2615] text-white z-50 flex flex-col py-6 px-6 gap-4 md:hidden animate-fade-in">
          <Link
            className="hover:text-blue-400 text-base"
            href="/"
            onClick={() => setShowMobileMenu(false)}
          >
            {t("home")}
          </Link>
          <Link
            className="hover:text-blue-400 text-base"
            href="/about"
            onClick={() => setShowMobileMenu(false)}
          >
            {t("about")}
          </Link>
          <button
            className="flex items-center gap-1 focus:outline-none hover:text-blue-400 text-base"
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
            <div className="flex flex-col gap-2 bg-[#3a1d10] rounded-lg p-3 mt-2">
              {services.map((service) => (
                <Link
                  key={service.documentId}
                  href={`/services/${service.documentId}`}
                  className="hover:text-blue-400 transition"
                  onClick={() => {
                    setShowMobileMenu(false);
                    setShowServices(false);
                  }}
                >
                  {i18n.language === "ar" ? service.title_ar : service.title_en}
                </Link>
              ))}
            </div>
          )}
          <Link
            className="hover:text-blue-400 text-base"
            href="/blogs"
            onClick={() => setShowMobileMenu(false)}
          >
            {t("blog")}
          </Link>
          <Link
            className="hover:text-blue-400 text-base"
            href="/team"
            onClick={() => setShowMobileMenu(false)}
          >
            {t("team")}
          </Link>
          <Link
            className="hover:text-blue-400 text-base"
            href="/contact"
            onClick={() => setShowMobileMenu(false)}
          >
            {t("contact")}
          </Link>
          <div className="flex gap-2 mt-4">
            <button
              className="px-4 py-2 border border-white rounded text-white hover:bg-white hover:text-[#4B2615] transition text-sm"
              onClick={() => setShowMobileMenu(false)}
            >
              {t("BookAppointment" || "Book Appointment")}
            </button>
            <button
              onClick={() => {
                changeLang("en");
                setShowMobileMenu(false);
              }}
              className="text-white text-base"
            >
              EN
            </button>
            <button
              onClick={() => {
                changeLang("ar");
                setShowMobileMenu(false);
              }}
              className="text-white text-base"
            >
              العربية
            </button>
          </div>
        </div>
      )}
      <div className="flex items-center space-x-2 md:space-x-6">
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
              className="ml-2 w-32 md:w-48 px-4 py-2 rounded-full border border-[#e0cfc2] text-[#4B2615] bg-white focus:outline-none focus:ring-2 focus:ring-[#4B2615] shadow transition duration-300 text-sm md:text-base"
              onBlur={() => setShowSearch(false)}
              style={{ minWidth: "120px" }}
            />
          )}
        </div>
        <button className="ml-2 px-2 md:px-4 py-2 border border-white rounded text-white hover:bg-white hover:text-[#4B2615] transition text-xs md:text-sm">
          {t("BookAppointment" || "Book Appointment")}
        </button>
        <button
          onClick={() => changeLang("en")}
          className="text-white text-xs md:text-base"
        >
          EN
        </button>
        <button
          onClick={() => changeLang("ar")}
          className="text-white text-xs md:text-base"
        >
          العربية
        </button>
      </div>
    </nav>
  );
}
