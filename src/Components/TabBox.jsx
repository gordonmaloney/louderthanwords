import { useState, useEffect } from "react";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import {
  TextField,
  FormControl,
  InputLabel,
  Select,
  Grid,
  MenuItem,
} from "@mui/material";
import { TabContext, TabList } from "@mui/lab";

const TabStyle = {
  fontFamily: "Fjalla One",
  color: "#0D0221",
  fontSize: "1em",
  "&.Mui-selected": { color: "#0D0221", backgroundColor: "rgb(255, 241, 208)" },
};

export const TabBox = ({ Tabs, parentValue }) => {
  const [newCampaign, setNewCampaign] = useState({
    name: "",
    host: "",
    uuid: "",
    target: [],
    channel: "",
    prompts: [],
    template: "",
  });

  const [value, setValue] = useState(0);

  useEffect(() => {
    value !== parentValue && setValue(parentValue)
  }, [parentValue])

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box
      sx={{
        bgcolor: "rgb(221,28,26)",
        display: "flex",
        flexGrow: 1,
        margin: "0 1%",
        width: "98%",
        borderRadius: "15px",
        minHeight: "400px",
        marginBottom: "150px",
      }}
    >
      <TabContext value={value} sx={{ height: "100%" }}>
        <Box
          sx={{
            height: "100%",
            minHeight: "400px",
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
            orientation="vertical"
          >
            {Tabs.map((tab, index) => (
              <Tab label={tab.title} sx={TabStyle} value={index} />
            ))}
          </TabList>
        </Box>
      </TabContext>
        {Tabs.map((tab, index) => {
          return (value === index && <>{tab.tab}</>);
        })}
    </Box>
  );
};
