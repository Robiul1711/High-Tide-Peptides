import { Helmet } from "react-helmet-async";
import ContactUs from "../../components/ContactComponent/ContactUs";
import LegalDisclaimer from "../../components/HomeComponents/LegalDisclaimer";

const Contact = () => {
  return (
    <div>
      {/* ========== SEO for Contact Page ========== */}
      <Helmet>
        <title>Contact Us | Peptide Support & Inquiries</title>

        <meta
          name="description"
          content="Get in touch with our support team for peptide inquiries, order assistance, and research product questions. We're here to help with fast and reliable customer service."
        />

        <meta 
          property="og:title" 
          content="Contact Us | Peptide Support & Inquiries" 
        />
        <meta
          property="og:description"
          content="Reach out to our team for questions about research peptides, orders, shipping, or product details. Fast and reliable customer support."
        />

        <meta property="og:type" content="website" />
      </Helmet>
      {/* =========================================== */}

      <ContactUs />
      <LegalDisclaimer />
    </div>
  );
};

export default Contact;
