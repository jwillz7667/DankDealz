const User = require('../models/userModel');
const generateToken = require('../utils/generateToken');

// @desc    Register a new user
// @route   POST /api/users/register
// @access  Public
const registerUser = async (req, res) => {
  try {
    const { name, email, password, dateOfBirth } = req.body;

    const userExists = await User.findOne({ email });

    if (userExists) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Check if user is at least 21 years old
    const birthDate = new Date(dateOfBirth);
    const ageDifMs = Date.now() - birthDate.getTime();
    const ageDate = new Date(ageDifMs);
    const age = Math.abs(ageDate.getUTCFullYear() - 1970);

    if (age < 21) {
      return res.status(400).json({ message: 'You must be at least 21 years old to register' });
    }

    const user = await User.create({
      name,
      email,
      password,
      dateOfBirth
    });

    if (user) {
      res.status(201).json({
        _id: user._id,
        name: user.name,
        email: user.email,
        token: generateToken(user._id),
      });
    } else {
      res.status(400).json({ message: 'Invalid user data' });
    }
  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({ message: 'Server error during registration' });
  }
};

// @desc    Auth user & get token
// @route   POST /api/users/login
// @access  Public
const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });

    if (user && (await user.matchPassword(password))) {
      res.json({
        _id: user._id,
        name: user.name,
        email: user.email,
        isSupplier: user.isSupplier,
        token: generateToken(user._id),
      });
    } else {
      res.status(401).json({ message: 'Invalid email or password' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Get user profile
// @route   GET /api/users/profile
// @access  Private
const getUserProfile = async (req, res) => {
  const user = await User.findById(req.user._id);

  if (user) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      dateOfBirth: user.dateOfBirth,
      isSupplier: user.isSupplier,
      profilePicture: user.profilePicture,
      deliveryAddress: user.deliveryAddress,
      phoneNumber: user.phoneNumber,
    });
  } else {
    res.status(404);
    throw new Error('User not found');
  }
};

// @desc    Update user profile
// @route   PUT /api/users/profile
// @access  Private
const updateUserProfile = async (req, res) => {
  const user = await User.findById(req.user._id);

  if (user) {
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;
    user.profilePicture = req.body.profilePicture || user.profilePicture;
    user.deliveryAddress = req.body.deliveryAddress || user.deliveryAddress;
    user.phoneNumber = req.body.phoneNumber || user.phoneNumber;

    if (req.body.password) {
      user.password = req.body.password;
    }

    const updatedUser = await user.save();

    res.json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      isSupplier: updatedUser.isSupplier,
      profilePicture: updatedUser.profilePicture,
      deliveryAddress: updatedUser.deliveryAddress,
      phoneNumber: updatedUser.phoneNumber,
      token: generateToken(updatedUser._id),
    });
  } else {
    res.status(404);
    throw new Error('User not found');
  }
};

// @desc    Get user order history
// @route   GET /api/users/orders
// @access  Private
const getUserOrders = async (req, res) => {
  const Order = require('../models/orderModel');
  const orders = await Order.find({ user: req.user._id });
  res.json(orders);
};

const updateUserPreferences = async (req, res) => {
  const user = await User.findById(req.user._id);

  if (user) {
    user.preferences = req.body.preferences || user.preferences;
    const updatedUser = await user.save();

    res.json({
      _id: updatedUser._id,
      preferences: updatedUser.preferences
    });
  } else {
    res.status(404);
    throw new Error('User not found');
  }
};

const getFavoriteProducts = async (req, res) => {
  const user = await User.findById(req.user._id).populate('favoriteProducts');
  if (user) {
    res.json(user.favoriteProducts);
  } else {
    res.status(404);
    throw new Error('User not found');
  }
};

const addFavoriteProduct = async (req, res) => {
  const user = await User.findById(req.user._id);
  const productId = req.params.id;

  if (user && productId) {
    if (!user.favoriteProducts.includes(productId)) {
      user.favoriteProducts.push(productId);
      await user.save();
      res.status(200).json({ message: 'Product added to favorites' });
    } else {
      res.status(400).json({ message: 'Product already in favorites' });
    }
  } else {
    res.status(404);
    throw new Error('User or Product not found');
  }
};

const removeFavoriteProduct = async (req, res) => {
  const user = await User.findById(req.user._id);
  const productId = req.params.id;

  if (user && productId) {
    user.favoriteProducts = user.favoriteProducts.filter(
      (id) => id.toString() !== productId
    );
    await user.save();
    res.status(200).json({ message: 'Product removed from favorites' });
  } else {
    res.status(404);
    throw new Error('User or Product not found');
  }
};

module.exports = { 
  registerUser, 
  loginUser, 
  getUserProfile, 
  updateUserProfile, 
  getUserOrders,
  updateUserPreferences,
  getFavoriteProducts,
  addFavoriteProduct,
  removeFavoriteProduct
};
