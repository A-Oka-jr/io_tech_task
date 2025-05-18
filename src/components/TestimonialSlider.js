import { useState } from "react";
import { useTranslation } from "react-i18next";

const TestimonialSlider = ({ testimonials, lang }) => {
  const { t } = useTranslation();

  const [currentIdx, setCurrentIdx] = useState(0);

  const handlePrev = () => {
    setCurrentIdx((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentIdx((prev) => (prev === testimonials.length - 1 ? 0 : prev + 1));
  };

  const testimonial = testimonials[currentIdx];

  const name = lang.startsWith("ar") ? testimonial?.name_ar : testimonial?.name_en;
  const title = lang.startsWith("ar") ? testimonial?.title_ar : testimonial?.title_en;
  const text = lang.startsWith("ar") ? testimonial?.text_ar : testimonial?.text_en;
  const imageUrl = testimonial?.img?.url
    ? `http://localhost:1337${testimonial.img.url}`
    : "/profile.png";

  return (
    <section
      className="w-full bg-[#4B2615] py-16 px-4 flex flex-col items-center mt-20"
      dir={lang.startsWith("ar") ? "rtl" : "ltr"}
    >
      <div className="max-w-5xl w-full mx-auto">
        <h2 className="text-white text-3xl md:text-4xl font-bold mb-4">
          {t("testimonials.sectionTitle", "What our clients are saying")}
        </h2>
        <p className="text-[#e0cfc2] mb-10 max-w-2xl">
          {t(
            "testimonials.description",
            "Our clients range from individual investors to local, international, and Fortune 500 companies."
          )}
        </p>
        <div className="relative flex flex-col md:flex-row items-center gap-10 min-h-[300px]">
          <div
            className={`transition-all duration-500 flex flex-col md:flex-row items-center w-full ${
              lang.startsWith("ar")
                ? "md:space-x-reverse md:space-x-10"
                : "md:space-x-10"
            }`}
          >
            <div className="bg-[#6b422e] w-72 h-72 flex items-center justify-center rounded-none shrink-0">
              <img
                src={imageUrl}
                alt={t("testimonials.clientAlt", "Client")}
                className="w-full h-full object-cover"
              />
            </div>
            <div
              className={`flex-1 flex flex-col justify-center mt-8 md:mt-0 ${
                lang.startsWith("ar") ? "text-right md:pr-10" : "text-left md:pl-10"
              }`}
            >
              <p className="text-[#e0cfc2] text-lg mb-8">{text || t("testimonials.defaultText", "Text")}</p>
              <div>
                <div className="text-white font-bold text-lg">{name || t("testimonials.defaultName", "name")}</div>
                <div className="text-[#e0cfc2] text-sm">{title || t("testimonials.defaultJobTitle", "Job title")}</div>
              </div>
            </div>
          </div>

          <div
            className={`absolute bottom-0 flex gap-4 pr-2 ${
              lang.startsWith("ar") ? "left-0" : "right-0"
            }`}
          >
            <button
              onClick={handlePrev}
              className="w-10 h-10 rounded-full bg-[#5a3a28] flex items-center justify-center text-white text-xl shadow-md hover:bg-white hover:text-[#5a3a28]"
              aria-label={t("testimonials.prev", "Previous")}
            >
              {lang.startsWith("ar") ? "→" : "←"}
            </button>
            <button
              onClick={handleNext}
              className="w-10 h-10 rounded-full bg-[#5a3a28] flex items-center justify-center text-white text-xl shadow-md hover:bg-white hover:text-[#5a3a28]"
              aria-label={t("testimonials.next", "Next")}
            >
              {lang.startsWith("ar") ? "←" : "→"}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialSlider;
