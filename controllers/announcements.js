// const express = require('express');
// const router = express.Router();
// const axios = require('axios');
// const { announcement } = require('../models');

// router.get('/', function (req, res) {
//     // axios.get('https://api.spacexdata.com/v4/capsules')
//     //     .then(function (response) {
//     //         // handle success
//     //         return res.render('capsules', { capsules: response.data });
//     //     })
//     //     .catch(function (error) {
//     //         res.json({ message: 'Data not found. Please try again later.' });
//     //     });

//     // READ all capsules send capsules to 
//     capsule.findAll()
//         .then(capsules => {
//             console.log('raw data capsules', capsules);
//             // clean capsules
//             const cleaned_capsules = capsules.map(c => c.toJSON());
//             console.log('cleaned capsules', cleaned_capsules);
//             // return a webpage
//             res.render('capsules/index', { capsules: cleaned_capsules });
//         })
//         .catch(err => {
//             console.log('Error', err);
//             res.render('no-result');
//         })
// });

// module.exports = router;