import type SenderEnum from "./SenderEnum";

class MessageClass {
     timestamp: Date;
     content: string;
     sender: SenderEnum;

     constructor(timestamp: Date, content: string, sender: SenderEnum) {
          this.timestamp = timestamp;
          this.content = content;
          this.sender = sender;
     }
}

export default MessageClass;