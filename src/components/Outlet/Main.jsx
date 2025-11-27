import Navbar from "../../components/Layout/Navbar";
import Footer from "../../components/Layout/Footer";
import { Outlet } from "react-router-dom";

function Main() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />

      <main className="flex-grow">
        <Outlet />
      </main>

      <Footer />
    </div>
  );
}

export default Main;
