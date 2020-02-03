const express = require('express');
const fileUpload = require('express-fileupload');
const cors = require('cors');

const app = express();

app.use(cors());
app.use(fileUpload());

//Upload Endpoint
app.post('/upload', (req, res) => {
  if (req.files.file === null) {
    return res.status(400).json({ msg: 'No file was uploaded' });
  }

  const file = req.files.file;

  file.mv(`${__dirname}/public/uploads/${file.name}`, err => {
    if (err) {
      console.error(err);
      return res.status(500).send(err);
    }

    res.json({ fileName: file.name, filePath: `/uploads/${file.name}` });
  });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
