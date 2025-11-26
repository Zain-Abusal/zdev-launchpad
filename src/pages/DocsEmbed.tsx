import { useEffect } from "react";

const DocsEmbed = () => {
  useEffect(() => {
    const docsUrl = import.meta.env.VITE_MINTLIFY_DOCS_URL || "https://docs.example.com";
    window.location.replace(docsUrl);
  }, []);
  return null;
};

export default DocsEmbed;
