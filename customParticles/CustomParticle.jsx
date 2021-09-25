import React from "react";
import paticleData from "./ParticleData";
import "./CustomParticle.scss";
import Particles from "react-particles-js";

const CustomParticle = () => {
    return (
        <Particles
            className="particles"
            params={paticleData}
            style={{
                width: "100%",
                height: "100%",
            }}
        />
    );
};

export default CustomParticle;
