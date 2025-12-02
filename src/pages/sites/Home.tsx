import Banner from "../../components/HomeComponents/Banner";
import FeaturedMedicines from "../../components/HomeComponents/FeaturedMedicines";
import LegalDisclaimer from "../../components/HomeComponents/LegalDisclaimer";
import Research from "../../components/HomeComponents/Research";

const Home = () => {
  return (
<div>
  <Banner />
  <Research />
  <FeaturedMedicines />
  <LegalDisclaimer />
</div>
  );
};

export default Home;
