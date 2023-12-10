import { Link } from "react-router-dom";
import TopAppBar from "../lib/TopAppBar";
import logo from "/logo-gray.png";
import gif from "/SDG12.gif";

const About = () => {
  return (
    <>
      <TopAppBar>About Us</TopAppBar>
      <div className="m-auto w-4/5 md:max-w-full md:mx-auto">
        <header className="my-6 text-center md:mx-auto">
          <img src={logo} alt="Company Logo" className="w-32 mx-auto" />
          <h3 className="text-lg text-center mt-4">
            Reducing waste generation through reuse
          </h3>
        </header>

        <div className="md:flex md:gap-10">
          <div className="md:flex-1">
            <section className="my-4">
              <h3 className="text-xl font-bold">About Us</h3>
              <p>
                We are an online platform that connects people who have household
                items to loan with those who want to borrow them.
              </p>
            </section>

            <section>
              <h3 className="text-xl font-bold">Our Mission</h3>
              <p>
                Our mission is to contribute to the UN's 2030 Agenda, specifically
                <Link
                  className="decoration-solid"
                  to="https://sdgs.un.org/goals/goal12"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {" "}
                  SDG Goal 12{" "}
                </Link>
                for Responsible Consumption and Production by "reducing waste
                generation through prevention, reduction, recycling and reuse."
              </p>
            </section>
          </div>

          <div className="w-2/4 my-4 m-auto md:flex-1">
            <img src={gif} alt="SDG 12 GIF" className="w-full" />
          </div>
        </div>
      </div>
    </>
  );
};

export default About;
