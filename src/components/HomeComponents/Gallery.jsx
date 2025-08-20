import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaHeart } from "react-icons/fa";

const galleryItems = [
  {
    id: 1,
    imageUrl: "https://www.adventisthealthcare.com/app/files/public/c4ad4837-b4f0-4659-a284-acceb6ff2b90/Content%20Hub/blood%20donation.jpg",
    title: "Blood Donation at Dhaka Medical College",
  },
  {
    id: 2,
    imageUrl: "https://nhsbtdbe.blob.core.windows.net/umbraco-assets-corp/23774/nhsbt-blood-transfusion-image-2.jpg",
    title: "Free Blood Grouping, Chattogram",
  },
  {
    id: 3,
    imageUrl: "https://media.sciencephoto.com/image/m5800298/800wm/M5800298.jpg",
    title: "Sylhet University Blood Camp",
  },
  {
    id: 4,
    imageUrl: "https://www.redcross.org/content/dam/redcross/about-us/news/2021/world_cancer_day.jpg.transform/1288/q70/feature/image.jpeg",
    title: "Barisal Thalassemia Support",
  },
  {
    id: 5,
    imageUrl: "https://tmckolkata.com/in/wp-content/uploads/2021/06/blood_donation2.jpg",
    title: "Blood Drive at Rajshahi Sadar",
  },
  {
    id: 6,
    imageUrl: "https://www.punjabnewsexpress.com/images/article/article259485.jpg",
    title: "Jessore District Hospital Event",
  },
  {
    id: 7,
    imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTpSdzz9YJ3lREmVYyoE4ytXmZ3pMPhK_8blXJahM29ZsmIJTCIMjhLWRdSWZQhgvjc-sg&usqp=CAU",
    title: "Comilla Sadar Blood Camp",
  },
  {
    id: 8,
    imageUrl: "https://media.post.rvohealth.io/wp-content/uploads/sites/3/2020/06/GettyImages-2873802_thumb-732x549.jpg",
    title: "Kushtia Blood Donation Day",
  },
  {
    id: 9,
    imageUrl: "https://www.universityhealthalliance.com/wp-content/uploads/2023/06/blog2.jpg",
    title: "Mymensingh Donor Gathering",
  },
  {
    id: 10,
    imageUrl: "https://www.economist.com/cdn-cgi/image/width=1424,quality=80,format=auto/sites/default/files/20180324_CNP002.jpg",
    title: "Blood Grouping, Narayanganj",
  },
  {
    id: 11,
    imageUrl: "https://atm273446-s3user.vcos.cloudstorage.com.vn/dhdainam/asset/asset/fixed/2(13).jpg",
    title: "Khulna Volunteer Day",
  },
  {
    id: 12,
    imageUrl: "https://magazine.unison.org.uk/content/uploads/sites/53/2023/03/bigstock-Close-Up-Of-Nurse-Adjusting-Bl-455051663-745x420.jpg",
    title: "Sylhet Night Blood Camp",
  },
];

const HeartIcon = () => (
  <FaHeart className="h-5 w-5 text-white group-hover:text-pink-500 transition-colors" />
);

const GridItem = ({ item }) => {
  const [isHovered, setIsHovered] = useState(false);
  return (
    <motion.div
      className="mb-4 break-inside-avoid relative cursor-pointer"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      whileHover={{ y: -5 }}
      transition={{ type: "spring", stiffness: 300 }}
    >
      <img
        src={item.imageUrl}
        alt={item.title}
        className="w-full h-auto rounded-xl shadow-lg"
        onError={e => {
          const target = e.target;
          target.onerror = null;
          target.src = "https://placehold.co/400x300/fecaca/333333?text=Image+Not+Found";
        }}
      />
      <AnimatePresence>
        {isHovered && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent rounded-xl"
          >
            <div className="p-4 h-full flex flex-col justify-between">
              <div className="flex justify-start gap-3">
                <motion.button whileHover={{ scale: 1.1 }} className="p-2 bg-black/30 rounded-lg backdrop-blur-sm group">
                  <HeartIcon />
                </motion.button>
              </div>
              <p className="text-white font-bold text-base truncate">{item.title}</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

const MasonryGrid = ({ items }) => (
  <div className="columns-1 gap-6 sm:columns-2 lg:columns-3 xl:columns-4" style={{ columnWidth: "280px" }}>
    {items.map(item => <GridItem key={item.id} item={item} />)}
  </div>
);

export default function Gallery() {
  return (
    <section className=" transition-colors py-16 bg-[#FFE8E8]/20 dark:bg-[#0F172A]">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h2 className="text-3xl md:text-4xl text-center font-extrabold text-[#BB2B29] dark:text-[#FFE8E8] mb-2">
          Blood Donation Gallery
        </h2>
        <p className="mb-8 text-center text-[#530404] dark:text-[#FFE8E8]/80 text-lg">
          Explore moments from our recent blood donation campaigns and community events across Bangladesh.
        </p>
        <main>
          <MasonryGrid items={galleryItems} />
        </main>
      </div>
    </section>
  );
}