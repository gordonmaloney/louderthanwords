import React, {useEffect} from "react";
import useMediaQuery from "@mui/material/useMediaQuery";

export const TermsOfService = () => {
  const Mobile = useMediaQuery("(max-width:900px)");


  return (
    <div style={{ width: Mobile ? "90%" : "70%", margin: "100px auto 250px auto" }}>
      <p>
        <h2 style={{ fontFamily: "Fjalla One", margin: 0 }}>
          Terms of Service
        </h2>
        <br />
        <br />
        Welcome to Louder Than Words! Our campaign tool is designed to empower
        grassroots organizations and promote progressive, anti-oppression
        campaigns. By using our platform, you agree to comply with the following
        Terms of Service ("Terms") outlined below. These Terms govern your use
        of the Louder Than Words website and services. If you have any questions
        or concerns about these Terms, please contact us at
        breach@louderthanwords.org.
        <br />
        <br />
        Acceptance of Terms:
        <br />
        1.1 Agreement: By accessing or using the Louder Than Words website, you
        agree to be bound by these Terms. If you do not agree with any part of
        these Terms, please refrain from using our services.
        <br />
        <br />
        Use of the Platform:
        <br />
        2.1 Eligibility: Louder Than Words is intended for use by grassroots
        organizations and individuals who support progressive, anti-oppression
        based campaigns. We reject all forms of classism, racism, sexism,
        colonialism, homophobia, transphobia, or any other forms of bigotry. By
        using our platform, you represent and warrant that you align with these
        values.
        <br />
        <br />
        2.2 Campaign Content: As a volunteer-based team, we cannot vet every
        campaign created on our platform. While we strive to maintain a safe and
        inclusive environment, we cannot guarantee the accuracy, legality, or
        appropriateness of the campaigns. Users are solely responsible for the
        content they create and share on our platform.
        <br />
        <br />
        2.3 Reporting Violations: If you believe a campaign breaches our Terms
        of Service or contains objectionable content, please notify us
        immediately by contacting breach@louderthanwords.org. We will review and
        take appropriate action as necessary.
        <br />
        <br />
        Intellectual Property:
        <br />
        3.1 Ownership: Louder Than Words and its associated trademarks, logos,
        and content are the sole property of Louder Than Words. You may not use,
        reproduce, or distribute any content from our website without explicit
        permission.
        <br />
        <br />
        3.2 Campaign Content: By creating and publishing campaigns on our
        platform, you retain ownership of the content you provide. However, by
        using our services, you grant Louder Than Words a non-exclusive,
        worldwide, royalty-free license to display, modify, and distribute the
        campaign content for the purpose of promoting and operating the
        platform.
        <br />
        <br />
        Limitations of Liability:
        <br />
        4.1 Disclaimer: Louder Than Words provides its services on an "as is"
        basis. While we strive to maintain the functionality and security of our
        platform, we do not warrant that the services will be uninterrupted,
        error-free, or completely secure. By using our platform, you acknowledge
        and accept any risks associated with your use of the services.
        <br />
        <br />
        4.2 Indemnification: You agree to indemnify and hold Louder Than Words
        and its team members harmless from any claims, damages, liabilities, or
        expenses arising out of or related to your use of the platform or any
        violation of these Terms.
        <br />
        <br />
        Modifications:
        <br />
        5.1 Updates: Louder Than Words reserves the right to modify, update, or
        terminate any part of these Terms at any time. We will provide notice of
        significant changes through the website or by other means deemed
        appropriate. By continuing to use our platform after such modifications,
        you agree to be bound by the updated Terms.
        <br />
        <br />
        Contact Us:
        <br />
        6.1 If you have any questions, concerns, or feedback regarding these
        Terms of Service, please contact us at breach@louderthanwords.org.
        <br />
        These Terms of Service constitute the entire agreement between you and
        Louder Than Words concerning the use of our platform. Please review
        these Terms periodically, as they may be subject to updates or changes.
        <br />
        <br />
        Last updated: 1/6/23
      </p>
    </div>
  );
};
