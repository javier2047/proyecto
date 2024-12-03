import Header from "@components/dashboard/layout/Header";
import Footer from "@components/dashboard/layout/Footer";
import SideBar from "./SideBar";

export default function Layout({ children }) {
  return (
    <div className="d-flex flex-column min-vh-">
      <Header />
      <div className="d-flex flex-grow-1">
        <SideBar />
        <main className="container-fluid flex-grow-1 p-4 mt-4">{children}</main>
      </div>
      <Footer />
    </div>
  );
}
