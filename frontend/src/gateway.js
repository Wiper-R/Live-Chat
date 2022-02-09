class GateWay {
  constructor(dispatch) {
    this.dispatch = dispatch;
    this.ws = new WebSocket("ws://127.0.0.1:5000/ws");
    this.startListening();
  }

  sendJson(object) {
    this.ws.send(JSON.stringify(object));
  }

  keepAlive() {
    this.keepAliveTimer = setInterval(() => {
      this.sendJson({
        event: "HEARTBEAT",
      });
    }, 30 * 1000);
  }

  startListening() {
    this.ws.addEventListener("open", (e) => {
      this.keepAlive();
    });

    this.ws.addEventListener("close", (e) => {
      clearInterval(this.keepAliveTimer);
    });
  }
}

export default GateWay;
