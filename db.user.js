const users = [
  { id: 1, username: "user1", password: "password1" },
  { id: 2, username: "user2", password: "password2" },
  // Add more user objects if needed
];

// Find user by username
const findUser = (username) => {
  return users.find((user) => user.username === username);
};

module.exports = { findUser };
