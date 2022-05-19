const log4js = require("log4js")
log4js.configure({
    appenders: {
        consoleLogger: { type: "console" }
    },
    categories: {
        default: { appenders: ["consoleLogger"], level: "trace"}
    }
})

module.exports