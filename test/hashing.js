const bcrypt = require('bcrypt');
const saltRounds = 10;
const myPlaintextPassword = 'password@123';
const someOtherPlaintextPassword = 'not_ba'

// bcrypt.genSalt(saltRounds, function(err, salt) {
//     bcrypt.hash(myPlaintextPassword, salt, function(err, hash) {
//         // Store hash in your password DB.

//         console.log('hash', hash)
//         console.log('salt', salt)


//         bcrypt.compare('password@122', hash , function(err, res) {
//             // res == true
//             console.log('password!!!!!!!!!!!!!' , res)
//         });


//     });
// });


bcrypt.hash(myPlaintextPassword, saltRounds, function(err, hash) {
    // Store hash in your password DB.
    bcrypt.compare('password@123', hash , function(err, res) {
        // res == true
        console.log('password!!!!!!!!!!!!!' , res)
    });
 });
