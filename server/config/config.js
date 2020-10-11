if (process.env.NODE_ENV === 'production') {
    module.exports = {
        mongoURI: require("./prod").mongoURI,
        key: "very_secret_key",
        domain: require("./prod").domain,
        dbMode: "Localhost"
    }
} else {
    module.exports = {
        mongoURI: require('./dev').mongoURI,
        key: "secret_key",
        domain: require("./dev").domain,
        dbMode: "Localhost"
    }
}