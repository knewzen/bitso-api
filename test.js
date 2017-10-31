const bitso = require('./dist/index.js');

/*bitso.available_books().then((data)=>console.log(data));

bitso.available_books({book:'btc_mxn'}).then((data)=>console.log(data));

bitso.order_book({book:'btc_mxn'}).then((data)=>console.log(data));

bitso.account_status().then((data)=>console.log(data));

bitso.balance().then((data)=>console.log(data));

bitso.mx_bank_codes().then((data)=>console.log(data));*/

//bitso.open_orders().then(console.log).catch( (err) => {console.log(err.data)});
//bitso.balance().then((data)=>console.log(data));
//bitso.ticker({book:'btc_mxn'}).then(console.log);

console.log("withdrawals");
bitso.withdrawals().then((data)=>{
  console.log("withdrawals", data.payload);
}).catch(console.log);
console.log("fundings");
bitso.fundings().then((data)=>{
  console.log("fundings", data.payload);
}).catch(console.log);
console.log("balance");
bitso.balance().then((data)=>{
  console.log("balance", data);
}).catch(console.log);
console.log("open_orders");
bitso.open_orders().then((data)=>{
  console.log("open_orders", data);
}).catch(console.log);
console.log("user_trades");
bitso.user_trades({book:"eth_mxn"}).then((data)=>{
  console.log("user_trades", data);
}).catch(console.log);
