import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Campaigns } from "../../Data/DummyCampaigns";
import { PostcodeInput } from "./PostcodeInput";
import { EmailCampaign } from "./EmailCampaign";
import { TwitterCampaign } from "./TwitterCampaign";
import {
  TextField,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import { useLocation } from "react-router-dom";
import { Grid } from "@mui/material";
import { TabBox } from "../../Components/TabBox";
import { TabBody } from "../../Components/TabBody";
import { BtnStyle } from "../../MUIStyles";
import { TabContext, TabList } from "@mui/lab";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import useMediaQuery from "@mui/material/useMediaQuery";
import { SendModal } from "./SendModal";
import { ShareDonateModal } from "./ShareDonateModal";

import { regions, msps } from "../../Data/MSPData";
import { MPs } from "../../Data/MPs";

const TabStyle = {
  fontFamily: "Fjalla One",
  color: "#0D0221",
  maxWidth: "100px",
  fontSize: "1em",
  "&.Mui-selected": { color: "#0D0221", backgroundColor: "rgb(255, 241, 208)" },
};

const TextFieldStyle = {
  marginTop: "8px",
  "& label.Mui-focused": {
    color: "#537A8B",
  },
  "& .MuiInput-underline:after": {
    borderBottomColor: "#537A8B",
  },
  "& .MuiFilledInput-underline:after": {
    borderBottomColor: "#537A8B",
  },
  "& .MuiOutlinedInput-root": {
    "&.Mui-focused fieldset": {
      borderColor: "#537A8B",
    },
    "& .MuiSelect-root": {
      "&.Mui-focused fieldset": {
        borderColor: "#537A8B",
      },
    },
  },
};

export const Campaign = ({ campaign }) => {
  let { pathname } = useLocation();

  const Mobile = useMediaQuery("(max-width:900px)");

  const {
    uuid,
    channel,
    title,
    host,
    subject,
    prompts,
    template,
    target,
    filter,
    bulkTarget,
    daisychain,
    bcc,
    performance,
  } = campaign;

  const [newSubject, setNewSubject] = useState(subject);

  //initialise action target
  const [actionTarget, setActionTarget] = useState("");

  //if no filter, set target
  if (filter == "none" && actionTarget !== target) {
    setActionTarget(target);
  }

  //handle prompts
  const [promptAnswers, setPromptAnswers] = useState({});

  const initialisePrompts = () => {
    let newPrompts = {};
    prompts.map((prompt) => {
      if (prompt.answerType == "test") newPrompts[prompt.id] = "";
      if (prompt.answerType == "yesno")
        newPrompts[prompt.id] = "noOptionSelected";
    });
    setPromptAnswers(newPrompts);
  };

  console.log(promptAnswers["tenant"]);

  useEffect(() => {
    initialisePrompts();
  }, []);

  const [newTemplate, setNewTemplate] = useState();

  const addPrompt = (prompt) => {
    if (promptAnswers[prompt.id] !== undefined) {
      setNewTemplate((old) =>
        old.replace(`<<${prompt.id}>>`, promptAnswers[prompt.id])
      );
    } else {
      setNewTemplate((old) => old.replace(`<<${prompt.id}>>`, ""));
    }
  };

  const addCondition = (prompt) => {
    //for undefined
    if (typeof promptAnswers[prompt.id] == "string") {
      console.log("no answer, removing whole negative string");
      //remove whole no
      let frameExtractionRegex = new RegExp(
        String.raw`<<${prompt.id}=no:.*?>>`
      );
      setNewTemplate((old) => old.replace(frameExtractionRegex, ""));

      console.log("no answer, removing whole positive string");
      //remove whole yes
      let frameExtractionRegex2 = new RegExp(
        String.raw`<<${prompt.id}=yes:.*?>>`
      );
      setNewTemplate((old) => old.replace(frameExtractionRegex2, ""));
    }

    //for yes
    if (promptAnswers[prompt.id]) {
      try {
        console.log("1) processing positive answer...");

        //process string if there's a 'yes' condition

        //have to generate regex from template literals:
        //make regex to remove only string

        //extract string
        let extractedString = template.match(
          new RegExp(`(<<${prompt.id}=yes:)(.*?)(?=>>)`, "i")
        )[2];

        console.log("4) ", extractedString);

        //make regex for whole prompt
        let frameExtractionRegex = new RegExp(
          String.raw`<<${prompt.id}=yes:.*?>>`
        );

        //replace
        setNewTemplate((old) =>
          old.replace(frameExtractionRegex, extractedString)
        );

        //remove whole string if no 'yes' condition
        let frameExtractionRegex2 = new RegExp(
          String.raw`<<${prompt.id}=no:.*?>>`
        );
        setNewTemplate((old) =>
          old.replace(new RegExp(`<<${prompt.id}=no:.*?>>`), "")
        );
      } catch {
        //nada

        //remove whole string if no 'yes' condition

        setNewTemplate((old) =>
          old.replace(new RegExp(`<<${prompt.id}=no:.*?>>`), "")
        );
      }
    }

    //for no
    if (!promptAnswers[prompt.id]) {
      console.log("neg cond");
      try {
        //process string if there's a 'no' condition

        //extract string
        let extractedString = template.match(
          new RegExp(`(<<${prompt.id}=no:)(.*?)(?=>>)`, "i")
        )[2];
        //make regex for whole prompt
        let frameExtractionRegex = new RegExp(
          String.raw`<<${prompt.id}=no:.*?>>`
        );
        //replace
        setNewTemplate((old) =>
          old.replace(frameExtractionRegex, extractedString)
        );

        //remove 'yes' prompt:
        console.log("remove no option");
        let frameExtractionRegex2 = new RegExp(
          String.raw`<<${prompt.id}=yes:.*?>>`
        );
        setNewTemplate((old) => old.replace(frameExtractionRegex2, ""));
      } catch {
        console.log("remove no option");
        let frameExtractionRegex2 = new RegExp(
          String.raw`<<${prompt.id}=yes:.*?>>`
        );
        setNewTemplate((old) => old.replace(frameExtractionRegex2, ""));
      }
    }
  };

  //prompt or message stage
  const [value, setValue] = useState(0);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  //modals
  const [isSendOpen, setIsSendOpen] = useState(false);
  const onSendClose = () => {
    setIsSendOpen(false);
  };
  const [isShareOpen, setIsShareOpen] = useState(false);
  const onShareClose = () => {
    setIsShareOpen(false);
  };

  //send function
  const handleSend = (prop) => {
    //check for channel, compile everything

    if (channel == "Twitter") {
      let sendLink = `https://twitter.com/intent/tweet?text=${encodeURIComponent(
        newTemplate.replace("#", "%23").replace(/\n/g, "%0A")
      )}`;

      window.open(sendLink);
    }

    if (channel == "Email" && prop !== "gmail" && prop !== "yahoo") {
      let sendLink = `mailto:${target.map(
        (targ) => targ.handle + `,`
      )}${fetchedTargets.map(
        (targ) => targ.email + `,`
      )}?subject=${newSubject}&bcc=${bcc ? bcc : ""}&body=${
        encodeURIComponent(newTemplate.replace("%", "%25").replace(/\n/g, "%0A") + "%0A%0A")
      }`;

      window.open(sendLink);
    }

    if (channel == "Email" && prop == "gmail") {
      let sendLink = `https://mail.google.com/mail/?view=cm&fs=1&to=${target.map(
        (targ) => targ.handle + `,`
      )}${fetchedTargets.map(
        (targ) => targ.email + `,`
      )}&su=${newSubject}&bcc=${bcc ? bcc : ""}&body=${
        encodeURIComponent(newTemplate.replace("%", "%25").replace(/\n/g, "%0A") + "%0A%0A")
      }`;
      window.open(sendLink);
    }

    if (channel == "Email" && prop == "yahoo") {
      let sendLink = `http://compose.mail.yahoo.com/?To=${target.map(
        (targ) => targ.handle + `,`
      )}${fetchedTargets.map(
        (targ) => targ.email + `,`
      )}&Subject=${newSubject}&bcc=${bcc ? bcc : ""}&Body=${
        encodeURIComponent(newTemplate.replace("%", "%25").replace(/\n/g, "%0A") + "%0A%0A")
      }`;
      window.open(sendLink);
    }

    onSendClose();
    setIsShareOpen(true);
  };

  const NavButtonBox = ({ nextDisabled, send }) => {
    return (
      <div
        id="tab-btn-container"
        style={{
          margin: "10px 2% 15px 2%",
          padding: "0 2%",
          width: "92%",
        }}
      >
        <Button
          variant="outlined"
          onClick={() => setValue((old) => old - 1)}
          sx={{
            ...BtnStyle,
            float: "left",
            display: value == 0 ? "none" : "inline-block",
          }}
        >
          back
        </Button>

        {!send ? (
          <Button
            disabled={nextDisabled}
            variant="outlined"
            onClick={() => setValue((old) => old + 1)}
            sx={{
              ...BtnStyle,
              float: "right",
              display: value == 4 ? "none" : "inline-block",
            }}
          >
            next
          </Button>
        ) : (
          <Button
            disabled={nextDisabled}
            variant="outlined"
            onClick={() => setIsSendOpen(true)}
            sx={{
              ...BtnStyle,
              float: "right",
              width: "200px",
              display: value == 3 ? "none" : "inline-block",
            }}
          >
            send
          </Button>
        )}
      </div>
    );
  };

  useEffect(() => {
    if (value == activeTabs.indexOf("Your Message")) {
      setNewTemplate(template);
    }
  }, [value]);

  useEffect(() => {
    if (value == activeTabs.indexOf("Your Message")) {
      prompts
        .filter((prompt) => prompt.answerType == "text")
        .map((prompt) => {
          addPrompt(prompt);
        });
      prompts
        .filter((prompt) => prompt.answerType == "yesno")
        .map((prompt) => {
          addCondition(prompt);
        });
    }
  }, [newTemplate]);

  const handlePromptAnswerChange = (e, prompt) => {
    let newPromptAnswers = { ...promptAnswers };
    newPromptAnswers[prompt.id] = e.target.value;
    setPromptAnswers(newPromptAnswers);
  };

  const [activeTabs, setActiveTabs] = useState([
    "Get Started",
    "Set Target",
    "Your Story",
    "Your Message",
  ]);

  useEffect(() => {
    if (campaign.prompts.length == 0) {
      setActiveTabs((old) => old.filter((tab) => tab !== "Your Story"));
    }
  }, []);

  useEffect(() => {
    if (campaign.bulkTarget == "select") {
      setActiveTabs((old) => old.filter((tab) => tab !== "Set Target"));
    }
  }, []);

  const [postcode, setPostcode] = useState("");
  const [invalidPC, setInvalidPC] = useState(false);
  const [scotConstituency, setScotConstituency] = useState("");
  const [constituency, setConstituency] = useState("");
  const [searching, setSearching] = useState(false);

  const fetchPostcodeData = async () => {
    setSearching(true);
    try {
      const scotland_response = await fetch(
        `https://api.postcodes.io/scotland/postcodes/${postcode}`
      );

      const uk_response = await fetch(
        `https://api.postcodes.io/postcodes/${postcode}`
      );

      const scotland_data = await scotland_response.json();
      const uk_data = await uk_response.json();
      setConstituency(uk_data.result.parliamentary_constituency);
      setScotConstituency(
        scotland_data.result.scottish_parliamentary_constituency
      );
      setSearching(false);
      setInvalidPC(false);
    } catch {
      setInvalidPC(true);
      console.log("invalid postcode");
      setSearching(false);
    }
  };

  const [fetchedTargets, setFetchedTargets] = useState([]);

  useEffect(() => {
    if (newTemplate && channel == "Twitter" && fetchedTargets.length > 0) {
      setNewTemplate((old) =>
        old.replace(
          `<<TargetHandle>>`,
          fetchedTargets.map((targ) => targ.handle)
        )
      );
    }
  }, [target, fetchedTargets, newTemplate]);

  useEffect(() => {
    //find region

    if (bulkTarget == "msps" && scotConstituency) {
      let region = regions.filter(
        (region) => region.constituency == scotConstituency
      )[0].region;

      //set msps that match either constituency or region
      setFetchedTargets(
        msps.filter(
          (msp) =>
            msp.constituency == constituency || msp.constituency == region
        )
      );
    }
  }, [scotConstituency]);

  useEffect(() => {
    bulkTarget == "mps" &&
      setFetchedTargets(MPs.filter((mp) => mp.constituency == constituency));
  }, [constituency]);

  //return loading screen if campaign not loaded
  if (!campaign) {
    return <>Loading...</>;
  }

  return (
    <Box
      sx={{
        bgcolor: "rgb(221,28,26)",
        display: "flex",
        flexGrow: 1,
        flexDirection: Mobile ? "column" : "row",
        margin: "0 auto",
        paddingBottom: "0",
        minWidth: Mobile ? "100vw" : "98%",
        borderRadius: !Mobile && "15px",
        minHeight: "400px",
        marginBottom: pathname == "/create" ? "0px" : "150px",
        position: "relative",
      }}
    >
      <TabContext value={value} sx={{ height: "100%" }}>
        <Box
          sx={{
            height: "100%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
          }}
        >
          <TabList
            sx={{ borderRight: 1, borderColor: "divider" }}
            TabIndicatorProps={{
              style: { display: "none" },
            }}
            onChange={handleChange}
            variant="scrollable"
            scrollButtons
            allowScrollButtonsMobile
            orientation={Mobile ? "horizontal" : "vertical"}
          >
            {activeTabs.map((tab, index) => (
              <Tab
                label={tab}
                sx={TabStyle}
                value={index}
                disabled={
                  tab == "Your Message" &&
                  (prompts
                    .filter((prompt) => prompt.required)
                    .filter(
                      (prompt) =>
                        promptAnswers[prompt.id] == "" ||
                        promptAnswers[prompt.id] == "noOptionSelected"
                    ).length > 0 ||
                    (campaign.bulkTarget == "msps" && !scotConstituency) ||
                    (campaign.bulkTarget == "mps" && !constituency))
                }
              />
            ))}
          </TabList>
        </Box>
      </TabContext>
      <div style={{ width: "100%", display: "flex" }}>
        {value === activeTabs.indexOf("Get Started") && (
          <TabBody
            title={campaign.title}
            body={
              <>
                <div style={{ whiteSpace: "pre-line" }}>{campaign.blurb}</div>
                <Button sx={BtnStyle} fullWidth onClick={() => setValue(1)}>
                  GET STARTED
                </Button>
              </>
            }
          />
        )}
        {value === activeTabs.indexOf("Set Target") && (
          <TabBody
            title={"Set target"}
            body={
              <>
                <div>
                  <span style={{ fontFamily: "Fjalla One" }}>
                    Enter your postcode to find your representatives:
                  </span>
                  <TextField
                    label="Your postcode"
                    style={{ ...TextFieldStyle, margin: "10px 0" }}
                    fullWidth
                    value={postcode}
                    onChange={(e) => setPostcode(e.target.value)}
                  />

                  {invalidPC && (
                    <div
                      style={{
                        textAlign: "center",
                        color: "rgba(221,28,26,1)",
                      }}
                    >
                      Invalid postcode - try again:
                      <br />
                      <br />
                    </div>
                  )}

                  <center>
                    <Button
                      style={BtnStyle}
                      onClick={() => fetchPostcodeData()}
                    >
                      Find my reps
                    </Button>
                  </center>
                </div>

                {searching && "Loading..."}
                <div>
                  {!invalidPC &&
                    !searching &&
                    bulkTarget == "msps" &&
                    scotConstituency && (
                      <>
                        Your constituency is <u>{scotConstituency}</u>.
                      </>
                    )}
                  {!invalidPC &&
                    !searching &&
                    bulkTarget == "mps" &&
                    constituency && (
                      <>
                        Your constituency is <u>{constituency}</u>.
                      </>
                    )}
                </div>

                <NavButtonBox
                  nextDisabled={
                    invalidPC ||
                    (bulkTarget == "msps" && !scotConstituency) ||
                    (bulkTarget == "mps" && !constituency)
                  }
                />
              </>
            }
          />
        )}
        {value === activeTabs.indexOf("Your Story") && (
          <TabBody
            title="A couple questions..."
            body={
              <>
                {prompts.map((prompt) => {
                  return (
                    <div>
                      {prompt.question} {prompt.required && "*"}
                      <br />
                      {
                        //textfield for text type questions
                        prompt.answerType == "text" && (
                          <TextField
                            placeholder="Your answer here..."
                            sx={TextFieldStyle}
                            fullWidth
                            value={promptAnswers[prompt.id]}
                            required
                            onChange={(e) =>
                              handlePromptAnswerChange(e, prompt)
                            }
                          />
                        )
                      }
                      {
                        //select field for yes/no questions
                        prompt.answerType == "yesno" && (
                          <TextField
                            select
                            fullWidth
                            sx={TextFieldStyle}
                            id="yes-no-select"
                            value={promptAnswers[prompt.id]}
                            onChange={(e) =>
                              handlePromptAnswerChange(e, prompt)
                            }
                          >
                            <MenuItem value="noOptionSelected">
                              Select...
                            </MenuItem>
                            <MenuItem value={true}>Yes</MenuItem>
                            <MenuItem value={false}>No</MenuItem>
                          </TextField>
                        )
                      }
                    </div>
                  );
                })}
                <NavButtonBox
                  nextDisabled={
                    prompts
                      .filter((prompt) => prompt.required)
                      .filter(
                        (prompt) =>
                          promptAnswers[prompt.id] == "" ||
                          promptAnswers[prompt.id] == "noOptionSelected"
                      ).length > 0
                  }
                />
              </>
            }
          />
        )}{" "}
        {value === activeTabs.indexOf("Your Message") && (
          <TabBody
            title="Your message"
            body={
              <>
                {channel == "Email" && (
                  <>
                    <TextField
                      label="To:"
                      id="subject"
                      fullWidth
                      value={[...campaign.target, ...fetchedTargets].map(
                        (targ) =>
                          ` ${targ.name} ${targ.party ? `- ${targ.party}` : ""}`
                      )}
                      sx={TextFieldStyle}
                    />

                    <TextField
                      label="Subject Line"
                      id="subject"
                      fullWidth
                      value={newSubject}
                      sx={TextFieldStyle}
                      onChange={(e) => setNewSubject(e.target.value)}
                    />
                  </>
                )}

                <TextField
                  id="template"
                  fullWidth
                  label={channel == "Email" ? "Body" : "Your Tweet"}
                  value={newTemplate}
                  multiline
                  sx={TextFieldStyle}
                  rows={10}
                  onChange={(e) => setNewTemplate(e.target.value)}
                />
                <NavButtonBox send />
              </>
            }
          />
        )}
      </div>

      <SendModal
        isOpen={isSendOpen}
        onClose={() => onSendClose()}
        body={
          <p>
            You're almost there. Press the button below to open your{" "}
            {channel == "Email" ? "email" : "Twitter"} client, and the message
            will be pre-filled in there for you. Then just hit send in there to
            fire it off.
            <br />{" "}
            <center>
              <Button
                onClick={() => handleSend()}
                style={{ ...BtnStyle, marginTop: "5px" }}
              >
                Send {channel == "Email" ? "email" : "tweet"}
              </Button>
            </center>
            {!Mobile && channel == "Email" && (
              <>
                <br />
                <br />
                If you use Gmail or Yahoo Mail, you can use these button to send
                the message from your browser:
                <br />
                <div
                  style={{ display: "flex", justifyContent: "space-around" }}
                >
                  <Button
                    onClick={() => handleSend("gmail")}
                    style={{ ...BtnStyle, marginTop: "5px" }}
                  >
                    Send via Gmail
                  </Button>
                  <Button
                    onClick={() => handleSend("yahoo")}
                    style={{ ...BtnStyle, marginTop: "5px" }}
                  >
                    Send via Yahoo
                  </Button>
                </div>{" "}
              </>
            )}
          </p>
        }
      />

      <ShareDonateModal
        isOpen={isShareOpen}
        onClose={() => onShareClose()}
        campaign={campaign}
      />
    </Box>
  );
};
