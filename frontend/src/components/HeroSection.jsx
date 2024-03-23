import ActionButton from "../shares/ActionButton";
import Sofa from "/assets/sofa.png";
import logo from "/assets/hitech_logo-removebg-preview.png";
import Lamp from "/assets/lamp.png";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const HeroSection = () => {
  const [navbarHeight, setNavbarHeight] = useState(8);

  useEffect(() => {
    // Get the height of the navbar
    const navbar = document.querySelector("nav");
    console.log(navbar);
    if (navbar) {
      const height = navbar.offsetHeight;
      console.log(height);
      setNavbarHeight(height==0?8:height);
    }
  }, []);
  return (
    <section
      className="bg-primary md:pt-20"
      style={{ marginTop: window.innerWidth >= 768 ? navbarHeight : 0 }}
    >
      <div className="grid px-10 md:flex ">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.5 }}
          variants={{
            hidden: { opacity: 0, x: -50 },
            visible: { opacity: 1, x: 0 },
          }}
          className="w-[10%] md:w-[20%]"
        >
          <img
            src={Lamp}
            alt="lamp"
            className="w-full object-fill"
            loading="lazy"
          />
        </motion.div>
        <div className="flex flex-col items-center  md:flex md:basis-3/4 md:flex-row md:py-20">
          {/* text */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.5 }}
            variants={{
              hidden: { opacity: 0, x: -50 },
              visible: { opacity: 1, x: 0 },
            }}
            className="flex-1 space-y-5"
          >
            <p className="text-sm text-pink">Best Windows and Blinds</p>
            <h1 className="font-jose text-3xl font-bold leading-10">
              New Blinds Collection <br />
              in Trend
            </h1>
            <p className="text-sm text-gray-500">
              Hightech Window and Blinds. 15300 68 Ave unit 108, Surrey, BC V3S
              2B9
            </p>
            <Link to="/pages/grid">
              <ActionButton>Shop Now</ActionButton>
            </Link>
          </motion.div>

          {/* images */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.5 }}
            variants={{
              hidden: { opacity: 0, x: 50 },
              visible: { opacity: 1, x: 0 },
            }}
            className="mt-10 flex-1"
          >
            <div className="relative flex items-center">
              <img src={logo} alt="Bliend" loading="lazy" />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
