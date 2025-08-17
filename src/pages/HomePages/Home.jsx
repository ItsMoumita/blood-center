import Banner from "../../components/HomeComponents/Banner";
import ContactUs from "../../components/HomeComponents/ContactUs";
import FAQSection from "../../components/HomeComponents/FAQSection";
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
      <FAQSection></FAQSection>
      <ContactUs></ContactUs>
    </>
  );
};

export default Home;
