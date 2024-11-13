import Header from "@components/dashboard/layout/Header";
import Footer from "@components/dashboard/layout/Footer";

export default function Layout({ children }) {
    return (
        <div className="d-flex flex-column min-vh-100">
            <Header />
            <main className="container-fluid flex-grow-1 p-4">
                {children}
            </main>
            <Footer />
        </div>
    );
}
