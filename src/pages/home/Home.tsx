import HeroSection from "@/components/Hero";
import TakeawaySection from "@/components/TakeAway";
import phoneImgOne from "@/assets/food-mockup.jpg";
import phoneiImgTwo from "@/assets/burger.jpg";
const Home = () => {
  return (
    <div>
      <HeroSection />
      <TakeawaySection phoneImage={phoneImgOne} phoneImage2={phoneiImgTwo} />
    </div>
  );
};

export default Home;
