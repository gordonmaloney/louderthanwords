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
    id,
    channel,
    title,
    host,
    subject,
    prompts,
    template,
    target,
    filter,
    daisychain,
    bcc,
    performance,
  } = campaign;

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
      newPrompts[prompt.id] = "";
    });
    setPromptAnswers(newPrompts);
  };

  console.log(promptAnswers);

  useEffect(() => {
    initialisePrompts();
  }, []);

  const [newTemplate, setNewTemplate] = useState();

  const addPrompt = (prompt) => {
    setNewTemplate((old) =>
      old.replace(`<<${prompt.id}>>`, promptAnswers[prompt.id])
    );
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
      let sendLink = `https://twitter.com/intent/tweet?text=${newTemplate
        .replace("#", "%23")
        .replace(/\n/g, "%0A")}`;

      window.open(sendLink);
    }
    if (channel == "Email" && prop !== "gmail") {
      let sendLink = `mailto:${target.map(
        (targ) => targ.handle + `,`
      )}?subject=${subject}&bcc=${bcc}&body=${
        newTemplate.replace("%", "%25").replace(/\n/g, "%0A") + "%0A%0A"
      }`;

      window.open(sendLink);
    }

    if (channel == "Email" && prop == "gmail") {
      let sendLink = `https://mail.google.com/mail/?view=cm&fs=1&to=${target.map(
        (targ) => targ.handle + `,`
      )}?su=${subject}&bcc=${bcc}&body=${
        newTemplate.replace("%", "%25").replace(/\n/g, "%0A") + "%0A%0A"
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
    if (campaign.target.length < 2) {
      setActiveTabs((old) => old.filter((tab) => tab !== "Set Target"));
    }
  }, []);

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
              <Tab label={tab} sx={TabStyle} value={index} />
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
                            sx={TextFieldStyle}
                            fullWidth
                            value={promptAnswers[prompt.id]}
                            required={prompt.required}
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
                            labelId="yes-no-select-label"
                            id="yes-no-select"
                            value={promptAnswers[prompt.id]}
                            onChange={(e) =>
                              handlePromptAnswerChange(e, prompt)
                            }
                          >
                            <MenuItem value=""></MenuItem>
                            <MenuItem value={true}>Yes</MenuItem>
                            <MenuItem value={false}>No</MenuItem>
                          </TextField>
                        )
                      }
                    </div>
                  );
                })}
                <NavButtonBox />
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
                  <TextField
                    label="Subject Line"
                    id="subject"
                    fullWidth
                    value={subject}
                    sx={TextFieldStyle}
                    onChange={(e) => setNewTemplate(e.target.value)}
                  />
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
                If you use Gmail, you can use this button to send the message
                from your browser:
                <br />
                <center>
                  <Button
                    onClick={() => handleSend("gmail")}
                    style={{ ...BtnStyle, marginTop: "5px" }}
                  >
                    Send via Gmail
                  </Button>
                </center>
              </>
            )}
          </p>
        }
      />

      <ShareDonateModal
        isOpen={isShareOpen}
        onClose={() => onShareClose()}
        body={
          <p>
            Nice one! But you can have even more impact by doing just one more
            thing - either <b>share</b> the campaign, or <b>donate</b> to help
            keep Louder Than Words running. <b>Will you do one of those?</b>
            <div
              style={{
                display: "flex",
                justifyContent: "space-around",
                marginTop: "15px",
              }}
            >
              <Button style={BtnStyle}>Share</Button>
              <Button style={BtnStyle}>Donate</Button>
            </div>
          </p>
        }
      />
    </Box>
  );
};
