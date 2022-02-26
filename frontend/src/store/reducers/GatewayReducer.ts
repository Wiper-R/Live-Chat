import { AppDispatch } from "..";
import { Action } from "../types";

// ACTIONS
const GATEWAY_INIT = "GATEWAY_INIT";
const GATEWAY_OPENED = "GATEWAY_OPENED";
const GATEWAY_CLOSED = "GATEWAY_CLOSED";
const GATEWAY_WILL_RETRY = "GATEWAY_WILL_RETRY";

class Gateway {
  ws?: WebSocket;
  dispatch?: AppDispatch;
  retryCounter: number = 0;

  GatewayInit = (dispatch: AppDispatch, _: any) => {
    this.dispatch = dispatch;
    this.dispatch?.(GatewayInit());
    this.connect();
  };

  connect = () => {
    this.ws = new WebSocket("ws:/127.0.0.1:5000/ws");
    this.ws.addEventListener("open", this.handleWebsocketOpen);
    this.ws.addEventListener("close", this.handleWebsocketClose);
    this.ws.addEventListener("error", this.handleWebsocketError);
  };

  handleWebsocketOpen = (e: Event) => {
    this.dispatch?.(GatewayOpened(this.ws as WebSocket));
    this.retryCounter = 0;
  };

  handleWebsocketClose = (e: Event) => {
    this.dispatch?.(GatewayClosed());
    const retryAfter = (this.retryCounter === 0 ? 0 : this.retryCounter * 5) * 1000;
    this.dispatch?.(GatewayWillRetry(new Date().getTime() + retryAfter));
    setTimeout(() => {
      this.connect();
    }, retryAfter);
    this.retryCounter++;
  };

  handleWebsocketError = (e: Event) => {
    const ws = e.target as WebSocket;
  };
}

const GatewayInit = () => {
  return {
    type: GATEWAY_INIT,
  };
};

const GatewayOpened = (ws: WebSocket) => {
  return {
    type: GATEWAY_OPENED,
    payload: {
      ws,
    },
  };
};

const GatewayClosed = (): Action => {
  return {
    type: GATEWAY_CLOSED,
  };
};

const GatewayWillRetry = (willRetryAt: number): Action => {
  return {
    type: GATEWAY_WILL_RETRY,
    payload: {
      willRetryAt,
    },
  };
};

interface GatewayStateInterface {
  ws: WebSocket | null;
  initiated: boolean;
  willRetryAt: number;
}

const State: GatewayStateInterface = {
  ws: null,
  initiated: false,
  willRetryAt: 0,
};

const GatewayReducer = (
  state = State,
  action: Action
): GatewayStateInterface => {
  switch (action.type) {
    case GATEWAY_OPENED:
      return {
        ...state,
        ws: action.payload?.ws,
      };

    case GATEWAY_INIT:
      return {
        ...state,
        initiated: true,
      };

    case GATEWAY_WILL_RETRY:
      return {
        ...state,
        willRetryAt: action.payload?.willRetryAt,
      };

    case GATEWAY_CLOSED:
      return {
        ...state,
        ws: null,
      };

    default:
      return state;
  }
};

export default GatewayReducer;
export { Gateway };
export type { GatewayStateInterface };
