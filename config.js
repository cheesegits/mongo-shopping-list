exports.DATABASE_URL = process.env.DATABASE_URL ||
    global.DATABASE_URL ||
    (process.env.NODE_ENV === 'production' ?
        'mongodb://mongo-shopper:ml4b@ds133670.mlab.com:33670/mongo-shopping-list' :
        'mongodb://localhost/shopping-list-dev');
exports.PORT = process.env.PORT || 8080;