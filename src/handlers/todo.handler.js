const { default: axios } = require('axios');
const joi = require('joi');// validation
const quoteServices = require('../services/quotes.service');
// const allQuotesData;
// const { default: axios } = require('axios');

// const httpGet = async (path) => {
//   const response = await axios.get(path);
//   return response.data;
// };

const quoteHandler = async (req, res) => {
//   const quotesList = await httpGet('https://type.fit/api/quotes');
//   const filteredList = quotesList.slice(0, 5);
  // const formattedQuotes = await quoteServices.getQuotes();
  const allQuotesData = await quoteServices.getQuotes();
  const first5Quotes = allQuotesData.slice(0, 5);
  res.status(200).send(first5Quotes);
  // console.log(req);
}; 

const getQuoteById = async (req, res) => {
  const { body } = req;
  const quotesSchema = joi.object().keys({
    id: joi.number().required(),
  });

  const { value, error } = quotesSchema.validate(body);

  if (error) {
    return res.status(400).send('Bad Request');
  }

  //   if (!body.id) {
  //     return res.status(400).send('Bad');
  //   }


  const allQuotesDataa = await quoteServices.getQuotes();
//   console.log(body);
//   console.log(body.id);
//   console.log(allQuotesDataa)

  // console.log(allQuotes[10])
  res.status(200).send(allQuotesDataa[body.id]);
};

module.exports = { quoteHandler, getQuoteById };
