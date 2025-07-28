import { 
  FaHeart, 
  FaTwitter, 
  FaFacebook, 
  FaInstagram, 
  FaLinkedin 
} from 'react-icons/fa';
import Lottie from "lottie-react";
import BloodDrop from "../../assets/BloodDrop.json";
import { Link } from 'react-router';

const Footer = () => {
  return (
    <footer className="bg-gradient-to-b from-[#530404]/80 to-[#FFE8E8] dark:from-[#0F172A] dark:to-[#000000] text-white py-12">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center md:items-start gap-4 md:gap-8">
          {/* Logo Section */}
          <div className="col-span-1 md:col-span-1 ">
            <Link
          to="/"
          className="flex items-center justify-center "
        >
          <Lottie
            animationData={BloodDrop}
            loop={true}
            style={{ width: "70px", height: "70px" }}
            aria-label="Blood Drop Logo"
          />
          <span
            className="bg-white bg-clip-text text-transparent font-extrabold text-xl lg:text-3xl tracking-tight text-center"
          >
            BloodCenter
          </span>
        </Link>
            
          </div>

          {/* Company Section */}
          <div>
            <h6 className="font-bold text-lg mb-2 text-center">Company</h6>
            <ul className=" flex md:flex-col gap-4 md:gap-2">
              <li>
                <a href="/" className="hover:text-[#530404] dark:hover:text-[#ff4444] transition-colors">
                  Home
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-[#530404] dark:hover:text-[#ff4444] transition-colors">
                    Contact Us
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-[#530404] dark:hover:text-[#ff4444] transition-colors">
                  Blog
                </a>
              </li>
              <li>
                <a href="/dashboard" className="hover:text-[#530404] dark:hover:text-[#ff4444] transition-colors">
                  Dashboard
                </a>
              </li>
            </ul>
          </div>

          {/* Legal Section */}
          <div>
            <h6 className="font-bold text-lg mb-2 text-center">Legal</h6>
            <ul className="flex md:flex-col gap-4 md:gap-2">
              <li>
                <a href="#" className="hover:text-[#530404] dark:hover:text-[#ff4444] transition-colors">
                  Terms of Use
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-[#530404] dark:hover:text-[#ff4444] transition-colors">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-[#530404] dark:hover:text-[#ff4444] transition-colors">
                  Cookie Policy
                </a>
              </li>
            </ul>
          </div>

          {/* Social Section */}
          <div>
            <h6 className="font-bold text-lg mb-2 text-center">Social</h6>
            <div className="flex gap-4 ">
              <a href="#" className="hover:text-[#530404] dark:hover:text-[#ff4444] transition-colors">
                <FaTwitter className="text-white text-2xl hover:text-[#530404] dark:hover:text-[#ff4444]" />
              </a>
              <a href="#" className="hover:text-[#530404] dark:hover:text-[#ff4444] transition-colors">
                <FaFacebook className="text-white text-2xl hover:text-[#530404] dark:hover:text-[#ff4444]" />
              </a>
              <a href="#" className="hover:text-[#530404] dark:hover:text-[#ff4444] transition-colors">
                <FaInstagram className="text-white text-2xl hover:text-[#530404] dark:hover:text-[#ff4444]" />
              </a>
              <a href="#" className="hover:text-[#530404] dark:hover:text-[#ff4444] transition-colors">
                <FaLinkedin className="text-white text-2xl hover:text-[#530404] dark:hover:text-[#ff4444]" />
              </a>
            </div>
          </div>
        </div>
        
        {/* Copyright Bar */}
        <div className="mt-12 pt-6 border-t border-[#530404]/20 dark:border-white/20 text-center text-sm">
          <p>&copy; {new Date().getFullYear()} BloodDonate. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;