import { Outlet } from "react-router";
import Header from "../components/HomeComponents/Header";
import Footer from "../components/HomeComponents/Footer";

const RootLayout = () => {
  return (
    <div >
      <Header></Header>
      <main className="overflow-x-clip">
        <Outlet></Outlet>
      </main>
      <Footer></Footer>
    </div>
  );
};

export default RootLayout;
