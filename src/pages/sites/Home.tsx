import { Helmet } from "react-helmet-async";
import Banner from "../../components/HomeComponents/Banner";
import FeaturedMedicines from "../../components/HomeComponents/FeaturedMedicines";
import LegalDisclaimer from "../../components/HomeComponents/LegalDisclaimer";
import Research from "../../components/HomeComponents/Research";
import useClient from "../../hooks/useClient";
const Home = () => {
  const { data } = useClient({
    queryKey: ["all-cms"],
    url: "/webpages/cms/get-all",
    isPrivate: false,
  });

  const cms = data?.data || [];

  const bannerData = cms.find((item: any) => item.section_in_page === "banner");
  const heroData = cms.find((item: any) => item.section_in_page === "hero");
  const titleData = cms.find((item: any) => item.section_in_page === "title");

  return (
    <>
      <Helmet>
        <title>Premium GMP-Certified Peptides | Pure, Raw Peptides</title>

        <meta
          name="description"
          content="Peptides crafted to the highest GMP standards. Manufactured in GMP-certified facilities for pure, consistent quality—no fillers, no buffers, just clean, raw peptides for research use."
        />

        <meta property="og:title" content="Premium GMP-Certified Peptides" />
        <meta
          property="og:description"
          content="Pure, raw peptides produced in GMP-certified facilities. No fillers, no buffers—just high-quality peptides for research applications."
        />
        <meta property="og:type" content="website" />
      </Helmet>

      <Banner bannerData={bannerData} titleData={titleData} />
      <Research heroData={heroData} />
      <FeaturedMedicines />
      <LegalDisclaimer />
    </>
  );
};

export default Home;
