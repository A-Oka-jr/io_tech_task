import { useTranslation } from "react-i18next";
import { MdOutlineEmail } from "react-icons/md";
import { MdPhoneInTalk } from "react-icons/md";
import { FaWhatsapp } from "react-icons/fa";
import { useState } from "react";

const teamMembers = [
  { name: "Name Here", position: "Position Here", img: "/profile.png" },
  { name: "Name Here", position: "Position Here", img: "/profile.png" },
  { name: "Name Here", position: "Position Here", img: "/profile.png" },
  { name: "Name Here", position: "Position Here", img: "/profile.png" },
];

const testimonials = [
  {
    img: "/profile.png",
    text:
      '"With the help of the hospitable staff of Al Safar and Partners I was able to get my work done without any hassle. The help I received helped me a great deal to overcome the issues that I faced. I was always updated about my case and my queries never went unanswered."',
    name: "Mohammed Saif",
    title: "CEO/Company",
  },
  {
    img: "/profile.png",
    text:
      '"The team was extremely professional and supportive throughout the process. I highly recommend their services to anyone in need of expert advice."',
    name: "Sarah Ahmed",
    title: "Manager/Business",
  },
  {
    img: "/profile.png",
    text:
      '"Excellent service and great communication. They made everything easy and stress-free for me."',
    name: "John Doe",
    title: "Entrepreneur",
  },
];

const Team = () => {
  const { t } = useTranslation();
  const [testimonialIdx, setTestimonialIdx] = useState(0);

  const handlePrev = () => {
    setTestimonialIdx((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setTestimonialIdx((prev) => (prev === testimonials.length - 1 ? 0 : prev + 1));
  };

  return (
    <div className="min-h-screen w-full bg-[#f7f7f7] flex flex-col items-center py-12">
      <h1 className="text-[#4B2615] text-5xl font-bold mb-4">
        {t("ourTeam") || "Our Team"}
      </h1>
      <p className="text-gray-600 max-w-2xl text-center mb-10">
        Lorem Ipsum is simply dummy text of the printing and typesetting
        industry. Lorem Ipsum has been the industry's standard dummy text ever
        since the 1500s
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 w-full max-w-5xl">
        {teamMembers.map((member, idx) => (
          <div
            key={idx}
            className="bg-white rounded-lg shadow-lg flex flex-col p-0 border border-gray-200 overflow-hidden"
          >
            <div className="bg-[#643F2E]">
            <img
              src={member.img}
              alt={member.name}
              className="w-full h-48 object-cover border-b-4 border-[#4B2615]"
            />
            </div>
            <div className="text-center p-6">
              <div className="text-[#4B2615] font-semibold text-lg mb-1">
                {member.name}
              </div>
              <div className="text-xs text-gray-400 tracking-widest mb-2">
                {member.position}
              </div>
              <div className="flex justify-center gap-4 text-xl text-[#4B2615] mt-2">
                <FaWhatsapp />
                <MdPhoneInTalk />
                <MdOutlineEmail />
              </div>
            </div>
          </div>
        ))}
      </div>
      {/* Testimonial Section */}
      <section className="w-full bg-[#4B2615] py-16 px-4 flex flex-col items-center mt-20">
        <div className="max-w-5xl w-full mx-auto">
          <h2 className="text-white text-3xl md:text-4xl font-bold mb-4">What our clients are saying</h2>
          <p className="text-[#e0cfc2] mb-10 max-w-2xl">Our clients range from individual investors, to local, international as well as fortune 500 companies.Our clients range from individual investors, to local, international as well as fortune 500 companies.</p>
          <div className="relative flex flex-col md:flex-row items-center gap-10 min-h-[300px]">
            {/* Slider Card */}
            <div className="transition-all duration-500 flex flex-col md:flex-row items-center w-full">
              <div className="bg-[#6b422e] w-72 h-72 flex items-center justify-center rounded-none shrink-0">
                <img src={testimonials[testimonialIdx].img} alt="Client" className="w-full h-full object-cover" />
              </div>
              <div className="flex-1 flex flex-col justify-center md:pl-10 mt-8 md:mt-0">
                <p className="text-[#e0cfc2] text-lg mb-8">{testimonials[testimonialIdx].text}</p>
                <div>
                  <div className="text-white font-bold text-lg">{testimonials[testimonialIdx].name}</div>
                  <div className="text-[#e0cfc2] text-sm">{testimonials[testimonialIdx].title}</div>
                </div>
              </div>
            </div>
            {/* Slider Arrows */}
            <div className="absolute right-0 bottom-0 flex gap-4 pr-2">
              <button onClick={handlePrev} className="w-10 h-10 rounded-full bg-[#5a3a28] flex items-center justify-center text-white text-xl shadow-md hover:bg-white hover:text-[#5a3a28]"><span>&#8592;</span></button>
              <button onClick={handleNext} className="w-10 h-10 rounded-full bg-[#5a3a28] flex items-center justify-center text-white text-xl shadow-md hover:bg-white hover:text-[#5a3a28]"><span>&#8594;</span></button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Team;
