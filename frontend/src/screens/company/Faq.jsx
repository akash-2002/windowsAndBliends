import ActionButton from "../../shares/ActionButton";
import SharedBanner from "../../shares/SharedBanner";

const Faq = () => {
  return (
    <section className="pt-10 md:pt-20 ">
      <SharedBanner>FAQ</SharedBanner>
      <div className=" px-10  py-20 md:px-20">
        <div className=" w-[50%] space-y-10 pb-3">
          <h1 className="font-jose text-4xl font-bold">General Information</h1>
          <div className="w-[100%] space-y-4 leading-loose">
            <p className="font-jose text-sm font-bold">
              Why choose roller shades for interior decoration?
            </p>
            <p className="font-jose text-sm text-subtext">
              Roller shades offer an elegant and clean style, fitting well to
              windows with minimal fabric, and are available in various
              materials.
            </p>
          </div>
          <div className="w-[100%] space-y-4 leading-loose">
            <p className="font-jose text-sm font-bold text-blue">
              What sets roller blinds apart?
            </p>
            <p className="font-jose text-sm text-subtext">
              Roller blinds boast simplicity and versatility, complementing
              various designs. They are durable, flexible, and resistant, making
              them ideal for both homes and offices.
            </p>
          </div>
          <div className="w-[100%] space-y-4 leading-loose">
            <p className="font-jose text-sm font-bold text-blue">
              Advantages of roller blinds in light management?
            </p>
            <p className="font-jose text-sm text-subtext">
              Roller blinds allow precise control over light entry, offering
              flexibility based on the time of year and day. Choose blackout
              fabrics for complete privacy or translucent materials for enhanced
              natural lighting.
            </p>
          </div>
          <div className=" space-y-4 leading-loose">
            <p className="font-jose text-sm font-bold text-blue">
              What defines the style of roller blinds?
            </p>
            <p className="font-jose text-sm text-subtext">
              Roller blinds embody modernity, providing a minimalist and elegant
              style that aligns with contemporary trends, suitable for both
              residential and office spaces.
            </p>
          </div>
        </div>
        {/* form */}
        <center>
          <div className="flex flex-col bg-secondary md:flex-col">
            <h3 className="mt-10 px-10 font-jose text-xl font-bold">
              Ask a Question
            </h3>
            <form
              action=""
              className="flex flex-col space-y-6 px-10 py-10 md:h-[538px] md:w-[566px] "
            >
              <input
                type="text"
                name="name"
                placeholder="Your Name*"
                className="w-full border-2 p-2 text-sm"
              />
              <input
                type="text"
                name="subject"
                id="subject"
                placeholder="Subject*"
                className="w-full border-2 p-2 text-sm"
              />
              <textarea
                cols="10"
                rows="6"
                className="w-full border-2 p-2 text-sm"
                placeholder="Type Your Messages"
              />
              <ActionButton>Send Mail</ActionButton>
            </form>
          </div>
        </center>
      </div>
    </section>
  );
};

export default Faq;
