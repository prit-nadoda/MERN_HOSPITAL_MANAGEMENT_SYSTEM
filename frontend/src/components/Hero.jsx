import React from "react";

const Hero = ({ title, imageUrl }) => {
  return (
    <div className="hero container">
      <div className="banner">
        <h1>{title}</h1>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Maiores
          officia, eum excepturi facere quos ducimus laudantium doloremque
          debitis quo reiciendis. In labore fugiat distinctio exercitationem
          praesentium possimus animi, corrupti atque natus et neque voluptate
          dicta amet ab maiores molestias fugit assumenda debitis quibusdam
          ipsam voluptatibus, delectus perferendis! Ab, labore corporis.
        </p>
      </div>
      <div className="banner">
        <img src={imageUrl} alt="HeroIMg" className="animated-image" />
        <span>
          <img src="/Vector.png" alt="vectorImg" />
        </span>
      </div>
    </div>
  );
};

export default Hero;
