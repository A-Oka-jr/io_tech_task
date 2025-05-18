import axios from "axios";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import ReactMarkdown from "react-markdown";

export default function ServiceDetails() {
  const router = useRouter();
  const { documentId } = router.query;
  const { i18n } = useTranslation();

  const [service, setService] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!documentId) return;

    const fetchService = async () => {
      try {
        const res = await axios.get(
          `http://localhost:1337/api/services/${documentId}`
        );
        // console.log(res.data.data);
        setService(res.data.data);
      } catch (err) {
        console.error("Failed to fetch service details", err);
      } finally {
        setLoading(false);
      }
    };

    fetchService();
  }, [documentId]);
  console.log(service);

  if (loading)
    return <div className="p-10 text-center text-2xl">Loading...</div>;

  if (!service)
    return <div className="p-10 text-center text-2xl">Service not found.</div>;

  return (
    <div className="p-10 max-w-5xl mx-auto text-[#4B2615]">
      <h1 className="text-4xl font-bold mb-6">
        {i18n.language === "ar" ? service?.title_ar : service?.title_en}
      </h1>
      <p className="text-lg leading-8">
        {i18n.language === "ar"
          ? service?.description_ar
          : service?.description_en}
      </p>
      <div className="prose prose-lg max-w-none">
        <ReactMarkdown>
          {i18n.language === "ar" ? service?.content_ar : service?.content_en}
        </ReactMarkdown>
      </div>
    </div>
  );
}
