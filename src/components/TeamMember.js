import { FaWhatsapp } from "react-icons/fa";
import { MdPhoneInTalk, MdOutlineEmail } from "react-icons/md";
import { useSelector } from 'react-redux';

const TeamMember = ({ member }) => {
  const lang = useSelector((state) => state.language.lang);
  const name = lang.startsWith("ar") ? member?.name_ar : member?.name_en;
  const position = lang.startsWith("ar")
    ? member?.position_ar
    : member?.position_en;

  const imageUrl = member?.profile?.url
    ? `http://localhost:1337${member.profile.url}`
    : "/default-profile.png";

  return (
    <div className="bg-white rounded-lg shadow-lg flex flex-col p-0 border border-gray-200 overflow-hidden">
      <div className="bg-[#643F2E]">
        <img
          src={imageUrl}
          alt={name || (lang.startsWith("ar") ? "عضو الفريق" : "team member")}
          className="w-full h-48 object-cover border-b-4 border-[#4B2615]"
        />
      </div>
      <div className="text-center p-6">
        <div className="text-[#4B2615] font-semibold text-lg mb-1">
          {name || (lang.startsWith("ar") ? "عضو الفريق" : "Team Member")}
        </div>
        <div className="text-xs text-gray-400 tracking-widest mb-2">
          {position || (lang.startsWith("ar") ? "بدون منصب" : "No position")}
        </div>
        <div className="flex justify-center gap-4 text-xl text-[#4B2615] mt-2">
          <FaWhatsapp />
          <MdPhoneInTalk />
          <MdOutlineEmail />
        </div>
      </div>
    </div>
  );
};

export default TeamMember;
