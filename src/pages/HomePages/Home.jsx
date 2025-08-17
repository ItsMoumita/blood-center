import Banner from "../../components/HomeComponents/Banner";
import ContactUs from "../../components/HomeComponents/ContactUs";
import Features from "../../components/HomeComponents/features";
import HomeDonationRequestForm from "../../components/HomeComponents/HomeDonationRequestForm";
import LiveStats from "../../components/HomeComponents/LiveStats";

const Home = () => {
  return (
    <>
      <Banner></Banner>
      <Features></Features>
      <LiveStats></LiveStats>
      <HomeDonationRequestForm></HomeDonationRequestForm>
      <ContactUs></ContactUs>
    </>
  );
};

export default Home;
