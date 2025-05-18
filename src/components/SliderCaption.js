import { useState, useEffect } from "react";
import axios from "axios";
import { useTranslation } from "react-i18next";

export default function SliderCaption() {
  const { i18n, t } = useTranslation();
  const [active, setActive] = useState(0);
  const [captions, setCaptions] = useState([]);

  useEffect(() => {
    async function fetchCaptions() {
      try {
        const res = await axios.get("http://localhost:1337/api/captions");
        setCaptions(res.data.data);
      } catch (error) {
        console.error("Failed to fetch captions", error);
      }
    }
    fetchCaptions();
  }, []);

  useEffect(() => {
    if (captions.length === 0) return;
    const interval = setInterval(() => {
      setActive((prev) => (prev + 1) % captions.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [captions]);

  useEffect(() => {
    document.body.dir = i18n.language === "ar" ? "rtl" : "ltr";
    return () => {
      document.body.dir = "ltr";
    };
  }, [i18n.language]);

  if (captions.length === 0) return null;

  const lang = i18n.language || "en";
  const currentCaption = captions[active];
  const title =
    lang === "ar" ? currentCaption.title_ar : currentCaption.title_en;
  const desc = lang === "ar" ? currentCaption.text_ar : currentCaption.text_en;

  return (
    <>
      <div className="absolute inset-0 flex items-center z-20 pointer-events-none">
        <div
          className={`max-w-md sm:max-w-lg md:max-w-xl lg:max-w-2xl xl:max-w-3xl w-full text-white flex flex-col ${
            lang === "ar"
              ? "absolute right-0 mr-[4vw] md:mr-[8vw] text-right items-end"
              : "ml-[4vw] md:ml-[8vw] text-left items-start"
          } px-4 md:px-0 pointer-events-auto space-y-4 md:space-y-6`}
        >
          <h2
            className="font-bold animate-fade-in drop-shadow-lg w-full"
            style={{
              fontSize: "clamp(1.5rem, 5vw, 4rem)",
            }}
            dir={lang === "ar" ? "rtl" : "ltr"}
          >
            {title}
          </h2>
          <p
            className="text-base md:text-lg animate-fade-in delay-100 drop-shadow w-full"
            dir={lang === "ar" ? "rtl" : "ltr"}
          >
            {desc}
          </p>
          <button
            className="bg-white text-[#4B2615] px-6 md:px-8 py-2 md:py-3 rounded-lg font-semibold shadow hover:bg-[#e0cfc2] transition text-base md:text-lg w-fit"
            style={{ alignSelf: "flex-start" }}
          >
            {t("readMore")}
          </button>
        </div>
      </div>

      <div
        className={`absolute z-30 flex flex-col gap-2 md:gap-3 ${
          lang === "ar" ? "right-4 md:right-8" : "left-4 md:left-8"
        } top-1/2 -translate-y-1/2 pointer-events-auto`}
      >
        <button
          className="mb-4 md:mb-6 text-white text-2xl md:text-3xl rounded-full p-2 md:p-3"
          style={{ alignSelf: "center" }}
          onClick={() =>
            setActive((prev) => (prev - 1 + captions.length) % captions.length)
          }
          aria-label={lang === "ar" ? t("previousSlide") : t("previousSlide")}
        >
          {lang === "ar" ? "\u003E" : "\u003C"}
        </button>
        {captions.map((_, idx) => (
          <button
            key={idx}
            className={`w-2 h-2 md:w-3 md:h-3 rounded-full border-2 ${
              active === idx
                ? "bg-white border-white"
                : "border-white bg-transparent"
            } transition`}
            onClick={() => setActive(idx)}
            aria-label={
              lang === "ar"
                ? `${t("goToSlide")} ${idx + 1}`
                : `${t("goToSlide")} ${idx + 1}`
            }
          />
        ))}
      </div>
    </>
  );
}
