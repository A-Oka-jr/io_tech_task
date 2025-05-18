import { useState } from "react";

const TestimonialSlider = ({ testimonials, lang }) => {
  const [testimonialIdx, setTestimonialIdx] = useState(0);

  const handlePrev = () => {
    setTestimonialIdx((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setTestimonialIdx((prev) => (prev === testimonials.length - 1 ? 0 : prev + 1));
  };

  return (
    <section className="w-full bg-[#4B2615] py-16 px-4 flex flex-col items-center mt-20">
      <div className="max-w-5xl w-full mx-auto">
        <h2 className="text-white text-3xl md:text-4xl font-bold mb-4">
          {lang.startsWith("ar") ? "آراء عملائنا" : "What our clients are saying"}
        </h2>
        <p className="text-[#e0cfc2] mb-10 max-w-2xl">
          {lang.startsWith("ar")
            ? "عملاؤنا يتنوعون من مستثمرين أفراد إلى شركات محلية ودولية وشركات من ضمن قائمة فورتشن 500."
            : "Our clients range from individual investors to local, international, and Fortune 500 companies."}
        </p>
        <div className="relative flex flex-col md:flex-row items-center gap-10 min-h-[300px]">
          <div className="transition-all duration-500 flex flex-col md:flex-row items-center w-full">
            <div className="bg-[#6b422e] w-72 h-72 flex items-center justify-center rounded-none shrink-0">
              <img
                src={testimonials[testimonialIdx]?.img || "/profile.png"}
                alt="Client"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex-1 flex flex-col justify-center md:pl-10 mt-8 md:mt-0">
              <p className="text-[#e0cfc2] text-lg mb-8">
                {testimonials[testimonialIdx]?.text}
              </p>
              <div>
                <div className="text-white font-bold text-lg">
                  {testimonials[testimonialIdx]?.name}
                </div>
                <div className="text-[#e0cfc2] text-sm">
                  {testimonials[testimonialIdx]?.title}
                </div>
              </div>
            </div>
          </div>

          <div className="absolute right-0 bottom-0 flex gap-4 pr-2">
            <button
              onClick={handlePrev}
              className="w-10 h-10 rounded-full bg-[#5a3a28] flex items-center justify-center text-white text-xl shadow-md hover:bg-white hover:text-[#5a3a28]"
            >
              &#8592;
            </button>
            <button
              onClick={handleNext}
              className="w-10 h-10 rounded-full bg-[#5a3a28] flex items-center justify-center text-white text-xl shadow-md hover:bg-white hover:text-[#5a3a28]"
            >
              &#8594;
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialSlider;
