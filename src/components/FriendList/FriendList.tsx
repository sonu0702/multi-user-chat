import React from 'react';

interface Friend {
  id: string | number;
  name: string;
}

interface FriendListProps {
  friends: Friend[];
  onSelectFriend: (friend: Friend) => void;
  selectedFriend: string | null;
  currentUser: string;
}

const FriendList: React.FC<FriendListProps> = ({ friends, onSelectFriend, selectedFriend, currentUser }) => {
  return (
    <div className="friend-list">
      <div className="current-user">
        Logged in as: <strong>{currentUser}</strong>
      </div>
      <h2>Friends</h2>
      <ul>
        {friends.map((friend) => (
          <li
            key={friend.id}
            className={selectedFriend === friend.name ? 'selected' : ''}
            onClick={() => onSelectFriend(friend)}
          >
            {friend.name}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FriendList;
