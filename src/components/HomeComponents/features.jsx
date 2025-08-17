import { 
  FaHandHoldingMedical, 
  FaUserClock, 
  FaHospital,
  FaMapMarkedAlt, 
  FaMobileAlt,
  FaUserShield 
} from 'react-icons/fa';

const Features = () => {
  const features = [
    {
      icon: <FaHandHoldingMedical />,
      title: "Quick Blood Matching",
      description: "Find compatible blood donors quickly in emergency situations"
    },
    {
      icon: <FaUserClock />,
      title: "24/7 Availability",
      description: "Round-the-clock support for urgent blood requirements"
    },
    {
      icon: <FaHospital />,
      title: "Hospital Network",
      description: "Connected with major hospitals and blood banks"
    },
    {
      icon: <FaMapMarkedAlt />,
      title: "Nearby Donors",
      description: "Locate blood donors in your vicinity instantly"
    },
    {
      icon: <FaMobileAlt />,
      title: "Emergency Alerts",
      description: "Instant notifications for urgent blood requirements"
    },
    {
      icon: <FaUserShield />,
      title: "Verified Donors",
      description: "All donors are screened and verified for safety"
    }
  ];

  return (
    <section className="bg-[#FFE8E8]/20 dark:bg-[#0F172A] py-16">
      <div className="max-w-11/12 container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-[#BB2B29] dark:text-[#FFE8E8]/80 mb-4">
            Why Choose Our Platform?
          </h2>
          <p className="text-[#530404]/80 dark:text-gray-300 max-w-2xl mx-auto">
            We connect blood donors with those in need, making the process 
            simple, fast, and reliable.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div 
              key={index} 
              className="bg-white dark:bg-[#273a57] border-2 border-[#BB2B29] dark:border-[#FFE8E8] p-6 rounded-lg 
                       shadow-md hover:shadow-lg  hover:shadow-[#BB2B29]/20 dark:hover:shadow-[#FFE8E8]/20 hover:scale-105
                       transition-all duration-300"
            >
              <div className="text-[#BB2B29] dark:text-[#FFE8E8] text-4xl mb-4">
                {feature.icon}
              </div>
              <h3 className="text-xl font-semibold mb-3 text-[#530404] dark:text-[#FFE8E8]">
                {feature.title}
              </h3>
              <p className="text-[#530404]/70 dark:text-[#FFE8E8]/80">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;