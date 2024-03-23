import { FaFacebook, FaInstagram } from "react-icons/fa";
import { AiFillTwitterCircle } from "react-icons/ai";
import { useNavigate } from "react-router-dom";

const Footer = () => {
  const navigate = useNavigate();
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
                +1-6043601483
                <br/>
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

          {/* <div className="space-y-6 ">
            <h3 className="font-jose text-black">Customer Care</h3>
            <ul className="space-y-4 text-sm text-subtext">
              <li>My Account</li>
              <li>Discount</li>
              <li>Return</li>
              <li>Order History</li>
              <li>order Tracking</li>
            </ul>
          </div> */}
          <div className="space-y-6 ">
            <h3 className="font-jose text-black">Pages</h3>
            <ul className="space-y-4 text-sm text-subtext">
              <li
                onClick={() => {
                  navigate("/");
                }}
              >
                Home
              </li>
              <li
                onClick={() => {
                  navigate("/pages/grid");
                }}
              >
                Browser the Shop
              </li>
              <li
                onClick={() => {
                  navigate("/company/about-us");
                }}
              >
                About Us
              </li>
              <li
                onClick={() => {
                  navigate("/company/contact");
                }}
              >
                Contact Us
              </li>
              <li
                onClick={() => {
                  navigate("/company/faq");
                }}
              >
                FAQ
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div className="items-left ml-10 flex bg-[#e7e4f8] py-4">
        <div className="flex gap-4">
          <FaFacebook size={25} />
          <FaInstagram size={25} />
          <AiFillTwitterCircle size={25} />
        </div>
        <div className="ml-10 mt-2 gap-4 font-jose text-black">
          Powerd By Omnitrics
        </div>
      </div>
    </footer>
  );
};

export default Footer;
