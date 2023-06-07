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

export const CampaignBody = ({campaign}) => {
 const {
    id,
    channel,
    name,
    host,
    prompts,
    template,
    target,
    filter,
    daisychain,
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
  useEffect(() => {
    initialisePrompts();
  }, [prompts]);

  const [newTemplate, setNewTemplate] = useState(template);

  const addPrompt = (prompt) => {
    setNewTemplate((old) =>
      old.replace(`<<${prompt.id}>>`, promptAnswers[prompt.id])
    );
  };

  const addCondition = (prompt) => {
    //for undefined
    if (typeof promptAnswers[prompt.id] == "string") {
      //remove whole no
      let frameExtractionRegex = new RegExp(
        String.raw`<<${prompt.id}=no:.*?>>`
      );
      setNewTemplate((old) => old.replace(frameExtractionRegex, ""));

      //remove whole yes
      let frameExtractionRegex2 = new RegExp(
        String.raw`<<${prompt.id}=yes:.*?>>`
      );
      setNewTemplate((old) => old.replace(frameExtractionRegex2, ""));
    }

    //for yes
    if (promptAnswers[prompt.id]) {
      try {
        console.log("trying...");
        console.log(newTemplate);
        //process string if there's a 'yes' condition

        //have to generate regex from template literals:
        //make regex to remove only string
        let stringExtractionRegex = new RegExp(
          String.raw`(?<=<<${prompt.id}=yes:)(.*?)(?=>>)`
        );
        console.log(stringExtractionRegex);
        console.log(newTemplate.match(stringExtractionRegex));
        //extract string
        let extractedString = newTemplate.match(stringExtractionRegex)[0];
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
        setNewTemplate((old) => old.replace(frameExtractionRegex2, ""));
      } catch {
        //nada
      }
    }

    //for no
    if (!promptAnswers[prompt.id]) {
      try {
        //process string if there's a 'no' condition

        //have to generate regex from template literals:
        //make regex to remove only string
        let stringExtractionRegex = new RegExp(
          String.raw`(?<=<<${prompt.id}=no:)(.*?)(?=>>)`
        );
        //extract string
        let extractedString = newTemplate.match(stringExtractionRegex)[0];
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
        //nada
      }
    }

    console.log(promptAnswers[prompt.id]);
  };

  //prompt or message stage
  const [stage, setStage] = useState("prompts");
  if (stage == "prompts" && prompts.length == 0) setStage("message");

  useEffect(() => {
    if (stage == "message") {
      setNewTemplate(template);
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
  }, [stage]);

  console.log(newTemplate);

  const handlePromptAnswerChange = (e, prompt) => {
    let newPromptAnswers = { ...promptAnswers };
    newPromptAnswers[prompt.id] = e.target.value;
    setPromptAnswers(newPromptAnswers);
  };

  //return loading screen if campaign not loaded
  if (!campaign) {
    return <>Loading...</>;
  }

  return (
    <div>
      Campaign: {name}
      <br />
      Host: {host}
      <br />
      {stage == "prompts" && (
        //work out how conditionals can work here

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
                      required={prompt.required}
                      onChange={(e) => handlePromptAnswerChange(e, prompt)}
                    />
                  )
                }
                {
                  //select field for yes/no questions
                  prompt.answerType == "yesno" && (
                    <FormControl>
                      <Select
                        width="200px"
                        labelId="yes-no-select-label"
                        id="yes-no-select"
                        value={promptAnswers[prompt.id]}
                        onChange={(e) => handlePromptAnswerChange(e, prompt)}
                      >
                        <MenuItem value=""></MenuItem>
                        <MenuItem value={true}>Yes</MenuItem>
                        <MenuItem value={false}>No</MenuItem>
                      </Select>
                    </FormControl>
                  )
                }
              </div>
            );
          })}

          <Button onClick={() => setStage("message")}>Next</Button>
        </>
      )}
      {stage == "message" && (
        <TextField
          id="template"
          fullWidth
          value={newTemplate}
          multiline
          rows={10}
          onChange={(e) => setNewTemplate(e.target.value)}
        />
      )}
      {filter == "postcode" && (
        <PostcodeInput setActionTarget={setActionTarget} campaign={campaign} />
      )}
      <br />
    </div>
  );
};
