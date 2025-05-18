import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import axios from "axios";

import TeamMember from "../components/TeamMember";
import TestimonialSlider from "../components/TestimonialSlider";
import SliderCaption from "@/components/SliderCaption";

const Team = () => {
  const { t, i18n } = useTranslation();
  const [teamMembers, setTeamMembers] = useState([]);
  const [testimonials, setTestimonials] = useState([]);

  useEffect(() => {
    const fetchTeamMembers = async () => {
      axios
        .get("http://localhost:1337/api/teams?populate=profile")
        .then((res) => {
          setTeamMembers(res.data.data);
        })
        .catch((err) => {
          console.error("Error fetching team members:", err);
        });
    };

    const fetchTestimonials = async () => {
      axios
        .get("http://localhost:1337/api/testimonials?populate=img")
        .then((res) => {
          console.log(res.data.data);
          setTestimonials(res.data.data);
        })
        .catch((err) => {
          console.error("Error fetching testimonials:", err);
        });
    };

    fetchTeamMembers();
    fetchTestimonials();
  }, []);

  return (
    <div>
      <SliderCaption />
      <div className="min-h-screen w-full bg-[#f7f7f7] flex flex-col items-center py-12">
        <h1 className="text-[#4B2615] text-5xl font-bold mb-4">
          {t("ourTeam") || "Our Team"}
        </h1>
        <p className="text-gray-600 max-w-2xl text-center mb-10">
          {t("teamDescription") ||
            "We are a team of dedicated professionals with a passion for excellence. Our diverse backgrounds and expertise allow us to deliver exceptional results for our clients."}
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
        {testimonials.length > 0 ? (
          <TestimonialSlider testimonials={testimonials} lang={i18n.language} />
        ) : (
          <p className="text-center text-gray-500 text-lg mt-10">
            {i18n.language.startsWith("ar")
              ? t("Loading")
              : "Loading testimonials..."}
          </p>
        )}
      </div>
    </div>
  );
};

export default Team;
