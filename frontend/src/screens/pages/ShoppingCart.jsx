import { useSelector } from "react-redux/es/hooks/useSelector";
import { Link } from "react-router-dom";
import SharedBanner from "../../shares/SharedBanner";
import { BsArrowLeft, BsFillCheckCircleFill } from "react-icons/bs";
import { AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";
import {
  increaseQuantity,
  decreaseQuantity,
  clearCart,
} from "../../slices/cartSlice";
import { useDispatch } from "react-redux";

//styles
const buttonStyles = `px-4 py-2 bg-[#e7e7e7] text-black font-bold rounded-md `;

const pinkButtons = `mt-5 bg-pink px-4 py-2 font-jose text-sm text-white transition hover:bg-deeppink`;

const flexCenter = `flex items-center justify-center`;

const ShoppingCart = () => {
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);
  console.log("cart",cart);
  const handleIncrease = (product) => {
    dispatch(increaseQuantity(product));
  };
  
  const handelDecrease = (product) => {
    dispatch(decreaseQuantity(product));
  };
  const HandleClearCart=()=>{
    dispatch(clearCart())
  }
  

  return (
    <section className="container mx-auto w-full pt-10 md:pl-4 md:pt-20 lg:ml-auto">
      <SharedBanner>Shopping Cart</SharedBanner>

      <div className=" flex justify-center py-20 font-jose">
        <div>
          {cart.cartItems.length === 0 ? (
            <div>
              <h3 className="text-md text-blue">
                Your cart is currently empty.
              </h3>
              <div className="flex items-center justify-center gap-3">
                <BsArrowLeft size={30} />
                <span className="font-semibold text-blue">
                  <Link to="/pages/grid">Start Shopping!</Link>
                </span>
              </div>
            </div>
          ) : (
            <div className="container">
              <div className=" ">
                <div className=" bg-white ">
                  {/* <!-- Column Headers --> */}
                  <div className="">
                    <div className="grid grid-cols-3 gap-x-20 gap-y-10 md:gap-x-8 md:gap-y-6">
                      <h3 className="" style={{ paddingRight: "30%" }}>
                        Products
                      </h3>
                      <h3 className="" style={{ paddingRight: "25%" }}>
                        Price
                      </h3>
                      <h3 className="" style={{ paddingLeft: "20%" }}>
                        Quantity
                      </h3>
                    </div>

                    {/* Sample Cart Items */}
                    <div className="-mx-8items-center">
                      {cart.cartItems?.map((cartItem) => (
                        <div
                          key={cartItem.batch_code}
                          className="grid grid-cols-3 gap-x-20 gap-y-10 md:gap-x-8 md:gap-y-6"
                        >
                          {/* PRODUCT */}
                          <div className="">
                            <img
                              src={cartItem.images[0]}
                              alt={cartItem.product_name}
                              className=" h-24 object-cover"
                            />
                            <p className="">{cartItem.product_name}</p>
                          </div>

                          <div className=" flex justify-between">
                            <p className="">{cartItem.price?.cartItem.price || 30}</p>
                          </div>
                          {/* BUTTONS */}
                          <div className="ml-2 flex h-1/2 w-1/5 items-center justify-center">
                            <button
                              className={`${buttonStyles}`}
                              onClick={() => {
                                handelDecrease(cartItem);
                              }}
                            >
                              <AiOutlineMinus />
                            </button>
                            <div className="">
                              {" "}
                              {/* Adjust margin here */}
                              <div className="p-2 font-bold">
                                {cartItem.cartQuantity}
                              </div>
                            </div>
                            <button
                              className={`${buttonStyles}`}
                              onClick={() => {
                                handleIncrease(cartItem);
                              }}
                            >
                              <AiOutlinePlus />
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <img src="/line6.png" className="mt-4 h-0.5 w-full" />
                  <div className="justify-bw flex">
                    <button
                      className={`${pinkButtons}`}
                      onClick={() => {
                        HandleClearCart();
                      }}
                    >
                      Clear Cart
                    </button>
                  </div>
                </div>
              </div>

              {/* CART TOTALS */}
              <div className="mt-10">
                <div className="flex w-[400px] flex-col">
                  <h3 className="text-center font-jose font-bold text-blue">
                    Cart Totals
                  </h3>
                  <div className="mt-7 flex h-[284px] w-[371px] flex-col space-y-4 bg-primary px-5 py-7">
                    <div>
                      <div className="mb-1 flex justify-between">
                        <p>Subtotals:</p>
                        <p>PRICE</p>
                      </div>
                      <img src="/line6.png" />
                    </div>

                    <div>
                      <div className="mb-1 flex justify-between">
                        <p>Totals:</p>
                        <p>ca {cart.cartTotalAmount}</p>
                      </div>
                      <img src="/line6.png" />
                    </div>

                    <div className="flex gap-2">
                      <BsFillCheckCircleFill />
                      <p className="text-xs text-subtext">
                        Shipping & taxes calculated at checkout
                      </p>
                    </div>

                    <button className="rounded-sm bg-[#19d16f] px-4 py-2 text-xs text-white">
                      Proceed to Checkout
                    </button>
                  </div>

                  <div className="mt-5 flex items-center justify-center gap-3">
                    <BsArrowLeft size={30} />
                    <span className="font-semibold text-blue">
                      <Link to="/pages/grid">Continue Shopping</Link>
                    </span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default ShoppingCart;
