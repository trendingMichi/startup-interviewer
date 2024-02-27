import type SenderEnum from "./SenderEnum";

class MessageClass {
     timestamp: Date;
     content: string;
     sender: SenderEnum;
     state: boolean;
     position: number;
     constructor(timestamp: Date, content: string, sender: SenderEnum, state:boolean, position: number) {
          this.timestamp = timestamp;
          this.content = content;
          this.sender = sender;
          this.state = state;
          this.position = position;
     }
}

export default MessageClass;