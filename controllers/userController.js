// controllers/userController.js

const User = require('../models/User');

// @desc    Get all users
// @route   GET /api/users
// @access  Public
exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.findAll(); // Sequelize method
    res.status(200).json(users);
  } catch (error) {
    console.error('Error fetching users:', error);
    res.status(500).json({ message: 'Server Error' });
  }
};

// @desc    Create a new user
// @route   POST /api/users
// @access  Public
exports.createUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Create new user
    const newUser = await User.create({
      name,
      email,
      password, // In real projects, hash the password before saving!
    });

    res.status(201).json(newUser);
  } catch (error) {
    console.error('Error creating user:', error);
    res.status(500).json({ message: 'Server Error' });
  }
};

// @desc    Get a single user by ID
// @route   GET /api/users/:id
// @access  Public
exports.getUserById = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findByPk(id); // Sequelize method

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json(user);
  } catch (error) {
    console.error('Error fetching user:', error);
    res.status(500).json({ message: 'Server Error' });
  }
};

// @desc    Update a user by ID
// @route   PUT /api/users/:id
// @access  Public
exports.updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, email, password } = req.body;

    const user = await User.findByPk(id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    user.name = name || user.name;
    user.email = email || user.email;
    user.password = password || user.password; // In real projects, hash password

    await user.save();
    res.status(200).json(user);
  } catch (error) {
    console.error('Error updating user:', error);
    res.status(500).json({ message: 'Server Error' });
  }
};

// @desc    Delete a user by ID
// @route   DELETE /api/users/:id
// @access  Public
exports.deleteUser = async (req, res) => {
  try {
    const { id } = req.params;

    const user = await User.findByPk(id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    await user.destroy();
    res.status(200).json({ message: 'User deleted successfully' });
  } catch (error) {
    console.error('Error deleting user:', error);
    res.status(500).json({ message: 'Server Error' });
  }
};
