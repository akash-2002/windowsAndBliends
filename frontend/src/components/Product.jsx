import { featureProducts } from "../../data";
import { motion } from "framer-motion";
import Offers from "./Offers";
import SharedText from "../shares/SharedText";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";

const items = ["New Arrivals", "Best Sellers", "Featured", "Special 0ffers"];
const flexCenter = `flex items-center justify-center`;

const container = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.2 },
  },
};

const Product = () => {
  debugger
  const products = useSelector((state) => state.products.items);
  console.log("products from useselector", products);
  return (
    <section className=" mx-auto  w-full md:px-20">
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.5 }}
        transition={{ duration: 0.5 }}
        variants={{
          hidden: { opacity: 0, y: -50 },
          visible: { opacity: 1, y: 0 },
        }}
        className="pt-10 md:py-10"
      >
        <SharedText>Featured Products</SharedText>
      </motion.div>

      {/* FEATURED PRODUCTS */}
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.5 }}
        variants={container}
        className="gridColumn-3"
      >
        {products.map((product) => {
          if (product.categories.includes("treanding")) {
            return(
            <div
              className={` h-[361px] w-[270px] justify-self-center drop-shadow-xl md:grid md:grid-rows-1`}
              key={product.batch_code}
            >
              <div className={`${flexCenter} bg-secondary p-5`}>
                <img
                  src={product.images[0]}
                  alt={product.product_name}
                  loading="lazy"
                  //className="zoom"
                />
              </div>
              <div
                className={`${flexCenter} flex-col gap-y-2 bg-white px-8 py-2`}
              >
                <h3 className="text-pink">{product.product_name}</h3>
                <img src={product.color} alt={product.name} />
                <p className="font-sm font-jose text-blue">
                  {product.batch_code}
                </p>
                <p className="text-sm text-blue">30</p>
              </div>
            </div>);
          } else {
            return null; // Return null if the condition is not met
          }})}
      </motion.div>

      {/* LATEST PRODUCTS */}
      <div className="pt-10">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.5 }}
          variants={{
            hidden: { opacity: 0, x: 50 },
            visible: { opacity: 1, x: 0 },
          }}
        >
          <SharedText> Latest Products</SharedText>
        </motion.div>

        {/* <div className="">
          <ul className=" flex flex-col gap-4 py-5 text-center text-blue md:flex-row md:items-center md:justify-center">
            {items.map((item, index) => (
              <li className="hover:text-pink hover:underline" key={index}>
                {item}
              </li>
            ))}
          </ul>
        </div> */}

        <div className="gridColumn-6 mt-10">
          {products.map((product) => {
            if (product.categories.includes("latest")) {
              return(
              <div
                className={` h-[361px] w-[270px] justify-self-center drop-shadow-xl md:grid md:grid-rows-1`}
                key={product.batch_code}
              >
                <div className={`${flexCenter} bg-secondary p-5`}>
                  <img
                    src={product.images[0]}
                    alt={product.product_name}
                    loading="lazy"
                    //className="zoom"
                  />
                </div>
                <div
                  className={`${flexCenter} flex-col gap-y-2 bg-white px-8 py-2`}
                >
                  <h3 className="text-pink">{product.product_name}</h3>
                  <img src={product.color} alt={product.product_name} />
                  <p className="font-sm font-jose text-blue">
                    {product.batch_code}
                  </p>
                  <p className="text-sm text-blue">30</p>
                </div>
              </div>);
            } else {
              return null; // Return null if the condition is not met
            }
          })}
        </div>
      </div>

      {/* OFFERS */}
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.5 }}
        transition={{ duration: 0.5 }}
        variants={{
          hidden: { opacity: 0, x: -50 },
          visible: { opacity: 1, x: 0 },
        }}
        className="mt-10 "
      >
        <SharedText>What Shop Offer!</SharedText>
        <Offers />
      </motion.div>
    </section>
  );
};

export default Product;
