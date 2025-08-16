import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';
import './App.css';
import FriendList from './components/FriendList/FriendList';
import ChatWindow from './components/ChatWindow/ChatWindow';
import MessageInput from './components/MessageInput/MessageInput';
import Login from './components/Login/Login';

const socket = io('http://localhost:3000');

interface Message {
  from: string;
  message: string;
}

function App() {
  const [username, setUsername] = useState('');
  const [friends, setFriends] = useState<string[]>([]);
  const [messages, setMessages] = useState<Message[]>([]);
  const [selectedFriend, setSelectedFriend] = useState<string | null>(null);

  useEffect(() => {
    const storedUsername = localStorage.getItem('username');
    if (storedUsername) {
      handleLogin(storedUsername);
    }
  }, []);

  useEffect(() => {
    if (!username) return;

    socket.on('users', (users: string[]) => {
      setFriends(users.filter((u) => u !== username));
    });

    socket.on('private_message', (message: Message) => {
      if (message.from === selectedFriend || message.from === username) {
        setMessages((prevMessages) => [...prevMessages, message]);
      }
    });

    socket.on('history', (history: Message[]) => {
      setMessages(history);
    });

    return () => {
      socket.off('users');
      socket.off('private_message');
      socket.off('history');
    };
  }, [username, selectedFriend]);

  const handleLogin = (user: string) => {
    setUsername(user);
    localStorage.setItem('username', user);
    socket.emit('register', user);
  };

  const handleSelectFriend = (friend: string) => {
    setSelectedFriend(friend);
    setMessages([]);
    socket.emit('get_history', friend);
  };

  const handleSendMessage = (text: string) => {
    if (selectedFriend) {
      const newMessage: Message = {
        from: username,
        message: text,
      };
      socket.emit('private_message', { to: selectedFriend, message: text });
      setMessages((prevMessages) => [...prevMessages, newMessage]);
    }
  };

  if (!username) {
    return <Login onLogin={handleLogin} />;
  }

  return (
    <div className="app">
      <FriendList friends={friends.map(f => ({ id: f, name: f }))} onSelectFriend={(friend) => handleSelectFriend(friend.name)} selectedFriend={selectedFriend} currentUser={username} />
      <div className="chat-container">
        {selectedFriend ? (
          <>
            <ChatWindow messages={messages.map((m, i) => ({ id: i, text: m.message, sender: m.from === username ? 'user' : 'friend' }))} />
            <MessageInput onSendMessage={handleSendMessage} />
          </>
        ) : (
          <div className="no-friend-selected">Select a friend to start chatting</div>
        )}
      </div>
    </div>
  );
}

export default App;
