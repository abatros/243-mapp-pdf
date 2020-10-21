import DDP from 'ddp.js'

const options = {
//    endpoint: "ws://localhost:3000/websocket",
    endpoint: "ws://museum.ultimheat.com/websocket",
    SocketConstructor: WebSocket
};

const ddp = new DDP(options);
console.log({ddp})

module.exports = {
  museum_ddp: function() {return ddp;}
}




ddp.on("connected", () => {
    console.log("DDP Connected",{ddp});
//    Session.set('museum-ddp',ddp);
    Meteor.museum_ddp = ddp;
    Session.set('museum-ddp-ready', true)
});
