import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import axios from "axios";

import TeamMember from "../components/TeamMember";
import TestimonialSlider from "../components/TestimonialSlider";

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
  const { t, i18n } = useTranslation();
  const [teamMembers, setTeamMembers] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:1337/api/teams?populate=profile")
      .then((res) => {
        console.log(res.data.data);
        setTeamMembers(res.data.data);
      })
      .catch((err) => {
        console.error("Error fetching team members:", err);
      });
  }, []);

  return (
    <div className="min-h-screen w-full bg-[#f7f7f7] flex flex-col items-center py-12">
      <h1 className="text-[#4B2615] text-5xl font-bold mb-4">
        {t("ourTeam") || "Our Team"}
      </h1>
      <p className="text-gray-600 max-w-2xl text-center mb-10">
        Lorem Ipsum is simply dummy text of the printing and typesetting industry.
      </p>

      {/* Team Members Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 w-full max-w-5xl">
        {teamMembers.length > 0 ? (
          teamMembers.map((member, idx) => (
            <TeamMember key={idx} member={member} lang={i18n.language} />
          ))
        ) : (
          <p className="text-center col-span-3 text-gray-500 text-lg">
            {i18n.language.startsWith("ar")
              ? t("Loading")
              : "Loading team members..."}
          </p>
        )}
      </div>

      {/* Testimonials Slider */}
      <TestimonialSlider testimonials={testimonials} lang={i18n.language} />
    </div>
  );
};

export default Team;
