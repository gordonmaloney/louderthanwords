import { useState, useEffect, useContext } from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import {
  TextField,
  FormControlLabel,
  InputLabel,
  Select,
  Tooltip,
  Grid,
  MenuItem,
  InputAdornment,
  Checkbox,
} from "@mui/material";
import { TabContext, TabList, TabPanel } from "@mui/lab";
import { TabBody } from "../../Components/TabBody";
import { CampaignBody } from "../Campaign/CampaignBody";
import { BtnStyle } from "../../MUIStyles";
import { Campaign } from "../Campaign/Campaign";
import { ReviewModal } from "./ReviewModal";
import { ShepherdTour, ShepherdTourContext } from "react-shepherd";
import { tourOptions } from "./Tour";
import useMediaQuery from "@mui/material/useMediaQuery";
import axios from "axios";
import { API_URL } from "../../API";
import { useNavigate } from "react-router-dom";

const TooltipStyle = {
  tooltip: {
    sx: {
      color: "rgb(255, 241, 208)",
      bgcolor: "#5A788B",
      "& .MuiTooltip-arrow": {
        color: "#5A788B",
      },
    },
  },
};

const TabStyle = {
  fontFamily: "Fjalla One",
  color: "#0D0221",
  fontSize: "1em",
  maxWidth: "100px",
  "&.Mui-selected": { color: "#0D0221", backgroundColor: "rgb(255, 241, 208)" },
  "&&.Mui-disabled": {
    color: "#0D0221",
    cursor: "pointer",
    opacity: "1",
  },
  "&:disabled": { color: "rgba(13, 2, 33,0.3) !important" },
  "&:active": { borderRadius: 0, backgroundColor: "#FFF1D0", color: "#5A788B" },
};

const CheckboxStyle = {
  color: "#5A788B",
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

export const CreateTabs = () => {
  const Mobile = useMediaQuery("(max-width:900px)");
const navigate = useNavigate()
  const [newCampaign, setNewCampaign] = useState({
    title: "",
    blurb: "",
    host: "",
    hostLink: "",
    uuid: "",
    subject: "",
    target: [],
    bcc: "",
    channel: "Select",
    prompts: [],
    template: "",
    bulkTarget: "select",
  });

  const [optionalFields, setOptionalFields] = useState({ prompts: false });

  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const [addingTarget, setAddingTarget] = useState(false);
  const [editingTarget, setEditingTarget] = useState(false);
  const [newTarget, setNewTarget] = useState({
    name: "",
    handle: "",
  });

  const [addingBCC, setAddingBCC] = useState(false);

  const [addingPrompt, setAddingPrompt] = useState(false);
  const [editingPrompt, setEditingPrompt] = useState(false);
  const [newPrompt, setNewPrompt] = useState({
    question: "",
    answerType: "",
    required: false,
    id: "",
  });

  const NavButtonBox = ({ nextDisabled }) => {
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
      </div>
    );
  };

  const TitleTab = (
    <TabBody
      index={0}
      title="Campaign Details"
      body={
        <>
          <div>
            <span style={{ fontFamily: "Fjalla One" }}>
              Give your campaign a name:
            </span>
            <TextField
              fullWidth
              required
              id="campaignTitle"
              label="Campaign Title"
              variant="outlined"
              value={newCampaign.title}
              sx={TextFieldStyle}
              onChange={(e) =>
                setNewCampaign({ ...newCampaign, title: e.target.value })
              }
            />
          </div>
          <br />

          <div>
            <span style={{ fontFamily: "Fjalla One" }}>
              Who is running the campaign and how can people find out more:
            </span>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <TextField
                id="campaignHost"
                label="Host"
                required
                variant="outlined"
                sx={{ ...TextFieldStyle, width: "49%" }}
                value={newCampaign.host}
                onChange={(e) =>
                  setNewCampaign({ ...newCampaign, host: e.target.value })
                }
              />
              <TextField
                id="campaignHostLink"
                label="Link to web or socials"
                variant="outlined"
                sx={{ ...TextFieldStyle, width: "49%" }}
                value={newCampaign.hostLink}
                onChange={(e) =>
                  setNewCampaign({ ...newCampaign, hostLink: e.target.value })
                }
              />
            </div>
          </div>

          <br />
          <div>
            <span style={{ fontFamily: "Fjalla One" }}>
              What's the 'elevator pitch' for your campaign?:
            </span>
            <TextField
              fullWidth
              id="campaignHost"
              label="Brief description"
              variant="outlined"
              multiline
              rows={3}
              sx={TextFieldStyle}
              value={newCampaign.blurb}
              onChange={(e) =>
                setNewCampaign({ ...newCampaign, blurb: e.target.value })
              }
            />
          </div>
          <NavButtonBox
            nextDisabled={!newCampaign.title || !newCampaign.host}
          />
        </>
      }
    />
  );

  const [titleInUse, setTitleInUse] = useState(false);
  const checkIfTitleInUse = async (checkUuid) => {
    const response = await axios.get(API_URL + "all");
    if (response.data.find((camp) => camp.uuid == checkUuid) !== undefined) {
      setTitleInUse(true);
    } else {
      setTitleInUse(false);
    }
  };

  //set uuid based on title
  useEffect(() => {
    let newId = newCampaign.title.replaceAll(" ", "-");
    setNewCampaign({ ...newCampaign, uuid: newId });
  }, [newCampaign.title]);

  useEffect(() => {
    if (value == 4) {
      checkIfTitleInUse(newCampaign.uuid);
    }
  }, [value]);

  const TargetTab = (
    <TabBody
      index={1}
      title="target"
      body={
        <>
          <div style={{ marginBottom: "8px" }}>
            <span style={{ fontFamily: "Fjalla One" }}>
              Where do you want to reach your target - Twitter or Email?
            </span>
            <br />

            <TextField
              select
              value={newCampaign.channel}
              fullWidth
              sx={TextFieldStyle}
              onChange={(e) =>
                setNewCampaign({ ...newCampaign, channel: e.target.value })
              }
            >
              <MenuItem value="Select">Select...</MenuItem>
              <MenuItem value="Twitter">Twitter</MenuItem>
              <MenuItem value="Email">Email</MenuItem>
            </TextField>
          </div>

          <div
            style={{
              margin: "10px 0",
              display: newCampaign.channel == "Select" && "none",
            }}
          >
            <TextField
              fullWidth
              value={newCampaign.bulkTarget}
              select
              style={{ TextFieldStyle }}
              onChange={(e) => {
                setNewCampaign({ ...newCampaign, bulkTarget: e.target.value });
              }}
            >
              <MenuItem value="select">Select...</MenuItem>
              <MenuItem value="mps">Members of Parliament</MenuItem>
              <MenuItem value="msps">
                Members of the Scottish Parliament
              </MenuItem>
            </TextField>

            <div>
              <span style={{ fontFamily: "Fjalla One" }}>
                Who or what is the target of the campaign?
              </span>
              <br />
              <Grid container spacing={1}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Name"
                    sx={TextFieldStyle}
                    variant="outlined"
                    value={newTarget.name}
                    onChange={(e) =>
                      setNewTarget({ ...newTarget, name: e.target.value })
                    }
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label={
                      newCampaign.channel == "Twitter" ? "Handle" : "Address"
                    }
                    sx={TextFieldStyle}
                    variant="outlined"
                    value={newTarget.handle}
                    onChange={(e) =>
                      setNewTarget({ ...newTarget, handle: e.target.value })
                    }
                  />
                </Grid>
              </Grid>
              <Button
                fullWidth
                sx={{ ...BtnStyle, marginTop: "8px" }}
                onClick={() => {
                  setNewCampaign({
                    ...newCampaign,
                    target: [...newCampaign.target, newTarget],
                  });
                  setNewTarget({ name: "", handle: "" });
                  setEditingTarget(false);
                }}
                disabled={newTarget.name == "" || newTarget.handle == ""}
              >
                {editingTarget ? "Save" : "Add"}
              </Button>
            </div>

            {
              //render existing targets
              <div
                style={{
                  display:
                    newCampaign.channel == "Twitter" &&
                    newCampaign.target.length == 0 &&
                    "none",
                }}
              >
                <div style={{ margin: "10px 0" }}>
                  <h3 style={{ margin: 0, fontFamily: "Fjalla One" }}>
                    Your targets:
                  </h3>
                  <ul style={{ margin: 0 }}>
                    {newCampaign.target.map((targ) => (
                      <li>
                        {targ.name} - {targ.handle}{" "}
                        <Button
                          style={{ ...BtnStyle, transform: "scale(0.7)" }}
                          onClick={() => {
                            setNewTarget(targ);
                            setEditingTarget(true);
                            setNewCampaign({
                              ...newCampaign,
                              target: [
                                ...newCampaign.target.filter(
                                  (existingTarg) => existingTarg !== targ
                                ),
                              ],
                            });
                          }}
                        >
                          Edit
                        </Button>
                        <Button
                          style={{ ...BtnStyle, transform: "scale(0.7)" }}
                          onClick={() => {
                            setNewCampaign({
                              ...newCampaign,
                              target: [
                                ...newCampaign.target.filter(
                                  (existingTarg) => existingTarg !== targ
                                ),
                              ],
                            });
                          }}
                        >
                          Delete
                        </Button>
                      </li>
                    ))}
                    {newCampaign.target.length == 0 &&
                      newCampaign.channel == "Email" &&
                      "You need to add at least one target!"}
                  </ul>
                </div>{" "}
              </div>
            }
          </div>

          <div
            style={{
              margin: "10px 0",
              display: newCampaign.channel == "Email" ? "inline-block" : "none",
            }}
          >
            <h3 style={{ margin: 0, fontFamily: "Fjalla One" }}>Add a BCC:</h3>
            <TextField
              fullWidth
              label="And an address to copy in to user's emails"
              sx={TextFieldStyle}
              variant="outlined"
              value={newTarget.bcc}
              onChange={(e) =>
                setNewTarget({ ...newTarget, bcc: e.target.value })
              }
            />
          </div>
          <NavButtonBox
            nextDisabled={
              newCampaign.channel == "Select" ||
              (newCampaign.channel == "Email" && newCampaign.target.length == 0)
            }
          />
        </>
      }
    />
  );

  useEffect(() => {
    setNewPrompt({
      ...newPrompt,
      id: `prompt${newCampaign.prompts.length + 1}`,
    });
  }, [addingPrompt]);

  const PromptsTab = (
    <TabBody
      index={2}
      title="prompts"
      body={
        <>
          <p>
            Prompts allow you to ensure a personal touch in the messages that
            get sent. You can ask users a question - such as "Why does this
            campaign matter to you?" - and then incorporate their answer into
            the template. You can also ask yes/no questions, and have
            conditional content in the template based on the answer.
          </p>

          {
            //render existing prompts
          }
          <ul style={{ margin: "0 0 12px 0" }}>
            {newCampaign.prompts.map((prompt) => (
              <li>
                {prompt.id}: {prompt.question}{" "}
                <Button
                  style={{ ...BtnStyle, transform: "scale(0.7)" }}
                  onClick={() => {
                    setEditingPrompt(true);
                    setNewPrompt(prompt);
                    setNewCampaign({
                      ...newCampaign,
                      prompts: [
                        ...newCampaign.prompts.filter(
                          (existingPrompt) => existingPrompt !== prompt
                        ),
                      ],
                    });
                  }}
                >
                  Edit
                </Button>
                <Button
                  style={{ ...BtnStyle, transform: "scale(0.7)" }}
                  onClick={() => {
                    setNewCampaign({
                      ...newCampaign,
                      prompts: [
                        ...newCampaign.prompts.filter(
                          (existingPrompt) => existingPrompt !== prompt
                        ),
                      ],
                    });
                  }}
                >
                  delete
                </Button>
              </li>
            ))}
          </ul>
          {!addingPrompt && !editingPrompt ? (
            <Button
              sx={BtnStyle}
              variant="contained"
              onClick={() => setAddingPrompt(true)}
            >
              Create a prompt
            </Button>
          ) : (
            <>
              <div style={{ marginBottom: "12px" }}>
                <span style={{ fontFamily: "Fjalla One" }}>
                  This is the question user's will see when they visit your
                  campaign:
                </span>
                <TextField
                  fullWidth
                  label="Question"
                  variant="outlined"
                  value={newPrompt.question}
                  sx={TextFieldStyle}
                  onChange={(e) =>
                    setNewPrompt({ ...newPrompt, question: e.target.value })
                  }
                />
              </div>

              <div style={{ marginBottom: "12px" }}>
                <span style={{ fontFamily: "Fjalla One" }}>
                  You can choose whether the response should be free text or a
                  yes/no:
                </span>
                <TextField
                  fullWidth
                  sx={TextFieldStyle}
                  variant="outlined"
                  select
                  label="Response Type"
                  labelId="response-type-label"
                  id="response-type"
                  value={newPrompt.answerType}
                  onChange={(e) =>
                    setNewPrompt({
                      ...newPrompt,
                      answerType: e.target.value,
                    })
                  }
                >
                  <MenuItem value="">Select...</MenuItem>

                  <MenuItem value="text">Free text</MenuItem>

                  <MenuItem value="yesno">Yes/no</MenuItem>
                </TextField>
                <FormControlLabel
                  label="Required"
                  control={
                    <Checkbox
                      style={CheckboxStyle}
                      checked={newPrompt.required}
                      onChange={(e) =>
                        setNewPrompt({
                          ...newPrompt,
                          required: e.target.checked,
                        })
                      }
                    />
                  }
                />{" "}
              </div>

              <div style={{ marginBottom: "12px" }}>
                <span style={{ fontFamily: "Fjalla One" }}>
                  Give your prompt a short ID in order to reference it in the
                  next tab:
                </span>

                <TextField
                  fullWidth
                  label="Prompt ID"
                  sx={TextFieldStyle}
                  variant="outlined"
                  value={newPrompt.id}
                  onChange={(e) =>
                    setNewPrompt({ ...newPrompt, id: e.target.value })
                  }
                />
              </div>
              <Button
                sx={BtnStyle}
                variant="contained"
                onClick={() => {
                  setNewCampaign({
                    ...newCampaign,
                    prompts: [...newCampaign.prompts, newPrompt],
                  });
                  setNewPrompt({ question: "", answerType: "", id: "" });
                  setAddingPrompt(false);
                  setEditingPrompt(false);
                }}
                disabled={
                  newPrompt.question == "" ||
                  newPrompt.answerType == "" ||
                  newPrompt.id == ""
                }
              >
                Save
              </Button>
            </>
          )}
          <NavButtonBox />
        </>
      }
    />
  );

  useEffect(() => {
    if (newCampaign.channel == "twitter")
      setNewCampaign({
        ...newCampaign,
        template: "Hey @" + newCampaign.target[0]?.handle + ", ",
      });
  }, [newCampaign.target[0]]);

  const TemplateTab = (
    <TabBody
      index={3}
      title="Template"
      body={
        <>
          <p>
            Draft your template message here. If you've created prompt
            questions, you can use the buttons below to place where you'd like
            the user's answers to go.
          </p>
          Your prompts:
          <br />
          {newCampaign.channel == "Twitter" &&
            (newCampaign.target.length > 0 ||
              newCampaign.bulkTarget !== "select") && (
              <Grid container alignItems="center">
                <Grid item>
                  TargetHandle: the twitter username of your target
                </Grid>
                <Grid item>
                  <Button
                    // size="small"
                    sx={{
                      ...BtnStyle,
                      transform: "scale(0.7)",
                      width: "100px",
                      display: "inline !important",
                    }}
                    onClick={() =>
                      setNewCampaign({
                        ...newCampaign,
                        template: `${newCampaign.template}<<TargetHandle>>`,
                      })
                    }
                  >
                    Insert
                  </Button>
                </Grid>
              </Grid>
            )}
          {newCampaign.prompts.map((prompt) => (
            <Grid container alignItems="center">
              <Grid item>
                {prompt.id}: {prompt.question}
              </Grid>

              <Grid
                item
                sx={{
                  display: "flex",
                  alignContent: "center",
                  justifyContent: "center",
                }}
              >
                {prompt.answerType == "text" && (
                  <Button
                    // size="small"
                    sx={{
                      ...BtnStyle,
                      transform: "scale(0.7)",
                      width: "100px",
                      display: "inline !important",
                    }}
                    onClick={() =>
                      setNewCampaign({
                        ...newCampaign,
                        template: `${newCampaign.template}<<${prompt.id}>>`,
                      })
                    }
                  >
                    Insert
                  </Button>
                )}
                {prompt.answerType == "yesno" && (
                  <Button
                    sx={{
                      ...BtnStyle,
                      transform: "scale(0.7)",
                      width: "100px",
                      display: "inline !important",
                    }}
                    onClick={() =>
                      setNewCampaign({
                        ...newCampaign,
                        template: `${newCampaign.template}<<${prompt.id}=yes:conditional text for 'yes' here...>><<${prompt.id}=no:conditional text for 'no' here...>>`,
                      })
                    }
                  >
                    Insert
                  </Button>
                )}
              </Grid>
            </Grid>
          ))}
          {newCampaign.channel == "Email" && (
            <TextField
              variant="outlined"
              fullWidth
              value={newCampaign.subject}
              onChange={(e) =>
                setNewCampaign({ ...newCampaign, subject: e.target.value })
              }
              sx={TextFieldStyle}
              label="Subject Line"
            />
          )}
          <TextField
            sx={TextFieldStyle}
            label="Template"
            variant="outlined"
            value={newCampaign.template}
            fullWidth
            multiline
            rows={5}
            onChange={(e) =>
              setNewCampaign({ ...newCampaign, template: e.target.value })
            }
            inputProps={{
              maxLength:
                newCampaign.channel == "Twitter" &&
                280 - (newCampaign.target?.handle?.length + 1),
            }}
          />
          {newCampaign.channel == "Twitter" && (
            <span style={{ width: "100%", textAlign: "right" }}>
              {newCampaign.template?.length} / 280
            </span>
          )}
          <NavButtonBox />
        </>
      }
    />
  );

  //tooltip logic
  const [tooltipOpen, setTooltipOpen] = useState(false);
  useEffect(() => {
    if (tooltipOpen) {
      setTimeout(() => {
        setTooltipOpen(false);
      }, 1000);
    }
  }, [tooltipOpen]);

  const handleLaunch = async () => {

    await axios.get(API_URL + "all")
    .then(response => {
      if (response.data.find((camp) => camp.uuid == newCampaign.uuid) !== undefined) {
        setTitleInUse(true);
      } else {
        setTitleInUse(false);
        axios.post(API_URL, newCampaign).then(() => {
          navigate("../" + newCampaign.uuid)
        });
      }
    })
  };

  const ReviewTab = (
    <TabBody
      title="Review & launch"
      body={
        <>
          <div style={{ marginBottom: "10px" }}>
            <span style={{ fontFamily: "Fjalla One" }}>
              Campaign URL:{" "}
              <Button
                style={{ ...BtnStyle, transform: "scale(0.7)" }}
                onClick={() => {
                  checkIfTitleInUse(newCampaign.uuid);
                }}
              >
                Check availability
              </Button>
              <Tooltip
                title="Copied!"
                componentsProps={TooltipStyle}
                open={tooltipOpen}
                disableFocusListener
                disableHoverListener
                disableTouchListener
                placement="right"
                arrow
              >
                <Button
                  disabled={titleInUse}
                  style={{
                    ...BtnStyle,
                    transform: "scale(0.7)",
                    display: titleInUse && "none",
                  }}
                  onClick={() => {
                    setTooltipOpen(true);
                    navigator.clipboard.writeText(
                      window.location.origin + "/" + newCampaign.uuid
                    );
                  }}
                >
                  Copy
                </Button>
              </Tooltip>
            </span>
            <TextField
              style={TextFieldStyle}
              fullWidth
              value={newCampaign.uuid}
              onChange={(e) =>
                setNewCampaign({ ...newCampaign, uuid: e.target.value })
              }
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    {window.location.origin + "/"}
                  </InputAdornment>
                ),
              }}
            />
            {titleInUse && (
              <span style={{ color: "rgb(221,28,26)" }}>
                This URL is taken! Please try another.
              </span>
            )}
          </div>

          <div style={{ marginBottom: "10px" }}>
            <span style={{ fontFamily: "Fjalla One" }}>
              Use the button below to preview what your campaign will look like
              - and take the opportunity to proof-read it!
            </span>
            <br />
            <center>
              <Button
                sx={{ ...BtnStyle, marginTop: "8px" }}
                onClick={() => setIsOpen(true)}
              >
                Preview
              </Button>
            </center>
          </div>

          <div style={{ marginBottom: "10px" }}>
            <span style={{ fontFamily: "Fjalla One" }}>
              Once you're happy with everything, use the button below to launch
              your campaign:
            </span>
            <br />
            <center>
              <Button
              disabled={titleInUse}
                sx={{ ...BtnStyle, marginTop: "8px" }}
                onClick={() => handleLaunch()}
              >
                launch
              </Button>
            </center>
          </div>
          <NavButtonBox />
        </>
      }
    />
  );

  const [isOpen, setIsOpen] = useState(false);
  const onClose = () => {
    setIsOpen(false);
  };

  const steps = [
    {
      id: "Details",
      attachTo: { element: ".campaign-details", on: Mobile ? "top" : "left" },
      beforeShowPromise: function () {
        return new Promise(function (resolve) {
          setTimeout(function () {
            Mobile ? window.scrollTo(0, 400) : window.scrollTo(0, 0);
            resolve();
            setValue(0);
            window.localStorage.setItem("firstTime", false);
          }, 100);
        });
      },
      buttons: [
        {
          classes: "shepBtn",
          text: "Stop",
          type: "cancel",
        },
        {
          classes: "shepBtn",
          text: "Next",
          type: "next",
        },
      ],
      classes: "shepherdBox",
      highlightClass: "highlight",
      scrollTo: false,
      title: "Get started",
      text: "Give your campaign a title, say who's running it, and give a short description here.",
    },
    {
      id: "Target",
      attachTo: { element: ".target", on: Mobile ? "top" : "left" },
      beforeShowPromise: function () {
        return new Promise(function (resolve) {
          setTimeout(function () {
            Mobile ? window.scrollTo(0, 400) : window.scrollTo(0, 0);
            resolve();
            setValue(1);
          }, 100);
        });
      },
      buttons: [
        {
          classes: "shepBtn",
          text: "Stop",
          type: "cancel",
        },
        {
          classes: "shepBtn",
          text: "Back",
          type: "back",
        },
        {
          classes: "shepBtn",
          text: "Next",
          type: "next",
        },
      ],
      classes: "shepherdBox",
      highlightClass: "highlight",
      scrollTo: false,

      title: "Set your target",
      text: "Say who you're going after here and give their contact details. You can have as many targets as you like.",
    },
    {
      id: "Prompts",
      attachTo: { element: ".prompts", on: Mobile ? "top" : "left" },
      beforeShowPromise: function () {
        return new Promise(function (resolve) {
          setTimeout(function () {
            Mobile ? window.scrollTo(0, 400) : window.scrollTo(0, 0);
            resolve();
            setValue(2);
          }, 100);
        });
      },
      buttons: [
        {
          classes: "shepBtn",
          text: "Stop",
          type: "cancel",
        },
        {
          classes: "shepBtn",
          text: "Back",
          type: "back",
        },
        {
          classes: "shepBtn",
          text: "Next",
          type: "next",
        },
      ],
      classes: "shepherdBox",
      highlightClass: "highlight",
      scrollTo: false,

      title: "Personalise",
      text: "Here you can create 'prompt' questions. The answers users give can then be used to shape and further customise the template letter.",
    },
    {
      id: "Template",
      attachTo: { element: ".prompts", on: Mobile ? "top" : "left" },
      beforeShowPromise: function () {
        return new Promise(function (resolve) {
          setTimeout(function () {
            Mobile ? window.scrollTo(0, 400) : window.scrollTo(0, 0);
            resolve();
            setValue(3);
          }, 100);
        });
      },
      buttons: [
        {
          classes: "shepBtn",
          text: "Stop",
          type: "cancel",
        },
        {
          classes: "shepBtn",
          text: "Back",
          type: "back",
        },
        {
          classes: "shepBtn",
          text: "Next",
          type: "next",
        },
      ],
      classes: "shepherdBox",
      highlightClass: "highlight",
      scrollTo: false,

      title: "Write your message!",
      text: "Write your template message here! You can use the buttons to show where you want the user's answers to the prompt questions to go.",
    },
    {
      id: "Review",
      attachTo: { element: ".prompts", on: Mobile ? "top" : "left" },
      beforeShowPromise: function () {
        return new Promise(function (resolve) {
          setTimeout(function () {
            Mobile ? window.scrollTo(0, 400) : window.scrollTo(0, 0);
            resolve();
            setValue(4);
          }, 100);
        });
      },
      when: {
        destroy: function () {
          setValue(0);
        },
      },
      buttons: [
        {
          classes: "shepBtn",
          text: "Stop",
          type: "cancel",
        },
        {
          classes: "shepBtn",
          text: "Back",
          type: "back",
        },
        {
          classes: "shepBtn",
          text: "Exit",
          type: "complete",
        },
      ],
      classes: "shepherdBox",
      highlightClass: "highlight",
      scrollTo: false,

      title: "Good to go!",
      text: "Here you can preview your campaign and, when you're ready, launch it.",
    },
  ];

  const [tourRunning, setTourRunning] = useState(false);

  function TourButton() {
    const tour = useContext(ShepherdTourContext);
    const firstTime = window.localStorage.getItem("firstTime");

    useEffect(() => {
      if (firstTime == null && !tourRunning) {
        window.localStorage.setItem("firstTime", false);
        tour.start();
        setTourRunning(true);
      }
    }, []);

    return (
      <Button
        sx={{ ...BtnStyle, transform: "scale(0.7)" }}
        onClick={tour.start}
      >
        Take a Tour
      </Button>
    );
  }

  return (
    <>
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
          marginBottom: "150px",
          position: "relative",
          marginTop: Mobile && "25px",
        }}
      >
        <div
          style={{
            position: "absolute",
            bottom: !Mobile && "2px",
            top: Mobile && "-40px",
            left: !Mobile && "-7px",
            right: Mobile && "-7px",
          }}
        >
          <ShepherdTour steps={steps} tourOptions={tourOptions}>
            <TourButton />
          </ShepherdTour>
        </div>

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
              <Tab
                className="campaign-details"
                label="Campaign Details"
                sx={TabStyle}
                value={0}
              />
              <Tab
                disabled={!newCampaign.title || !newCampaign.host}
                className="target"
                label="Target"
                sx={TabStyle}
                value={1}
              />
              <Tab
                className="prompts"
                label="Prompts"
                sx={TabStyle}
                value={2}
                disabled={
                  !newCampaign.title ||
                  !newCampaign.host ||
                  newCampaign.channel == "Select" ||
                  (newCampaign.channel == "Email" &&
                    newCampaign.target.length == 0)
                }
              />
              <Tab
                disabled={
                  !newCampaign.title ||
                  !newCampaign.host ||
                  newCampaign.channel == "Select" ||
                  (newCampaign.channel == "Email" &&
                    newCampaign.target.length == 0)
                }
                className="template"
                label="Template"
                sx={TabStyle}
                value={3}
              />
              <Tab
                disabled={
                  !newCampaign.title ||
                  !newCampaign.host ||
                  newCampaign.channel == "Select" ||
                  (newCampaign.channel == "Email" &&
                    newCampaign.target.length == 0)
                }
                className="review"
                label="Review & Launch"
                sx={TabStyle}
                value={4}
              />
            </TabList>
          </Box>
        </TabContext>
        <div style={{ width: "100%", display: "flex" }}>
          {value === 0 && <>{TitleTab}</>}
          {value === 1 && <>{TargetTab}</>}

          {value === 2 && <>{PromptsTab}</>}
          {value === 3 && <>{TemplateTab}</>}
          {value === 4 && <>{ReviewTab}</>}
        </div>
      </Box>
      <ReviewModal
        isOpen={isOpen}
        onClose={() => onClose()}
        body={
          <div>
            <center>
              <div className="campaignPageBox">
                <h3
                  style={{
                    width: "100%",
                    fontFamily: "Fjalla One",
                    textAlign: "left !important",
                    margin: "0 0 20px 0",
                  }}
                >
                  {newCampaign.host}
                </h3>

                <center>
                  <h1
                    style={{
                      fontFamily: "Fjalla One",
                      margin: Mobile ? "0 0 10px 0" : "0 0 20px 0",
                    }}
                  >
                    {newCampaign.title}
                  </h1>
                </center>

                <p style={{ whiteSpace: "pre-line" }}>{newCampaign.blurb}</p>
              </div>
            </center>
            <Campaign campaign={newCampaign} />
          </div>
        }
      />
    </>
  );
};
