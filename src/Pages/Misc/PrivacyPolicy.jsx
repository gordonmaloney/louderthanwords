import React from "react";
import useMediaQuery from "@mui/material/useMediaQuery";

export const PrivacyPolicy = () => {
  const Mobile = useMediaQuery("(max-width:900px)");

  return (
    <div style={{ width: Mobile ? "90%" : "70%", margin: "100px auto 250px auto" }}>
      <p>
        <h2 style={{fontFamily: "Fjalla One", margin: 0}}>Your Privacy</h2>
        <br />
        <br />
        At Louder Than Words, we are committed to protecting the privacy of our
        users. This Privacy Policy explains how we collect, use, and safeguard
        the information provided by users while accessing and using our campaign
        tool. We prioritize your privacy and ensure that the only data we store
        is the public-facing information you provide when creating a campaign.
        We do not store any personal data of users who participate in campaigns
        on our site. Please read this Privacy Policy carefully to understand our
        practices regarding your information.
        <br />
        <br />
        Information Collection and Use:
        <br />
        1.1 Campaign Creation: When you create a campaign on our platform, we
        collect and store the public-facing information you provide, such as
        campaign titles, descriptions, prompts, and any other details you choose
        to include. This information is used solely for the purpose of
        displaying and running your campaign effectively.
        <br />
        <br />
        Information Security:
        <br />
        2.1 Data Storage: We take strong measures to ensure the security of the
        information you provide. We store the public-facing campaign information
        in a secure and encrypted manner to protect it from unauthorized access
        or disclosure.
        <br />
        <br />
        2.2 User Data Protection: We do not collect, store, or retain any
        personal data of individuals who participate in campaigns on our site.
        We respect your privacy and ensure that your participation in campaigns
        remains anonymous and untraceable.
        <br />
        <br />
        Data Sharing:
        <br />
        3.1 Third-Party Services: We do not share or disclose any user
        information to third-party services, except for the public-facing
        campaign information that is necessary for the campaign to function
        effectively.
        <br />
        <br />
        Compliance with Laws:
        <br />
        4.1 Legal Requirements: We may disclose your information if required to
        do so by law or if we believe that such action is necessary to comply
        with legal obligations, protect our rights or the rights of others, or
        ensure the safety and security of our users.
        <br />
        <br />
        Amendments:
        <br />
        5.1 Policy Updates: We reserve the right to update or modify this
        Privacy Policy at any time. Any changes to the policy will be effective
        immediately upon posting the updated version on our website. It is your
        responsibility to review this Privacy Policy periodically to stay
        informed about any modifications.
        <br />
        <br />
        Contact Us:
        <br />
        6.1 If you have any questions, concerns, or requests regarding this
        Privacy Policy or our privacy practices, please contact us at [Contact
        Email Address]. We will do our best to address and resolve any issues or
        inquiries you may have.
        <br />
        <br />
        By using our website and creating campaigns on our platform, you signify
        your consent to this Privacy Policy. Please note that this policy
        applies solely to information collected by our website and does not
        extend to any third-party websites or services linked to or from our
        platform.
        <br />
        <br />
        Last updated: 1/6/23
      </p>
    </div>
  );
};
