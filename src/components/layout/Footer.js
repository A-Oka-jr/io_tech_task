import { FaTwitter, FaFacebookF, FaGooglePlusG } from "react-icons/fa";
import Link from "next/link";
import { useTranslation } from "react-i18next";

export default function Footer() {
  const { t } = useTranslation();
  return (
    <footer className="bg-[#4B2615] text-white py-8 px-4 ">
      <div className="max-w-7xl mx-auto flex flex-col items-center">
        <div className="w-full flex flex-col md:flex-row items-center justify-center md:justify-between mb-4">
          <div className="flex items-center gap-6">
            <span className="text-sm">{t("contact" || "Contact")}</span>
            <FaTwitter className="text-white hover:text-[#e0cfc2] cursor-pointer" />
            <FaFacebookF className="text-white hover:text-[#e0cfc2] cursor-pointer" />
            <FaGooglePlusG className="text-white hover:text-[#e0cfc2] cursor-pointer" />
          </div>
          <form className="relative flex items-center mb-4 md:mb-0">
            <input
              type="email"
              placeholder={t("email" || "Email")}
              className="px-3 py-1 rounded border bg-white border-gray-300 text-black focus:outline-none focus:ring-2 focus:ring-[#4B2615] pr-24"
            />
            <button
              type="submit"
              className="absolute right-1 top-1/2 -translate-y-1/2 bg-[#4B2615] text-white px-4 py-1 rounded hover:cursor-pointer border border-[#4B2615] transition text-sm"
            >
              {t("subscribe" || "Subscribe")}
            </button>
          </form>
        </div>
        <hr className="w-full border-t border-[#e0cfc2] mb-4" />
        <div className="w-full flex flex-col md:flex-row items-center justify-between text-xs text-[#e0cfc2]">
          <div className="flex flex-wrap gap-6 mb-2 md:mb-0">
            <Link href={"/about"} className="hover:underline cursor-pointer">
              {t("about" || "About")}
            </Link>
            <span className="hover:underline cursor-pointer">
              {t("OurStrategy" || "Our Strategy")}
            </span>
            <span className="hover:underline cursor-pointer">
              {t("OurAdvantages" || "Our Advantages")}
            </span>
            <span className="hover:underline cursor-pointer">
              {t("SocialResponsibility" || "SocialResponsibility")}
            </span>
            <Link href={"/services"} className="hover:underline cursor-pointer">
              {t("services" || "services")}
            </Link>
          </div>
          <div className="text-right">
            © {new Date().getFullYear()}.{" "}
            {t("AllRightsReserved" || "All Rights Reserved")}
          </div>
        </div>
      </div>
    </footer>
  );
}
