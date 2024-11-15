// import Footer from "./Footer/Footer";
// import Header from "./Header/Header";

// const MainLayout = ({ children }) => {
//   return (
//     <>
//       <Header />
//       <main>{children}</main>
//       <Footer />
//     </>
//   );
// };

import Header from "./Header/Header";
import FooterWithSocialLinks from "./Footer/Footer";

const MainLayout = ({ children }) => {
  return (
    <div className="main-layout">
      <Header />
      <main>{children}</main>
      <FooterWithSocialLinks />
      <FooterWithSocialLinks />
    </div>
  );
};

export default MainLayout;
