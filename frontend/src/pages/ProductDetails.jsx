import {
  AiFillStar,
  AiFillTwitterCircle,
} from "react-icons/ai";
import { FaFacebook, FaInstagramSquare, FaArrowRight } from "react-icons/fa";
import SharedBanner from "../shares/SharedBanner";
import { pageProducts, productDetails } from "../../data";
import ImageGallery from "react-image-gallery";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addToCart } from "../slices/cartSlice";
  

const Products = () => {
  // const products = useSelector((state) => state.products.productDetails);
  // const allProducts = useSelector((state) => state.products.items);
  // console.log("component product", products);
  // const dispatch = useDispatch();

  // const navigate = useNavigate();
  // const handleAddToCart = (productId) => {
  //   console.log("button clicked", productId);
  //   const itemIndex = allProducts.findIndex(
  //     (item) => item.batch_code === productId
  //   );
  //   console.log("itemIndex", itemIndex);
  //   dispatch(addToCart(allProducts[itemIndex]));
  //   navigate("/cart");
  // };
  // const getProductImages = (images) => {
  //   const productImages = images.map((image) => {
  //     return {
  //       original: image,
  //       thumbnail: image,
  //     };
  //   });
  //   return productImages;
  // };
  // const images = getProductImages(products.images);
  return (
    <section className="pt-10">
      {/* banner title */}
      <SharedBanner>Product Details</SharedBanner>
      {/* product detail */}
      <div className="flex  h-full w-full items-center justify-center bg-white lg:px-20">
        <div className="flex w-full  flex-col items-center gap-6  p-3 shadow-[rgba(7,_65,_210,_0.1)_0px_9px_30px] md:h-[500px]  md:w-full md:flex-row">
          <ImageGallery items={productDetails.images} />
          <div className=" flex flex-col space-y-3 p-3">
            <h1 className="font-jose text-[30px] font-semibold text-blue">
              {productDetails.productName}
            </h1>
            <div className="flex gap-2">
              <p className="font-jose text-sm text-blue">
                {productDetails.productDiscountedAmount}
              </p>
              <p className="font-jose text-sm text-pink line-through">
                {productDetails.productActualAmount}
              </p>
            </div>
            <p className="font-jose text-sm text-subtext">
              {productDetails.productDetail}
            </p>
            <div
              className="flex gap-2 text-center"
              onClick={() => {
                // handleAddToCart(productDetails.productId);
              }}
              style={{ cursor: "pointer" }}
            >
              <p className="ml-10 font-jose text-sm text-blue">Add To Cart</p>
              {/* <BsFillCartCheckFill className="text-gray-600" /> */}
            </div>
            <p className="font-jose text-sm text-blue">Categories</p>
            <p className="font-jose text-sm text-blue">Tags</p>
            <div className="flex gap-2">
              <p className="font-jose text-sm text-blue">Share </p>
              <FaFacebook className="h-4 w-4" />
              <FaInstagramSquare className="h-4 w-4 rounded-full text-pink" />
              <AiFillTwitterCircle className="h-4 w-4" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Products;
