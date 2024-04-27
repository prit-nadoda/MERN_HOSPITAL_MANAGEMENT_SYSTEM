import React from "react";
import Hero from "../components/Hero";
import Biography from "../components/Biography";

const AboutUs = () => {
  return (
    <>
      <Hero
        title={"Learn More About VvCare Medical institute | Why Us?"}
        imageUrl={"/about.png"}
      />
      <Biography imgUrl={"/whoweare.png"} />
    </>
  );
};

export default AboutUs;
