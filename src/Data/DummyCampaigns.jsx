export const Campaigns = [
  {
    uuid: "badbyname_badbynature",
    blurb:
      "Bosses at Bad Employer & Sons are REFUSING to negotiate with their staff.\n\nBut these workers are fighting for us all.\n\nWill you send an email to BE&S' chief exec and demand he meet with the union?",
    channel: "Email",
    host: "Concerned Citizen",
    bulkTarget: "select",

    template:
      "Richard, what are you doing?\n\nI'm writing to demand that you stop the nonsense and meet - in good faith - with the union members fighting for all of us.\n\n<<whymatter>>\n\n<<local=yes:As a local, who has shopped with you many times before, I can assure you I won't be back!>>",
    title: "Demand Bad Employer & Sons negotiate with their staff",
    target: [{ name: "Rich Moneyman", handle: "moneyman_r@bbande.com" }],
    subject: "Time to negotiate!",
    prompts: [
      {
        question: "Say in your own words why you care about this:",
        answerType: "text",
        id: "whymatter",
      },
      {
        question:
          "Are you local? If so, you should say so - it'll show they're losing customers!",
        answerType: "yesno",
        id: "local",
      },
    ],
  },

  {
    uuid: "landlordinc",
    blurb:
      "LandlordInc are notorious for stealing the deposits of their tenants. Send them a tweet to show that we're sick of them treating renters like cash cows and the gig is up!",
    channel: "Twitter",
    bulkTarget: "select",
    host: "Angry Tenants",
    template:
      "Hey @LandlordInc! <<whymatter>>\n\n<<tenant=yes:I've seen first hand the way you treat your tenants and I'll never be back.>><<tenant=no:I will never, ever rent from you!>>",
    title: "Tell LandlordInc to stop stealing deposits",
    target: [{ name: "LandlordInc", handle: "LandlordInc" }],
    prompts: [
      {
        question: "Have you been a LandlordInc tenant yourself?",
        answerType: "yesno",
        id: "tenant",
        required: true,
      },
      {
        question: "Say in your own words why you care about this:",
        answerType: "text",
        id: "whymatter",
        required: false,
      },
    ],
  },

  {
    uuid: "mogg",
    blurb:
      "Jacob Rees-Mogg is a dinosaur. Tell him to get back to the museum where he belongs!",
    channel: "Email",
    host: "Moggasaurus",
    hostLink: "http://moggasaurus.com",
    subject: "You fossil!",
    bcc: "gordonmaloney@gmail.com",
    bulkTarget: "select",
    template:
      "My favourite dinosaur is a <<dinosaur>>. But that's because they don't impose their paleolithic views on anyone!",
    title: "Send Jacob Rees-Mogg back to the museum where he belongs!",
    target: [{ name: "Jacob Rees-Mogg", handle: "mogg@parliament.co.uk" }],
    prompts: [
      {
        question: "What's your favourite dinosaur?",
        answerType: "text",
        id: "dinosaur",
        required: true,
      },
    ],
  },
  {
    uuid: "right2choice",
    blurb:
      "Nobody, anywhere, ever, should be forced to have a child they don't want\n\nAs resurgent, far-right, misogynist attacks on reproductive health step up, it is more important than ever that MPs stand up and vocally defend the right to choose.\n\nWill you send a tweet to your MP and ask what they're doing to defend the right to safe and legal abortion?",
    channel: "Twitter",
    host: "Right2Choice",
    template:
      "Hey <<TargetHandle>>! What are you doing to defend the right to safe & legal abortion?",
    title: "MPs: Defend the right to choose",
    target: [],
    subject: "",
    prompts: [],
    bulkTarget: "mps",
  },
];
