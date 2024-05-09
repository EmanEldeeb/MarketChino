import { Outlet } from "react-router";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";

function Layout() {
  return (
    <>
      <Navbar></Navbar>
      <section className="bg-stone-100 px-8 py-4">
        <Outlet></Outlet>
      </section>
      <Footer></Footer>
    </>
  );
}

export default Layout;
