const axios = require('axios');

module.exports = function(RED) {

    function guid () {
        var s4 = function() {
            return Math.floor((1 + Math.random()) * 0x10000)
                .toString(16)
                .substring(1);
        };
        return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();
    };    

    function FilamentEBM(config) {
        RED.nodes.createNode(this,config);
        var node = this;
        // Retrieve the config node
        this.server = RED.nodes.getNode(config.server);
        node.on('input', function(msg) {
            /// make the request to the ebm instance.... 
            this.status({}); // clear the status.
            if (this.server) {
                var sessionId = msg.ebm ? msg.ebm.session_id : guid(); // previous session or create a new one... 
                if ( this.newSession ) { 
                    // if config says new session clear this one... 
                    sessionId = null;
                }
                const ebmData = {
                    botId: msg.ebm.body_id || this.server.botid,
                    providerId: msg.ebm.provider_id || this.server.providerid,
                    message : msg.payload,
                    sessionId: sessionId
                };
                const options = {
                    method: 'POST',
                    headers: { 'content-type': 'application/json' },
                    data: JSON.stringify(ebmData),
                    url: "https://" + this.server.host + "/api/chat/query"
                };
                this.status({
                    fill:"green",
                    shape:"dot",
                    text: "Requesting..."
                });
                axios(options)
                .then((response) => {
                    msg.payload = response.data.bot_response.map( function ( e ) { 
                        var text = "";
                        switch ( e.type ) { 
                            case 0: 
                                text = e.speech[0];
                                break;
                            case 2: 
                                text = e.replies.join(",");
                                break;
                        }
                        return text; 
                    })
                    msg.ebm = response.data;
                    this.status({}); // clear the status.
                    node.send(msg);
                })
                .catch((error) => {
                    this.status({
                        fill:"red",
                        shape:"ring",
                        text:error.message
                    });
                    msg.ebm = error;
                    node.send(msg);
                });
            } else {
                msg.payload = "No EBM configuration.";
                this.status({
                    fill:"red",
                    shape:"ring",
                    text:"Missing configuration"
                });
                node.send(msg);
            }
        });
    }
    RED.nodes.registerType("ebm", FilamentEBM);
}