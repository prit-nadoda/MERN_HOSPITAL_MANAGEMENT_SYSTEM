import React from "react";

const Biography = ({ imgUrl }) => {
  return (
    <div className="container biography">
      <div className="banner">
        <img src={imgUrl} alt="aboutImg" />
      </div>
      <div className="banner">
        <p>Biography</p>
        <h3>Who We Are?</h3>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquid,
          voluptatum. Fuga iure, amet fugiat quos aliquam quas aut? Laboriosam
          non sint, temporibus quidem omnis amet iure cum nisi ex voluptates sed
          neque consectetur sit aliquam quam nesciunt reiciendis cumque, odit
          porro voluptatibus deleniti ipsam hic! Similique itaque incidunt esse
          voluptates?
        </p>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
        <p>Lorem ipsum dolor sit amet.</p>
        <br />
        <br />
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Libero natus
          ipsum sit quis! Officia inventore reiciendis alias adipisci laborum,
          nobis nam mollitia fugit nostrum vitae.
        </p>
        <p>
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Asperiores
          maxime quo ratione!
        </p>
        <p>
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Impedit,
          facilis.
        </p>
        <br />
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Libero natus
          ipsum sit quis! Officia inventore reiciendis alias adipisci laborum,
          nobis nam mollitia fugit nostrum vitae.
        </p>
      </div>
    </div>
  );
};

export default Biography;
