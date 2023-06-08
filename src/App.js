import React, { useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

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

import { Donate } from "./Pages/Misc/Donate";
import { Contact } from "./Pages/Misc/Contact";
import { FAQ } from "./Pages/Misc/FAQ";
import { RunCampaign } from "./Pages/Misc/RunCampaign";

const App = () => {
  return (
    <div className="pageContainer">
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
          <Route path="/termsofservice" exact element={<TermsOfService />} />
          <Route path="/campaigns" exact element={<ViewCampaigns />} />
          <Route path="/:campaignId" element={<CampaignFrame />} />
        </Routes>

        <Footer />
      </BrowserRouter>
    </div>
  );
};

export default App;
