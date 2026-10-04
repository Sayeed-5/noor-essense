import { useEffect } from "react";
import Navbar from "../components/Navbar";
import Collection from "../components/Collection";
import Footer from "../components/Footer";

export default function CollectionPage() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <Navbar />
      <main style={{ paddingTop: "60px" }}>
        <Collection featuredOnly={false} />
      </main>
      <Footer />
    </>
  );
}
