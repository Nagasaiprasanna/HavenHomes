// // routes/userRoutes.js
// const express = require('express');
// const router = express.Router();
// const authenticate = require('../middleware/authenticate');
// const User = require('../models/user');
// const DeletedUser = require('../models/DeletedUser');

// router.delete('/delete', authenticate, async (req, res) => {
//   try {
//     const user = req.user;

//     // Save user data to DeletedUser collection
//     const deletedUser = new DeletedUser({
//       originalUserId: user._id,
//       name: user.name,
//       email: user.email,
//       // add other fields if needed
//     });
//     await deletedUser.save();

//     // Now delete user from User collection
//     await User.findByIdAndDelete(user._id);

//     res.status(200).json({ message: 'Account deleted successfully' });
//   } catch (error) {
//     console.error('Delete account error:', error);
//     res.status(500).json({ message: 'Server error deleting account' });
//   }
// });

// module.exports = router;


// // 🔥 DELETE user by username (for account deletion)
// // router.delete("/delete/:username", async (req, res) => {
// //   const { username } = req.params;

// //   try {
// //     // First find the user to get details before deletion if needed
// //     const user = await User.findOne({ username });
    
// //     if (!user) {
// //       return res.status(404).json({ 
// //         success: false,
// //         message: "User not found.",
// //         username: username
// //       });
// //     }

// //     // Perform deletion
// //     const deletedUser = await User.findOneAndDelete({ username });

// //     res.status(200).json({ 
// //       success: true,
// //       message: "Account deleted successfully.",
// //       deletedUser: {
// //         username: deletedUser.username,
// //         contactNo: deletedUser.contactNo,
// //         id: deletedUser._id
// //       }
// //     });
// //   } catch (error) {
// //     console.error("Error deleting account:", error);
// //     res.status(500).json({ 
// //       success: false,
// //       message: "Server error while deleting account.",
// //       error: error.message // Include error message for debugging
// //     });
// //   }
// // });
// // module.exports = router;

// routes/userRoutes.js
// // File: routes/userRoutes.js
// const express = require('express');
// const router = express.Router();
// const User = require('../models/user');
// const DeletedUser = require('../models/DeletedUser');
// const authenticate = require('../middleware/authenticate');

// // DELETE /api/users/delete
// router.delete('/delete', authenticate, async (req, res) => {
//   try {
//     const userId = req.user._id;
//     const user = await User.findById(userId);

//     if (!user) {
//       return res.status(404).json({ message: 'User not found' });
//     }

//     // Store the user data in DeletedUser before deletion
//     const deletedUser = new DeletedUser({
//       originalUserId: user._id,
//       name: user.name,
//       email: user.email,
//       phone: user.phone,
//       deletedAt: new Date(),
//     });

//     await deletedUser.save();
//     await User.findByIdAndDelete(userId);

//     res.status(200).json({ message: 'Account deleted successfully' });
//   } catch (error) {
//     console.error('Error deleting account:', error);
//     res.status(500).json({ message: 'Server error' });
//   }
// });

// module.exports = router;


// File: routes/userRoutes.js
const express = require('express');
const router = express.Router();
const User = require('../models/user');
const DeletedUser = require('../models/DeletedUser');
const authenticate = require('../middleware/authenticate');

// DELETE /api/user/delete
router.delete('/delete', authenticate, async (req, res) => {
  try {
    const userId = req.user._id;
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Store user data in DeletedUser before deletion
    const deletedUser = new DeletedUser({
      originalUserId: user._id,
      name: user.name,
      email: user.email,
      phone: user.phone,
      role: user.role,
      createdAt: user.createdAt,
      deletedAt: new Date(),
    });

    await deletedUser.save();
    await User.findByIdAndDelete(userId);

    res.status(200).json({ message: 'Account deleted successfully' });
  } catch (error) {
    console.error('Error deleting account:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
