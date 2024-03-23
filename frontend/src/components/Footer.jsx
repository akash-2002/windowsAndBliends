import { FaFacebook, FaInstagram } from "react-icons/fa";
import { AiFillTwitterCircle } from "react-icons/ai";

const Footer = () => {
  return (
    <footer className=" bg-[#eeeffb]">
      <div className="flex  items-center justify-around px-10 py-20">
        <div className="flex flex-col gap-10 md:flex-row">
          <div className="space-y-6">
            <h1 className="font-jose text-2xl font-bold text-black">
              Hightech Window and Blinds
            </h1>
            {/* <input
              type="text"
              placeholder="Enter Email Address"
              className="rounded-l-sm px-2 py-1 text-sm"
            /> */}

            <div>
              <p className="text-sm text-subtext">Contact Info</p>
              <p className="text-sm text-subtext">
                15300 68 Ave unit 108, Surrey, BC V3S 2B9
              </p>
            </div>
          </div>
          <div className="space-y-5 ">
            <h3 className="font-jose text-black">Categories</h3>
            <ul className="space-y-4 text-sm text-subtext">
              <li>Zebra Blind</li>
              <li>California shutter</li>
              <li>Patio Solar Shades</li>
              <li>Honeycomb Blinds</li>
              <li>Faux-wood Blinds</li>
            </ul>
          </div>

          <div className="space-y-6 ">
            <h3 className="font-jose text-black">Customer Care</h3>
            <ul className="space-y-4 text-sm text-subtext">
              <li>My Account</li>
              <li>Discount</li>
              <li>Return</li>
              <li>Order History</li>
              <li>order Tracking</li>
            </ul>
          </div>
          <div className="space-y-6 ">
            <h3 className="font-jose text-black">Pages</h3>
            <ul className="space-y-4 text-sm text-subtext">
              <li>Blog</li>
              <li>Browser the Shop</li>
              <li>Category</li>
              <li>Pre-Built Pages</li>
              <li>Visual Composer Elements</li>
              <li>WooCommerce Pages</li>
            </ul>
          </div>
        </div>
      </div>
      <div className="flex items-center justify-around bg-[#e7e4f8] py-4">
        <div className="flex gap-4">
          <FaFacebook size={25} />
          <FaInstagram size={25} />
          <AiFillTwitterCircle size={25} />
        </div>
      </div>
    </footer>
  );
};

export default Footer;
