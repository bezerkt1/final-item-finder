// info page explaining the company's mission
// tie into Agenda 2030
import logo from "/lendify.png";
import gif from "/SDG12.gif";

const About = () => {
  return (
    <div className="m-auto w-4/5 md:w-2/4 lg:w-1/4">
      <header className="my-6">
        <img src={logo} />
        <h3 className="text-l text-center">Reducing waste generation through reuse</h3>  
      </header>

      <section className="my-4">
        <h3 className="text-xl font-bold">About Us</h3>
        <p>We are an online platform that connects people who have household 
          items to loan with those who want to borrow them.
        </p>
      </section>

      <div className="w-2/4 my-4 m-auto">
        <img src={gif} />
      </div>

      <section>
        <h3 className="text-xl font-bold">Our Mission</h3>
        <p>Our mission is to contribute to the UN's 2030 Agenda, specifically SDG 
          Goal 12 for Responsible Consumption and Production by "reducing waste 
          generation through prevention, reduction, recycling and reuse."
        </p>
      </section>

     
    </div>
  );
};

export default About;

/*
Relevant SDG

12 Ensure sustainable consumption and production patterns
Target 12.5
By 2030, substantially reduce waste generation through prevention, reduction, recycling and reuse

*/