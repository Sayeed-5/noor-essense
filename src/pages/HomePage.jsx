import Navbar         from "../components/Navbar";
import Hero            from "../components/Hero";
import FragranceStory  from "../components/FragranceStory";
import Principles      from "../components/Principles";
import OurStory        from "../components/OurStory";
import Collection      from "../components/Collection";
import NewArrivals     from "../components/NewArrivals";
import SignatureScent  from "../components/SignatureScent";
import Footer          from "../components/Footer";

export default function HomePage() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <FragranceStory />
        <Principles />
        <OurStory />
        <Collection featuredOnly={true} />
        <NewArrivals />
        <SignatureScent />
      </main>
      <Footer />
    </>
  );
}
