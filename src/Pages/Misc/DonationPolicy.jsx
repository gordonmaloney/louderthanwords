import React from "react";
import useMediaQuery from "@mui/material/useMediaQuery";

export const DonationPolicy = () => {
  const Mobile = useMediaQuery("(max-width:900px)");

  return (
    <div style={{ width: Mobile ? "90%" : "70%", margin: "100px auto 250px auto" }}>
      <p>
        <h2 style={{ fontFamily: "Fjalla One", margin: 0 }}>Donation policy</h2>
        <br />
        <br />
        Thank you for considering a donation to support Louder Than Words, our
        campaign website dedicated to promoting progressive causes. Your
        generous contribution helps us maintain and enhance the platform. Please
        read our donation policy below:
        <br />
        <br />
        <ol>
          <li>Purpose of Donations:</li>
          <ul>
            <li>
              Hosting and Maintenance: Donations received will be utilized to
              cover the costs of hosting the website in the UK and ensuring its
              uninterrupted accessibility.
            </li>
            <li>
              Future Development: We will allocate a portion of the funds
              towards improving and expanding the functionality of the website,
              allowing us to better serve our community and advance our mission.
            </li>
          </ul>
          <li>Volunteer-Run Initiative:</li>
          <ul>
            <li>
              Louder Than Words is run entirely by dedicated volunteers who
              contribute their time and expertise to maintain the website and
              support its campaigns.
            </li>
            <li>
              While the website is volunteer-driven, we reserve the right to
              reimburse individuals for their time and efforts, on a
              case-by-case basis and where feasible and necessary to sustain the
              project's long-term viability.
            </li>
          </ul>
          <br />
          <br />
          <li>Direct Donation Allocation:</li>

          <ul>
            <li>
              As Louder Than Words is not affiliated with any formal
              organization, donations go directly to the person who built and
              maintains the website.
            </li>
            <li>
              Rest assured that every donation is utilized exclusively for the
              purposes outlined above, with a focus on advancing progressive
              causes.
            </li>
          </ul>
        </ol>
        We appreciate your trust and support in our initiative. Your
        contributions are instrumental in amplifying grassroots campaigns and
        making a meaningful impact.
        <br /> <br />
        If you have any further questions or would like to discuss donation
        options, please contact us at donations@louderthanwords.org.
        <br /> <br />
        Thank you for joining us in making a difference through Louder Than
        Words!
      </p>
    </div>
  );
};
