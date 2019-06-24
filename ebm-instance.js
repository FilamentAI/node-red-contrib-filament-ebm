module.exports = function(RED) {
    function EBMInstance(n) {
        RED.nodes.createNode(this,n);
        this.host = n.host;
        this.botid = n.botid;
        this.providerid = n.providerid;
    }
    RED.nodes.registerType("ebm-instance",EBMInstance);
}