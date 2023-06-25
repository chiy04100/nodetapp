import React, { useEffect, useState } from 'react';

interface User {
  id: number;
  name: string;
  age: number;
  email: string;
}

const UserList: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    const fetchUsers = () => {
      fetch('http://localhost/api/users')
        .then(response => response.json())
        .then(data => {
          setUsers(data);
        })
        .catch(error => {
          console.error('Error fetching users: ', error);
        });
    };

    fetchUsers();
  }, []);

  return (
    <div>
      <h2>User List</h2>
      <ul>
        {users.map((user) => (
          <li key={user.id}>
            <strong>{user.name}</strong> - {user.email} (Age: {user.age})
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UserList;
