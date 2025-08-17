import Banner from "../../components/HomeComponents/Banner";
import ContactUs from "../../components/HomeComponents/ContactUs";
import Features from "../../components/HomeComponents/features";
import LiveStats from "../../components/HomeComponents/LiveStats";

const Home = () => {
  return (
    <>
      <Banner></Banner>
      <Features></Features>
      <LiveStats></LiveStats>
      <ContactUs></ContactUs>
    </>
  );
};

export default Home;
