let mainConsole = console.log.bind(console);

module.exports = async (ctx, config) => {

    ctx = (typeof ctx === "object") ? ctx : {};
    let header = (typeof ctx.header === "object") ? ctx.header : {};
    let tnxId = (typeof ctx.tnxId === "string" && ctx.tnxId !== "") ? ctx.tnxId : "";
    let app_version = (typeof header["app-version"] === "string" ) ? header["app-version"] : "no-app-version";

    console.log = function(message){
        let tags = "";
        try {
            let jsonMessage = JSON.parse(message);
            if(typeof jsonMessage["tnxId"] !== "string") jsonMessage["tnxId"] = tnxId;
            jsonMessage.app_version = app_version;
            tags = jsonMessage.tag || "";
            message = JSON.stringify(jsonMessage);
        } catch(e) {
            message = tnxId + ' ' + app_version + ' ' + message;
            tags = "directConsole"
        }

        if(config.logToStdOut){
            mainConsole.apply(console, arguments);
        }else{
            //nothin as of now
        }
    };
};