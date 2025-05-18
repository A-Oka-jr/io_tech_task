import { useState, useEffect } from "react";
import axios from "axios";
import { useTranslation } from "react-i18next";

export default function SliderCaption() {
  const { i18n } = useTranslation();
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
    if (i18n.language === "ar") {
      document.body.dir = "rtl";
    } else {
      document.body.dir = "ltr";
    }
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
      <div
        className={`absolute inset-0 flex items-center z-20`}
        style={{ pointerEvents: "none" }}
      >
        <div
          className={`max-w-xl text-white flex flex-col ${
            lang === "ar"
              ? "absolute right-0 mr-[8vw] text-right items-end"
              : "ml-[8vw] text-left items-start"
          }`}
          style={{ pointerEvents: "auto" }}
        >
          <h2
            className="text-5xl font-bold mb-6 animate-fade-in drop-shadow-lg w-full"
            dir={lang === "ar" ? "rtl" : "ltr"}
          >
            {title}
          </h2>
          <p
            className="text-lg mb-8 animate-fade-in delay-100 drop-shadow w-full"
            dir={lang === "ar" ? "rtl" : "ltr"}
          >
            {desc}
          </p>
          <button
            className={`bg-white text-[#4B2615] px-8 py-3 rounded-lg font-semibold shadow hover:bg-[#e0cfc2] transition text-lg w-fit ${
              lang === "ar" ? "self-start" : "self-start"
            }`}
          >
            {lang === "ar" ? "اقرأ المزيد" : "Read More"}
          </button>
        </div>
      </div>
      <div
        className={`absolute z-30 flex flex-col gap-3 ${
          lang === "ar" ? "right-8" : "left-8"
        } top-1/2 -translate-y-1/2`}
        style={{ pointerEvents: "auto" }}
      >
        <button
          className="mb-6 text-white text-3xl rounded-full p-2 :hover:cursor-pointer"
          style={{ alignSelf: "center" }}
          onClick={() =>
            setActive((prev) => (prev - 1 + captions.length) % captions.length)
          }
          aria-label={lang === "ar" ? "الشريحة السابقة" : "Previous caption"}
        >
          {lang === "ar" ? "\u003E" : "\u003C"}
        </button>
        {captions.map((_, idx) => (
          <button
            key={idx}
            className={`w-3 h-3 rounded-full border-2 ${
              active === idx
                ? "bg-white border-white"
                : "border-white bg-transparent"
            } transition`}
            onClick={() => setActive(idx)}
            aria-label={
              lang === "ar"
                ? `اذهب إلى الشريحة ${idx + 1}`
                : `Go to slide ${idx + 1}`
            }
          />
        ))}
      </div>
    </>
  );
}
