// import multer from "multer";

// const storage = multer.memoryStorage();
// export const Upload = multer({ storage }).fields([
//   { name: "profilePhoto", maxCount: 1 },
//   { name: "resume", maxCount: 1 },
// ]);
// export const singleUpload = multer({ storage }).single("file");


// multer.js

import multer from "multer";

const storage = multer.memoryStorage();

// Correct usage of .any() - no arguments needed
export const Upload = multer({ storage }).any();

export const singleUpload = multer({ storage }).single("file");