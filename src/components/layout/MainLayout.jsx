import BannersCarousel from "../utils/BannersCarousel/BannersCaoursel";
import Footer from "./Footer";
import Header from "./Header";

const MainLayout = ({ children }) => {
  return (
    <>
      <Header />
      <BannersCarousel />
      <main>{children}</main>

      <Footer />
    </>
  );
};

export default MainLayout;
