import Banner from "../../components/HomeComponents/Banner";
import CampaignsSection from "../../components/HomeComponents/CampaignsSection";
import ContactUs from "../../components/HomeComponents/ContactUs";
import FAQSection from "../../components/HomeComponents/FAQSection";
import Features from "../../components/HomeComponents/features";
import Gallery from "../../components/HomeComponents/Gallery";
import HomeDonationRequestForm from "../../components/HomeComponents/HomeDonationRequestForm";
import LiveStats from "../../components/HomeComponents/LiveStats";

const Home = () => {
  return (
    <>
      <Banner></Banner>
      <Features></Features>
      <LiveStats></LiveStats>
      <Gallery></Gallery>
      <HomeDonationRequestForm></HomeDonationRequestForm>
      <CampaignsSection></CampaignsSection>
      <FAQSection></FAQSection>
      <ContactUs></ContactUs>
    </>
  );
};

export default Home;
