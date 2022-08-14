const express = require('express');
const app = express();
const router = express.Router()

const stockController = require('./controllers/stockController')
const cryptoController = require('./controllers/cryptoController')
const accountController = require('./controllers/accountController')

const cors = require('cors');

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cors());

const requestTime = function (req, res, next) {
  req.requestTime = Date.now()
  next()
}

app.use(requestTime)


router.get('/', res => {
  res.send('my stock backend, no api documentation available by design');
});

const port = process.env.PORT || 3001;


app.use(express.json());
app.use('/api/v1/stock', stockController);
app.use('/api/v1/crypto', cryptoController);
app.use('/api/v1/account', accountController);

app.use("/api", router);

app.listen(port, () =>
  console.log(`Example app listening on port ${port}!`),
);