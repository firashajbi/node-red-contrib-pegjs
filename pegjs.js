module.exports = function (RED) {
    "use strict";
    var pegjs = require("pegjs");
    function PegjsNode(n) {
        RED.nodes.createNode(this, n);
        this.parser = pegjs.generate(n.grammar);
        var node = this;
        this.on("input", function (msg) {
            if (msg.hasOwnProperty("payload")) {
                try {
                    msg.payload = node.parser.parse(msg.payload);
                    node.send(msg);
                } catch (error) {
                    node.error(error.message, msg);
                }
            } else {
                node.send(msg);
            }
        });
    }
    RED.nodes.registerType("pegjs", PegjsNode);
};