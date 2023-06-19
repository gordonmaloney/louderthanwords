import React, { useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import axios from "axios";
//routes
import { Landing } from "./Pages/Landing/Landing";
import { Create } from "./Pages/Create/Create";
import { Campaign } from "./Pages/Campaign/Campaign";
import { Home } from "./Pages/Home/Home";

//other components
import { Header } from "./Components/Header";
import { Footer } from "./Components/Footer";
import { PrivacyPolicy } from "./Pages/Misc/PrivacyPolicy";
import { TermsOfService } from "./Pages/Misc/TermsOfService";
import { Partner } from "./Pages/Misc/Partner";
import { CampaignFrame } from "./Pages/Campaign/CampaignFrame";
import { DonationPolicy } from "./Pages/Misc/DonationPolicy";
import { ViewCampaigns } from "./Pages/Misc/ViewCampaigns";
import { ManageLanding } from "./Pages/Manage/ManageLanding";
import { Donate } from "./Pages/Misc/Donate";
import { Contact } from "./Pages/Misc/Contact";
import { FAQ } from "./Pages/Misc/FAQ";
import { RunCampaign } from "./Pages/Misc/RunCampaign";
import { API_URL } from "./API";
import { ConfirmDeleteLanding } from "./Pages/Manage/ConfirmDeleteLanding";
import { Helmet } from "react-helmet";

const App = () => {
  useEffect(() => {
    const trackVisitor = async () => {
      try {
        const response = await axios.post(API_URL + "analytics/trackVisitor", {
          ipAddress: "", // Leave this empty, as it will be filled on the server-side
          userAgent: navigator.userAgent, // Use the user agent string from the browser
        });
        console.log("Visitor tracked successfully");
      } catch (error) {
        console.error("Error tracking visitor:", error);
      }
    };

    trackVisitor();
  }, []);

  return (
    <>
        <Helmet>
          <title>Louder Than Words</title>
          <meta name="description" content="Demand action - make impact" />
        </Helmet>
        <BrowserRouter>
          <Header />

          <Routes>
            <Route path="/" element={<Landing />} />

            <Route path="/home" exact element={<Home />} />

            <Route path="/contact" exact element={<Contact />} />
            <Route path="/donate" exact element={<Donate />} />
            <Route path="/faq" exact element={<FAQ />} />
            <Route path="/runcampaign" exact element={<RunCampaign />} />
            <Route path="/create" exact element={<Create />} />
            <Route path="/donationpolicy" exact element={<DonationPolicy />} />
            <Route path="/privacypolicy" exact element={<PrivacyPolicy />} />
            <Route path="/partner" exact element={<Partner />} />
            <Route path="/managecampaign" exact element={<ManageLanding />} />
            <Route path="/termsofservice" exact element={<TermsOfService />} />
            <Route path="/campaigns" exact element={<ViewCampaigns />} />
            <Route path="/:campaignId" element={<CampaignFrame />} />
            <Route
              path="/deletedsuccessfully"
              element={<ConfirmDeleteLanding />}
            />
            <Route
              path="/:campaignId/edit"
              element={<>{console.log("edit campaign...")}</>}
            />
          </Routes>

          <Footer />
        </BrowserRouter>{" "}
    </>
  );
};

export default App;
