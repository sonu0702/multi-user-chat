export interface Friend {
  id: number;
  name: string;
}

export interface Message {
  id: number;
  text: string;
  sender: 'user' | 'friend';
  friendId: number;
}

export const friends: Friend[] = [
  { id: 1, name: 'Alice' },
  { id: 2, name: 'Bob' },
  { id: 3, name: 'Charlie' },
];

export const messages: Message[] = [
  { id: 1, text: 'Hey!', sender: 'friend', friendId: 1 },
  { id: 2, text: 'Hi Alice!', sender: 'user', friendId: 1 },
  { id: 3, text: 'How are you?', sender: 'friend', friendId: 1 },
  { id: 4, text: 'Good, thanks! You?', sender: 'user', friendId: 1 },
  { id: 5, text: 'Hello there!', sender: 'friend', friendId: 2 },
  { id: 6, text: 'Hey Bob!', sender: 'user', friendId: 2 },
  { id: 7, text: 'What\'s up?', sender: 'friend', friendId: 3 },
];
