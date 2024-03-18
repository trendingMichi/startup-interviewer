import type SenderEnum from "./SenderEnum";

class MessageClass {
     timestamp: Date;
     content: string;
     sender: SenderEnum;
     state: boolean;
     position: number;
     files: string[]
     constructor(timestamp: Date, content: string, sender: SenderEnum, state:boolean, position: number, files: string[]) {
          this.timestamp = timestamp;
          this.content = content;
          this.sender = sender;
          this.state = state;
          this.position = position;
          this.files = files
     }
}

export default MessageClass;