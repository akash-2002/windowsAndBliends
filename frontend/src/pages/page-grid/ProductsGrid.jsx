//redux toolkit

import { motion } from "framer-motion";
import { pageProducts } from "../../../data";
import { useDispatch } from "react-redux";
import { addToCart } from "../../slices/cartSlice";
import {addToProductDetails} from "../../slices/productsSlice";
import { useNavigate } from "react-router-dom";
import { BsFillCartCheckFill } from "react-icons/bs";



const ProductsGrid = ({ data, isLoading, error }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleAddToCart = (product) => {
    console.log("button clicked");
    dispatch(addToCart(product));
    navigate("/cart");
  };
  const handleClickToProductDetails = (product) => {
    console.log(product);
    dispatch(addToProductDetails(product));
    navigate("/products");
  }

  return (
    <>
      <div className="gridColumn-4 mt-10 md:mt-20">
        {data.map((product) => (
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.5 }}
            variants={{
              hidden: { opacity: 0, y: -50 },
              visible: { opacity: 1, y: 0 },
            }}
            key={product.batch_code}
            className="h-[390px] w-[240px]"
          >
            <div
              className="flex items-center justify-center bg-secondary p-4 hover:bg-[#EBF4F3]"
              onClick={() => {
                // navigate("/products");
                handleClickToProductDetails(product);
              }}
            >
              <img
                src={product.images[0]}
                alt={product.product_name}
                className="zoom h-48 w-full object-contain"
                loading="lazy"
              />
            </div>
            <div className=" md:py-5">
              <div className="text-center">
                <p className="text-md font-jose font-extrabold text-[#151875]">
                  {product.product_name}
                </p>
              </div>

              <div className="flex items-center justify-center gap-3 text-center">
                <p className=" text-sm ">€36</p>
                <p className="text-sm text-pink line-through">
                  €20
                </p>
              </div>
              <div className="bottom-5 w-full px-6 transition ">
                <div className="flex justify-center gap-x-6">
                  <button
                    className="flex items-center justify-center rounded-full border bg-white p-2 shadow-md transition hover:scale-110"
                    onClick={() => {
                      handleAddToCart(product);
                    }}
                  >
                    <BsFillCartCheckFill className="text-gray-600" />
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </>
  );
};

export default ProductsGrid;
