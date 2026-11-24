// import { app } from "../config/firebase.js";
// import { getAuth } from "firebase-admin/auth";
// import userModel from "../models/user-model.js";
// import crypto from "crypto";
// import redis from "../../../shared/redis/redis.js";

// export const login = async (req, res) => {
//   try {
//     const { token } = req.body;
//     const decoded = await getAuth(app).verifyIdToken(token);
//     // deoced me tokn ka sra value hoga name id wrega decoded.name like that

//     // ab user register ko karo login hai toh redict krdo

//     let user = await userModel.findOne({
//       firebaseUid: decoded.uid,
//     });

//     if (!user) {
//       user = await userModel.create({
//         firebaseUid: decoded.uid,
//         name: decoded.name,
//         email: decoded.email,
//       });
//     }
//     // how to currnet user exists like jwt token genarte cookies me check karthe
//     const sessionId = crypto.randomUUID();

//     await redis.set(
//       `session:${sessionId}`,
//       JSON.stringify({
//         userId: user._id,
//         name: user.name,
//         email: user.email,
//         interviewCoin: user.interviewCoin,
//       }),
//       "EX",
//       7 * 24 * 60 * 60,
//     );
// res.cookie("session", sessionId, {
//     httpOnly: true,
//     secure: true,
//     sameSite: "none",
//     maxAge: 7 * 24 * 60 * 60 * 1000,
//     path: "/"
// });

//     return res.status(200).json({
//       success: true,
//       user,
//     });
//   } catch (error) {
//     console.error("LOGIN ERROR:", error);
//     return res.status(500).json({ message: error.message });
//   }
// };

// export const logOut = async (req, res) => {
//   // sesssion or or rdis me setkiya data delete krna hai
//   try {
//     const sessionId = req.cookies?.session;
//     if (sessionId) {
//       await redis.del(`session:${sessionId}`);
//     }
//     res.clearCookie("session", {
//       httpOnly: true,
//       secure: true,
//       sameSite: "none",
//     });

//     return res.status(200).json({
//       success: true,
//       message: "Logout Succesfully",
//     });
//   } catch (error) {
//     return res.status(500).json({
//       success: false,
//       message: error.message,
//     });
//   }
// };

// export const useCoins = async (req, res) => {
//   try {
//     const sessionId = req.cookies?.session;
//     if (!sessionId) {
//       return res.status(401).json({
//         message: "Unauthroized",
//       });
//     }

//     const session = await redis.get(`session:${sessionId}`);

//     const sessionData = JSON.parse(session);
//     const { coins, action } = req.body;
//     if (!coins) {
//       return res.status(400).json({
//         success: false,
//         message: "Coins are required",
//       });
//     }

//     const user = await userModel.findById(sessionData.userId);

//     if (!user) {
//       return res.status(404).json({
//         success: false,
//         message: "User not found",
//       });
//     }

//     // Not enough coins
//     if (user.interviewCoin < coins) {
//       return res.status(403).json({
//         success: false,
//         message: "Not enough interview coins",
//         interviewCoin: user.interviewCoin,
//       });
//     }

//     // deducte coins

//     user.interviewCoin -= coins;
//     await user.save();
//     //   itnna me abhi mongo db me change hue
//     //   ab frontend me change krne ke liya session ne bhe chanhe kr aha hoga jo redis me hai

//     await redis.set(
//   `session:${sessionId}`,
//   JSON.stringify({
//     userId: user._id,
//     name: user.name,
//     email: user.email,
//     interviewCoin: user.interviewCoin,
//   }),
//   "EX",
//   7 * 24 * 60 * 60
// );

//     return res.status(200).json({
//       success: true,
//       action,
//       message: "Coins added successfully",
//       interviewCoin: user.interviewCoin,
//     });
//   } catch (error) {
//     console.log(error.message);

//     return res.status(500).json({
//       success: false,
//       message: error.message,
//     });
//   }
// };


// export const addCoins = async (req,res)=>{
//   try {
    
//    const sessionId = req.cookies?.session;

//     const session = await redis.get(`session:${sessionId}`);

//     if (!session) {
//       return res.status(401).json({
//         success: false,
//         message: "Session expired",
//       });
//     }

//     const sessionData = JSON.parse(session);

//     const { coins } = req.body;

//     if (!coins || coins <= 0) {
//       return res.status(400).json({
//         success: false,
//         message: "Valid coins are required",
//       });
//     }

//     const user = await userModel.findById(sessionData.userId)

//  if (!user) {
//       return res.status(404).json({
//         success: false,
//         message: "User not found",
//       });
//     }

//     user.interviewCoin += Number(coins);

//     await user.save()

//     redis.get(`session:${sessionId}`,
//       JSON.stringify({
//         userId:user._id,
//         name:user.name,
//         email:user.email,
//         interviewCoin:user.interviewCoin,
//       }) ,"EX", 7* 24 * 60 *60
//     )

// return res.status(200).json({
//       success: true,
//       message: "Coins added successfully",
//       interviewCoin: user.interviewCoin,
//     });
//   } catch (error) {
//     return res.status(500).json({
//       success: false,
//       message: error.message,
//     });
    
//   }
// }

import { app } from "../config/firebase.js";
import { getAuth } from "firebase-admin/auth";
import userModel from "../models/user-model.js";
import crypto from "crypto";
import redis from "../../../shared/redis/redis.js";

const SESSION_EXPIRY = 7 * 24 * 60 * 60;

const isProduction = process.env.NODE_ENV === "production";

const cookieOptions = {
  httpOnly: true,
  secure: isProduction,
  sameSite: isProduction ? "none" : "lax",
  maxAge: SESSION_EXPIRY * 1000,
  path: "/",
};

// LOGIN
export const login = async (req, res) => {
  try {
    const { token } = req.body;

    if (!token) {
      return res.status(400).json({
        success: false,
        message: "Firebase token is required",
      });
    }

    const decoded = await getAuth(app).verifyIdToken(token);

    let user = await userModel.findOne({
      firebaseUid: decoded.uid,
    });

    if (!user) {
      user = await userModel.create({
        firebaseUid: decoded.uid,
        name: decoded.name,
        email: decoded.email,
      });
    }

    const sessionId = crypto.randomUUID();

    const sessionData = {
      userId: user._id.toString(),
      name: user.name,
      email: user.email,
      interviewCoin: user.interviewCoin,
    };

    await redis.set(
      `session:${sessionId}`,
      JSON.stringify(sessionData),
      "EX",
      SESSION_EXPIRY
    );

    res.cookie("session", sessionId, cookieOptions);

    return res.status(200).json({
      success: true,
      user,
    });

  } catch (error) {
    console.error("LOGIN ERROR:", error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// GET CURRENT USER
export const getMe = async (req, res) => {
  try {
    const sessionId = req.cookies?.session;

    if (!sessionId) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized. Please login.",
      });
    }

    const session = await redis.get(`session:${sessionId}`);

    if (!session) {
      res.clearCookie("session", cookieOptions);

      return res.status(401).json({
        success: false,
        message: "Session expired. Please login again.",
      });
    }

    const sessionData = JSON.parse(session);

    const user = await userModel.findById(sessionData.userId);

    if (!user) {
      await redis.del(`session:${sessionId}`);
      res.clearCookie("session", cookieOptions);

      return res.status(401).json({
        success: false,
        message: "User not found. Please login again.",
      });
    }

    return res.status(200).json({
      success: true,
      user,
    });

  } catch (error) {
    console.error("GET CURRENT USER ERROR:", error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// LOGOUT
export const logOut = async (req, res) => {
  try {
    const sessionId = req.cookies?.session;

    if (sessionId) {
      await redis.del(`session:${sessionId}`);
    }

    res.clearCookie("session", {
      httpOnly: true,
      secure: isProduction,
      sameSite: isProduction ? "none" : "lax",
      path: "/",
    });

    return res.status(200).json({
      success: true,
      message: "Logout successfully",
    });

  } catch (error) {
    console.error("LOGOUT ERROR:", error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// USE COINS
export const useCoins = async (req, res) => {
  try {
    const sessionId = req.cookies?.session;

    if (!sessionId) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized",
      });
    }

    const session = await redis.get(`session:${sessionId}`);

    if (!session) {
      return res.status(401).json({
        success: false,
        message: "Session expired",
      });
    }

    const sessionData = JSON.parse(session);

    const { coins, action } = req.body;

    if (!Number.isFinite(Number(coins)) || Number(coins) <= 0) {
      return res.status(400).json({
        success: false,
        message: "Valid coins are required",
      });
    }

    const user = await userModel.findById(sessionData.userId);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    if (user.interviewCoin < Number(coins)) {
      return res.status(403).json({
        success: false,
        message: "Not enough interview coins",
        interviewCoin: user.interviewCoin,
      });
    }

    user.interviewCoin -= Number(coins);

    await user.save();

    const updatedSession = {
      userId: user._id.toString(),
      name: user.name,
      email: user.email,
      interviewCoin: user.interviewCoin,
    };

    await redis.set(
      `session:${sessionId}`,
      JSON.stringify(updatedSession),
      "EX",
      SESSION_EXPIRY
    );

    return res.status(200).json({
      success: true,
      action,
      message: "Coins deducted successfully",
      interviewCoin: user.interviewCoin,
    });

  } catch (error) {
    console.error("USE COINS ERROR:", error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ADD COINS
export const addCoins = async (req, res) => {
  try {
    const sessionId = req.cookies?.session;

    if (!sessionId) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized",
      });
    }

    const session = await redis.get(`session:${sessionId}`);

    if (!session) {
      return res.status(401).json({
        success: false,
        message: "Session expired",
      });
    }

    const sessionData = JSON.parse(session);

    const { coins } = req.body;

    if (!Number.isFinite(Number(coins)) || Number(coins) <= 0) {
      return res.status(400).json({
        success: false,
        message: "Valid coins are required",
      });
    }

    const user = await userModel.findById(sessionData.userId);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    user.interviewCoin += Number(coins);

    await user.save();

    const updatedSession = {
      userId: user._id.toString(),
      name: user.name,
      email: user.email,
      interviewCoin: user.interviewCoin,
    };

    await redis.set(
      `session:${sessionId}`,
      JSON.stringify(updatedSession),
      "EX",
      SESSION_EXPIRY
    );

    return res.status(200).json({
      success: true,
      message: "Coins added successfully",
      interviewCoin: user.interviewCoin,
    });

  } catch (error) {
    console.error("ADD COINS ERROR:", error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
