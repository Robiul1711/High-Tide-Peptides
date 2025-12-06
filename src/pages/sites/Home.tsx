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
      <Banner bannerData={bannerData} titleData={titleData} />
      <Research heroData={heroData} />
      <FeaturedMedicines />
      <LegalDisclaimer  />
    </>
  );
};

export default Home;
