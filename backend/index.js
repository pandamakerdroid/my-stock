const express = require('express');
const router = express.Router()
const app = express();

const stock = require('./routes/stock')
const crypto = require('./routes/crypto')
const account = require('./routes/account')

const cors = require('cors');

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cors());

app.get('/', (req, res) => {
  res.send('my stock backend, no api documentation available by design');
});

const port = process.env.PORT || 3001;

//app.use(express.json());
app.use('/api/v1/stock', stock);
app.use('/api/v1/crypto', crypto);
app.use('/api/v1/account', account);

app.listen(port, () =>
  console.log(`Example app listening on port ${port}!`),
);