import { useState } from "react";
import { FaUserPlus, FaTint, FaHospitalAlt, FaRegClock, FaUserCheck, FaMapMarkerAlt, FaEnvelopeOpenText, FaShieldAlt } from "react-icons/fa";
import { ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const faqData = [
  {
    icon: <FaUserPlus size={20} className="text-[#BB2B29]" />,
    question: "How do I register as a blood donor?",
    answer: 'Click the "Join as a Donor" button on the home page or go to the registration page. Fill in your details, select your blood group, district, and upazila, and upload your avatar. Registration is quick and easy!',
  },
  {
    icon: <FaTint size={20} className="text-[#BB2B29]" />,
    question: "How can I request blood?",
    answer: "After logging in, go to the dashboard and click on 'Create Donation Request'. Fill in the recipient's details, hospital, and reason for the request. Your request will be visible to all eligible donors.",
  },
  {
    icon: <FaHospitalAlt size={20} className="text-[#BB2B29]" />,
    question: "Can I donate blood if I have a medical condition?",
    answer: "Some medical conditions may prevent you from donating blood. Please consult with your doctor or check our eligibility guidelines before registering as a donor.",
  },
  {
    icon: <FaRegClock size={20} className="text-[#BB2B29]" />,
    question: "How often can I donate blood?",
    answer: "You can donate whole blood every 3-4 months. For other types of donations, the interval may vary. Always ensure you are healthy and meet the eligibility criteria before donating.",
  },
  {
    icon: <FaUserCheck size={20} className="text-[#BB2B29]" />,
    question: "How do I know if my donation request is accepted?",
    answer: "You will receive a notification and see the status change in your dashboard when a donor confirms your request. The donor's information will also be visible in the request details.",
  },
  {
    icon: <FaMapMarkerAlt size={20} className="text-[#BB2B29]" />,
    question: "How do I search for donors in my area?",
    answer: "Use the 'Search Donors' feature on the home page. Select the required blood group, district, and upazila to find available donors near you.",
  },
  {
    icon: <FaEnvelopeOpenText size={20} className="text-[#BB2B29]" />,
    question: "How can I contact support?",
    answer: "You can reach us via the contact form on the home page or email us at support@bloodcenter.com. Our team is here to help you 24/7.",
  },
  {
    icon: <FaShieldAlt size={20} className="text-[#BB2B29]" />,
    question: "Is my personal information safe?",
    answer: "Yes, we use secure authentication and encryption to protect your data. Your information is never shared without your consent.",
  },
];

const AccordionItem = ({ item, isOpen, onToggle, idx }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay: idx * 0.05 }}
    className="border-b border-[#ECAAA0] dark:border-[#BB2B29] last:border-b-0"
  >
    <button
      className="flex items-center justify-between w-full p-4 text-left focus:outline-none hover:bg-[#FFE8E8]/60 dark:hover:bg-[#530404]/30 transition-colors"
      onClick={onToggle}
    >
      <div className="flex items-center space-x-4">
        {item.icon}
        <span className="text-base font-medium text-[#530404] dark:text-[#FFE8E8]">
          {item.question}
        </span>
      </div>
      <ChevronDown
        size={20}
        className={`transition-transform duration-300 text-[#BB2B29] dark:text-[#FFE8E8] ${isOpen ? "rotate-180" : ""}`}
      />
    </button>
    <div
      className={`overflow-hidden transition-all duration-300 ease-in-out ${isOpen ? "max-h-96" : "max-h-0"}`}
    >
      <div className="p-4 pl-12">
        <p className="text-[#530404] dark:text-[#FFE8E8]/80">{item.answer}</p>
      </div>
    </div>
  </motion.div>
);

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState(null);
  const handleToggle = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };
  return (
    <motion.section
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, ease: "easeOut" }}
      viewport={{ once: true }}
      className="flex items-center justify-center py-16 bg-[#FFE8E8]/20 dark:bg-[#0F172A]"
    >
      <div className="w-full max-w-5xl mx-auto">
        <div className="p-4">
          <h1 className="text-3xl md:text-4xl font-extrabold text-center text-[#BB2B29] dark:text-[#FFE8E8] mb-2">
            Frequently Asked Questions
          </h1>
          <p className="text-center text-[#530404] dark:text-[#FFE8E8]/80 mb-8 text-lg">
            Everything you need to know about blood donation, requests, and using Blood Center.
          </p>
          <div className="border border-[#ECAAA0] dark:border-[#BB2B29] rounded-lg bg-white/80 dark:bg-[#273a57]/60 shadow-lg">
            {faqData.map((item, index) => (
              <AccordionItem
                key={index}
                item={item}
                isOpen={openIndex === index}
                onToggle={() => handleToggle(index)}
                idx={index}
              />
            ))}
          </div>
        </div>
      </div>
    </motion.section>
  );
}