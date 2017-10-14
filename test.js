const bitso = require('./dist/index.js');

/*bitso.available_books().then((data)=>console.log(data));

bitso.available_books({book:'btc_mxn'}).then((data)=>console.log(data));

bitso.order_book({book:'btc_mxn'}).then((data)=>console.log(data));

bitso.account_status().then((data)=>console.log(data));

bitso.balance().then((data)=>console.log(data));

bitso.mx_bank_codes().then((data)=>console.log(data));*/

//bitso.open_orders().then(console.log).catch( (err) => {console.log(err.data)});
//bitso.balance().then((data)=>console.log(data));
bitso.ticker({book:'btc_mxn'}).then((data)=>console.log(data));
