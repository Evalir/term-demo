import React from "react";
import { Terminal } from "xterm";
import "xterm/dist/xterm.css";
import { AttachAddon } from "xterm-addon-attach";

class XTerm extends React.Component {
  async componentDidMount() {
    const term = new Terminal({});
    const socket = new WebSocket("ws://localhost:8999");
    const attachAddon = new AttachAddon(socket);
    term.loadAddon(attachAddon);
    term.open(this.termElm);
    this.term = term;
  }

  render() {
    return (
      <div>
        <div style={{ padding: "10px" }}>
          <div ref={ref => (this.termElm = ref)}></div>
        </div>
      </div>
    );
  }
}

export default XTerm;
