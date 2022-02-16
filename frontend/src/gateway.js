import { MessageCreated } from "./store/Reducers/VariablesReducer/MessagesReducer";

class GateWay {
  constructor(dispatch) {
    this.dispatch = dispatch;
    this.closed = false;
    this.ws = new WebSocket("ws://127.0.0.1:5000/ws");

    this.onWebsocketOpen = this.onWebsocketOpen.bind(this);
    this.onWebsocketClose = this.onWebsocketClose.bind(this);
    this.onWebsocketError = this.onWebsocketError.bind(this);
    this.onWeboskcetMessage = this.onWeboskcetMessage.bind(this);
    this.startListening = this.startListening.bind(this);
    this.startListening();
  }

  onWebsocketOpen = (e) => {
    console.log(`Interval ID: ${this.reconnectWebsocketTimer}`);
    if (this.reconnectWebsocketTimer) {
      clearInterval(this.reconnectWebsocketTimer);
      delete this.reconnectWebsocketTimer;
    }
    this.keepAlive();
  };

  onWebsocketClose = (e) => {
    clearInterval(this.keepAliveTimer);
    this.reconnectWebsocketTimer = setInterval(() => {
      console.log(this.ws.readyState);
      if (
        this.ws.readyState !== this.ws.CONNECTING &&
        this.ws.readyState === this.ws.CLOSED
      ) {
        this.ws = new WebSocket("ws://127.0.0.1:5000/ws");
        this.startListening();
      }
    }, 5 * 1000);
  };

  onWebsocketError = (e) => {
    console.log("Error: ");
    console.log(e);
  };

  onWeboskcetMessage = (e) => {
    const data = JSON.parse(e.data);
    handleEvents(this, data);
  };

  sendJson(ws, object) {
    ws.send(JSON.stringify(object));
  }

  keepAlive() {
    this.keepAliveTimer = setInterval(() => {
      this.sendJson(this.ws, {
        event: "HEARTBEAT",
      });
    }, 30 * 1000);
  }

  startListening() {
    this.ws.addEventListener("open", this.onWebsocketOpen);
    this.ws.addEventListener("error", this.onWebsocketError);
    this.ws.addEventListener("close", this.onWebsocketClose);
    this.ws.addEventListener("message", this.onWeboskcetMessage);
  }
}

const handleEvents = (gateway, data) => {
  const { e, p } = data;
  switch (e) {
    case "MESSAGE_CREATED":
      console.log("MESSAGE CREATEd");
      gateway.dispatch(MessageCreated(p));
  }
};

export default GateWay;
