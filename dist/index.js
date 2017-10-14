const axios = require('axios');
var qs =  require('qs');

module.exports = {
  api: process.env.bitsoApi || "",
  secret: process.env.bitsoSecret || "",
  baseUrl: "https://api.bitso.com/v3/",
  requestPublic: function(endpoint, params = {}){
    console.log(params)
    return axios.get(`${this.baseUrl}${endpoint}`, {params})
      .then(({data})=>data)
      .catch((err)=>console.log(err));
  },
  available_books: function(params = {}){
    return this.requestPublic('available_books/', params);
  },
  available_books: function(params = {}){
    return this.requestPublic('ticker/', params);
  },
  order_book: function(params = {book:'btc_mxn'}){
    return this.requestPublic('order_book/', params);
  },
  trades: function(params = {book:'btc_mxn'}){
    return this.requestPublic('trades/', params);
  },

  requestPrivate: function(endpoint, params, method){
    var nonce = new Date().getTime();
    var json_payload = '';//params ? qs.stringify(params) : ""; // not working D:
    var request_path = `/v3/${endpoint}?` + qs.stringify(params);

    // Create the signature
    var Data = nonce + method.toLocaleUpperCase() + request_path + json_payload;
    var crypto = require('crypto');
    var signature = crypto.createHmac('sha256', this.secret).update(Data).digest('hex');
    var auth_header = "Bitso " + this.api + ":" + nonce + ":" + signature;

    var config = {
      headers: {
        'Authorization': auth_header,
      },
    };
    var args =
      method === `get` ?
        [config] :
        [json_payload, config];
    console.log(`${this.baseUrl}${endpoint}?` + qs.stringify(params), ...args);
    return axios[method](`${this.baseUrl}${endpoint}?` + qs.stringify(params), ...args)
      .then(({data})=>data)
      .catch((err)=>console.log(err.response.data));
  },
  account_status: function(params = {}){
    return this.requestPrivate('account_status/', false, 'get')
  },
  balance: function(params = {}){
    return this.requestPrivate('balance/', false, 'get');
  },
  fees: function(params = {}){
    return this.requestPrivate('fees/', false, 'get');
  },
  ledger: function(params = {limit:100}){
    return this.requestPrivate('ledger/', params, 'get');
  },
  withdrawals: function(params = {limit:100}){
    return this.requestPrivate('withdrawals/', params, 'get');
  },
  fundings: function(params = {limit:100}){
    return this.requestPrivate('fundings/', params, 'get');
  },
  user_trades: function(params = {limit:100}){
    return this.requestPrivate('user_trades/', params, 'get');
  },
  open_orders: function(params = {book: 'btc_mxn'}){
    return this.requestPrivate('open_orders/', params, 'get');
  },
  funding_destination: function(params = {fund_currency: 'eth'}){
    return this.requestPrivate('funding_destination/', params, 'get');
  },
  bitcoin_withdrawal: function(params = {amount: 0, address:'invalid'}){
    if(amount == 0) return console.error("Incorrect withdrawal information");;
    return this.requestPrivate('bitcoin_withdrawal/', params, 'get');
  },
  ether_withdrawal: function(params = {amount: 0, address:'invalid'}){
    if(amount == 0) return console.error("Incorrect withdrawal information");;
    return this.requestPrivate('ether_withdrawal/', params, 'get');
  },
  spei_withdrawal: function(params = {amount: 0, recipient_given_names:'invalid',
        recipient_family_names: "", clabe: "", notes_ref: "", numeric_ref: ""}){
    if(amount == 0) return console.error("Incorrect withdrawal information");;
    return this.requestPrivate('spei_withdrawal/', params, 'get');
  },
  mx_bank_codes: function(params = {}){
    return this.requestPrivate('mx_bank_codes/', params, 'get');
  },
};
