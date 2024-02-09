import type SenderEnum from "./SenderEnum";

class MessageClass {
     timestamp: Date;
     content: string;
     sender: SenderEnum;
     state: boolean;
     constructor(timestamp: Date, content: string, sender: SenderEnum, state:boolean) {
          this.timestamp = timestamp;
          this.content = content;
          this.sender = sender;
          this.state = state
     }
}

export default MessageClass;