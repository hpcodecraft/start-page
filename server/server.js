const axios = require("axios");
const cors = require("cors");
const express = require("express");
const app = express();
const port = process.env.PORT || 5000;

app.use(cors());

// This displays message that the server running and listening to specified port
app.listen(port, () => console.log(`Listening on port ${port}`));

app.get("/heartbeat-enabled", function (req, res) {
  return res.send({ enabled: true });
});

app.get("/heartbeat", async (req, res) => {
  // await new Promise(resolve => setTimeout(resolve, 2000));

  axios
    .get(req.query.page)
    .then(response => {
      res.send({
        status: response.status,
        text: response.statusText,
      });
    })
    .catch(({ response }) => {
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
    });
});
