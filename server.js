
const express = require('express');
const fs = require('fs');
const cors = require('cors');
const app = express();
app.use(cors());
const PORT = process.env.PORT || 5000;

app.get('/data', (req, res) => {
  fs.readFile('sample-data.json', 'utf8', (err, data) => {
    if (err) {
      console.error(err);
      res.status(500).send('Error reading data file');
      return;
    }
    res.json(JSON.parse(data));
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
