import SharedBanner from "../../shares/SharedBanner";
import Ellipse1 from "/assets/accessories/Ellipse44.png";
import Ellipse2 from "/assets/accessories/Ellipse45.png";
import Ellipse3 from "/assets/accessories/Ellipse46.png";
import Ellipse4 from "/assets/accessories/Group97.png";
import Ellipse5 from "/assets/accessories/Group94.png";
import AboutUs from "/assets/accessories/aboutus.png";
import ActionButton from "../../shares/ActionButton";

const Contact = () => {
  return (
    <section className=" pt-10 md:pt-20">
      <SharedBanner>Contact Us</SharedBanner>
      <div className="p-10  md:p-20">
        <div className="flex flex-col md:flex-row">
          <div className="flex w-[50%] flex-col space-y-3">
            <h1 className="font-jose text-2xl font-extrabold">
              Information About us
            </h1>
            <p className="w-[350px] text-sm text-subtext md:w-[500px]">
              At <b>Hightech Window and Blinds</b>, we are committed to
              transforming spaces with premium blinds. With a focus on
              innovation and quality, our zebra blinds redefine window
              treatments, seamlessly blending style and functionality. As your
              go-to blind bliss destination, we take pride in delivering
              tailored solutions for modern living, enhancing privacy and
              natural lighting with every installation.
            </p>
            <img src={Ellipse5} alt="ecllipse" className="w-10" />
          </div>

          <div className="flex  flex-col gap-5 pt-5 md:w-[50%]">
            <h1 className="font-jose text-2xl font-extrabold">Contact Way</h1>
            {/* first rows */}
            <div className="flex gap-3 md:gap-5">
              <div className=" flex flex-row gap-3 ">
                <div className="w-8">
                  <img src={Ellipse1} alt="ecllipse" />
                </div>

                <div className=" text-sm text-subtext">
                  <p>Tel: (+1-6043601483)</p>
                  <p>E-Mail: info@hitechwindowandblinds.com</p>
                </div>
              </div>

              <div className=" flex flex-row gap-3 ">
                <div className="w-8">
                  <img src={Ellipse2} alt="ecllipse" />
                </div>

                <div className="text-sm text-subtext">
                  <p>
                    Support Forum <br />
                    For over 24hr
                  </p>
                </div>
              </div>
            </div>
            {/* second row */}
            <div className="flex gap-3 md:gap-5">
              <div className=" flex flex-row gap-3 ">
                <div className="w-8">
                  <img src={Ellipse3} alt="ecllipse" />
                </div>

                <div className="text-sm text-subtext">
                  <p>
                    Hightech Window and Blinds. <br />
                    15300 68 Ave unit 108, Surrey, BC V3S 2B9
                  </p>
                </div>
              </div>

              <div className="flex flex-row gap-3 ">
                <div className="w-8">
                  <img src={Ellipse4} alt="ecllipse" className="w-full" />
                </div>

                <div className=" text-sm text-subtext">
                  <p>
                    Free standard shipping <br />
                    on all orders.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-10 md:mt-20">
          <div className="flex flex-col md:flex-row">
            <div className=" space-y-4 md:w-[50%]">
              <h1 className="font-jose text-2xl font-extrabold">
                Get In Touch
              </h1>
              <p className="w-[500px] text-sm text-subtext md:w-[600px]">
                Discover the perfect blinds for your space. Contact us for
                personalized solutions that elevate your home's style and
                functionality.
              </p>

              {/* form */}
              <form className="space-y-6 pt-7">
                <div className="flex gap-4">
                  <input
                    type="text"
                    name="name"
                    placeholder="Your Name*"
                    className="w-full border-2 p-2 text-sm"
                  />
                  <input
                    type="email"
                    name="name"
                    placeholder="Your E-mail"
                    className="w-full border-2 p-2 text-sm"
                  />
                </div>
                <input
                  type="text"
                  name="name"
                  placeholder="Subject*"
                  className="w-full border-2 p-2 text-sm"
                />
                <textarea
                  name="Type Your Messages"
                  placeholder="Type Your Messages"
                  id=""
                  cols="10"
                  rows="6"
                  className="w-full border-2 p-2 text-sm"
                />
                <ActionButton>Send Mail</ActionButton>
              </form>
            </div>

            <div className="flex items-center justify-center pt-5 md:w-[50%]">
              <img src={AboutUs} alt="aboutus" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
