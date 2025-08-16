import React from 'react';

interface Message {
  id: number;
  text: string;
  sender: 'user' | 'friend';
}

interface ChatWindowProps {
  messages: Message[];
}

const ChatWindow: React.FC<ChatWindowProps> = ({ messages }) => {
  return (
    <div className="chat-window">
      <div className="messages">
        {messages.map((message) => (
          <div key={message.id} className={`message ${message.sender}`}>
            {message.text}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ChatWindow;
