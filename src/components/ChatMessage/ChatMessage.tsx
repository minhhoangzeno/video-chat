import "./index.css";

interface IChatMessageProps {
  left: any;
  text: any;
  msgId: any;
  componentRef: string;
}
const ChatMessage = ({ left, text, componentRef }: IChatMessageProps) => {
  return (
    <div
      className={`message ${left && left === true ? "ml" : "mr"}`}
      id={componentRef}
    >
      {text}
    </div>
  );
};

export default ChatMessage;
