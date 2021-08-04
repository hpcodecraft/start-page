const axios = require("axios");
const cors = require("cors");
const express = require("express");
const path = require("path");
const app = express();
const port = process.env.PORT || 80;

app.use(cors());

app.use(express.static(path.join(__dirname, "docs")));

app.get("/", function (req, res) {
  res.sendFile(path.join(__dirname, "docs", "index.html"));
});

// This displays message that the server running and listening to specified port
app.listen(port, () => console.log(`Listening on port ${port}`));

app.get("/heartbeat-enabled", function (req, res) {
  return res.send({ enabled: true });
});

app.get("/heartbeat", (req, res) => {
  // await new Promise(resolve => setTimeout(resolve, 2000));

  const handleResponse = response => {
    console.log(
      "heartbeat",
      req.query.page,
      response?.status,
      response?.statusText
    );

    if (!response) {
      res.send({
        status: null,
        text: null,
      });
    } else {
      res.send({
        status: response.status,
        text: response.statusText,
      });
    }
  };

  axios
    .get(req.query.page)
    .then(handleResponse)
    .catch(({ response }) => handleResponse(response));
});
