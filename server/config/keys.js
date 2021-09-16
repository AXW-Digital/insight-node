// keys.js - figure out what set of credentials to return
// if (process.env.NODE_ENV === 'production') {
//   // we are in production - return the prod set of keys
//   module.exports = require('./prod');
// } else {
//   // we are in development - return the dev keys!!!
//   module.exports = require('./dev');
// }



module.exports = {
  googleClientID: '692802472995-eh5f2641a8h80cved14ii10216lp9nfb.apps.googleusercontent.com',
  googleClientSecret: '-ZehjDF8-NZffujXJTxnpR1f',
  facebookClientID: '2851920061785046',
  facebookClientSecret: 'b81dc8d1169ca7398595ff99f15de2e4',
  mongoURI: 'mongodb+srv://dbDevUser:NJg9G2Bw15vAWS5z@cluster0.lvf2x.mongodb.net/myFirstDatabase?retryWrites=true&w=majority',
  cookieKey: '%/WEHq53yqerQ"#Yafegh#(WRGqYUQ',
  adminUrl: 'http://ec2co-ecsel-1n5taiqogsorw-561415610.eu-north-1.elb.amazonaws.com:3030',
  localUrl: 'http://ec2co-ecsel-1n5taiqogsorw-561415610.eu-north-1.elb.amazonaws.com:3030'
};
