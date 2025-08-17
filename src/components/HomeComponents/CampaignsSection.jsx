import { FaCalendarAlt, FaMapMarkerAlt, FaClock } from "react-icons/fa";

const campaigns = [
  {
    img: "https://i.ibb.co.com/Kc1p1WYq/blood.jpg",
    date: "12 March, 2022",
    title: "Opening Donation Day",
    desc: "Free blood group testing, donor registration, and awareness seminar for new donors. Over 100 units of blood collected for Dhaka hospitals.",
    time: "10:00 - 15:00",
    location: "Dhanmondi, Dhaka",
  },
  {
    img: "https://i.ibb.co.com/BKP4SF4n/66442e95ece08490653381.jpg",
    date: "18 July, 2023",
    title: "Free Group Checking",
    desc: "Free blood group and hemoglobin checkup for all visitors. Health counseling and refreshments provided to all participants.",
    time: "09:00 - 13:00",
    location: "Chawkbazar, Chattogram",
  },
  {
    img: "https://i.ibb.co.com/G4xzFP7d/82f00103b9ed-MR-Blood-Donation-2024.jpg",
    date: "5 November, 2024",
    title: "Blood Group Collection",
    desc: "Mobile blood collection van at Zindabazar. Over 80 donors participated. Certificates and T-shirts given to all donors.",
    time: "11:00 - 16:00",
    location: "Zindabazar, Sylhet",
  },
  {
    img: "https://i.ibb.co.com/6cSwWkj2/353314-hienmau.jpg",
    date: "22 January, 2025",
    title: "Blood Donation Camp",
    desc: "Special camp for thalassemia and cancer patients. On-site doctor consultation and free snacks for all donors.",
    time: "10:00 - 14:00",
    location: "Sher-e-Bangla Medical, Barisal",
  },
];

const CampaignsSection = () => (
  <section className="py-16 bg-[#FFE8E8]/20 dark:bg-[#0F172A]">
    <div className="max-w-11/12 mx-auto px-4">
      <h2 className="text-4xl md:text-4xl font-extrabold text-center text-[#BB2B29] dark:text-[#FFE8E8] mb-2">
        ALL CAMPAIGNS
      </h2>
      <p className="text-[#530404] text-center dark:text-[#FFE8E8]/80 mb-10 text-lg">
        See our recent blood donation campaigns and the services we provided to communities across Bangladesh.
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {campaigns.map((c, idx) => (
          <div
            key={idx}
            className="bg-white dark:bg-[#273a57] rounded-2xl shadow-lg flex flex-col md:flex-row overflow-hidden"
          >
            <img
              src={c.img}
              alt={c.title}
              className="w-full md:w-48 h-48 object-cover"
            />
            <div className="flex-1 p-6 flex flex-col">
              <div className="flex items-center gap-2 text-[#E53935] dark:text-[#FFE8E8] mb-2">
                <FaCalendarAlt /> <span className="text-sm">{c.date}</span>
              </div>
              <h3 className="text-xl font-bold text-[#BB2B29] dark:text-[#FFE8E8] mb-2">{c.title}</h3>
              <p className="text-[#530404] dark:text-[#FFE8E8]/80 mb-4 flex-1">{c.desc}</p>
              <div className="flex items-center gap-4 text-[#530404] dark:text-[#FFE8E8] text-sm mt-auto">
                <span className="flex items-center gap-1">
                  <FaClock /> {c.time}
                </span>
                <span className="flex items-center gap-1">
                  <FaMapMarkerAlt /> {c.location}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default CampaignsSection;