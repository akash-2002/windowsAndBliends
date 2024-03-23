import SharedBanner from "../../shares/SharedBanner";
import SharedText from "../../shares/SharedText";
import ActionButton from "../../shares/ActionButton";
import AboutUsImage from "/assets/about-us.png";
import Offers from "../../components/Offers";
import Slider from "../../components/Slider";

const AboutUs = () => {
  return (
    <section className="mt-10 overflow-hidden md:mt-20">
      <SharedBanner>About Us </SharedBanner>
      <div className="mx-auto mt-10 flex w-full flex-col items-center justify-center md:flex-row md:gap-5 md:px-20 md:py-20">
        <div className="mb-5 px-5 md:w-[50%]">
          <img
            src={AboutUsImage}
            alt="about-us"
            className="w-full object-contain"
          />
        </div>

        <div className="w-[50%] space-y-4">
          <h1 className="font-jose text-xl font-extrabold text-blue md:text-2xl">
            Know About Our Ecomerce <br /> Business, History
          </h1>
          <p className="text-xs leading-6 text-subtext md:text-sm">
            Our e-commerce journey began with a simple vision—to make quality
            products accessible to all. Founded on principles of transparency
            and customer satisfaction, we've evolved into a trusted online
            destination. With a history rooted in genuine service, we continue
            to strive for excellence, offering a seamless shopping experience
            for every customer.
          </p>
          <ActionButton>Contact us</ActionButton>
        </div>
      </div>

      <div className="mt-10 w-full md:px-20">
        <SharedText>Our Features</SharedText>
        <Offers />
      </div>

      <div className="w-full space-y-6 bg-[#fbfbff] p-10 md:px-20">
        <SharedText>Our Client Say!</SharedText>
        <Slider />
      </div>
    </section>
  );
};

export default AboutUs;
