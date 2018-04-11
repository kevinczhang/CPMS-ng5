//Install express server
const express = require('express');
const app = express();

// Serve only the static files form the dist directory
app.use(express.static(__dirname + '/dist'));

// rewrite virtual urls to angular app to enable refreshing of internal pages
router.get('*', function (req, res, next) {
    res.sendFile(path.resolve(express.static(__dirname + '/dist') + '/index.html'));
});

// Start the app by listening on the default Heroku port
app.listen(process.env.PORT || 8080);