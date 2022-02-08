import Http from "./http";
import {Logout} from './store/Reducers/AuthReducer';

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
      new Http("auth/logout", "GET").request().then(({data, error}) => {
          this.dispatch(Logout());
      }) 
    });

    this.ws.addEventListener("close", () => {
      clearInterval(this.keepAliveTimer);
    });
  }
}

export default GateWay;
