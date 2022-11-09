import React, { useRef } from "react";
import { useOnLoadImages } from "hooks/useOnLoadImages";
import LoadingSpinner from "components/LoadingSpinner";
import IntroSection from "./IntroSection";
import KGSection from "./KGSection";
import TechStackSection from "./TechStackSection";
import CustomerUISection from "./CustomerUISection";
import AdminUISection from "./AdminUISection";

const AboutPage = () => {
  const ref = useRef();
  const imagesLoaded = useOnLoadImages(ref);

  return (
    <div className="container-fluid p-0" ref={ref}>
      {!imagesLoaded ? (
        <LoadingSpinner />
      ) : (
        <>
          <IntroSection />
          <KGSection />
          <TechStackSection />
          <CustomerUISection />
          <AdminUISection />
        </>
      )}
    </div>
  );
};
export default AboutPage;
