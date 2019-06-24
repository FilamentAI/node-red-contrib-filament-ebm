# node-red-contrib-filament-ebm
===============================

A simple Node-RED (http://nodered.org) node to interact with the Filament EBM ( https://enterprisebotmanager.com/ ) platform for creating chatbots. 

# Features

* Incoming message on msg.payload
* Supports maintaining sessions between messages.

# Install

Run the following command in the root directory of your Node-RED install (typically ~/.node-red)

    npm install node-red-contrib-filament-ebm
    
# Example

<pre>
[{"id":"44492bda.366ff4","type":"debug","z":"fe0f7c80.5eaef","name":"","active":true,"tosidebar":true,"console":false,"tostatus":false,"complete":"true","x":670,"y":100,"wires":[]},{"id":"49ede9cd.3b4278","type":"inject","z":"fe0f7c80.5eaef","name":"","topic":"","payload":"hello world!","payloadType":"str","repeat":"","crontab":"","once":false,"onceDelay":0.1,"x":150,"y":100,"wires":[["2aea451.6a225ba"]]},{"id":"2aea451.6a225ba","type":"ebm","z":"fe0f7c80.5eaef","name":"","server":"28ba340b.08168c","newSession":false,"x":510,"y":100,"wires":[["44492bda.366ff4"]]},{"id":"cd5fb69a.0fa988","type":"function","z":"fe0f7c80.5eaef","name":"","func":"msg.ebm = { \n    \"session_id\" : \"7d11e391-df78-b000-290f-c8c2e90796c4\"   \n}\nreturn msg;","outputs":1,"noerr":0,"x":290,"y":140,"wires":[["2aea451.6a225ba"]]},{"id":"10c641f9.39714e","type":"inject","z":"fe0f7c80.5eaef","name":"","topic":"","payload":"good","payloadType":"str","repeat":"","crontab":"","once":false,"onceDelay":0.1,"x":130,"y":140,"wires":[["cd5fb69a.0fa988"]]},{"id":"355f9e3d.c9c3f2","type":"function","z":"fe0f7c80.5eaef","name":"","func":"msg.ebm = { \n    \"session_id\" : \"4d993ea0-6735-23e0-be84-6263c7396a93\"   \n}\nreturn msg;","outputs":1,"noerr":0,"x":290,"y":180,"wires":[["2aea451.6a225ba"]]},{"id":"39d0c43e.d9fd5c","type":"inject","z":"fe0f7c80.5eaef","name":"","topic":"","payload":"bad","payloadType":"str","repeat":"","crontab":"","once":false,"onceDelay":0.1,"x":130,"y":180,"wires":[["355f9e3d.c9c3f2"]]},{"id":"28ba340b.08168c","type":"ebm-instance","z":"","name":"Demo EBM","host":"demo-ebm.kubernetes.software","botid":"86","providerid":"75"}]
</pre>
  
# Author

Andy Feltham, https://github.com/FilamentAI
