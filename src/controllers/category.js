// // const express = require("express");
// // const router = express.Router();
// // const db = require("../config/db");
// // const multer = require("multer");
// // const path = require("path");


// // // ================= MULTER CONFIG (MUST BE BEFORE ROUTES) =================
// // const storage = multer.diskStorage({
// //   destination: (req, file, cb) => {
// //     cb(null, "uploads/");
// //   },
// //   filename: (req, file, cb) => {
// //     const ext = path.extname(file.originalname);
// //     cb(null, Date.now() + ext);
// //   }
// // });

// // // ✅ upload is CREATED HERE
// // const upload = multer({ storage: storage });


// // // ================= GET ALL CATEGORIES =================
// // router.get("/", (req, res) => {
// //   const sql = "SELECT * FROM categories";

// //   db.query(sql, (err, result) => {
// //     if (err) {
// //       console.error(err);
// //       return res.status(500).json({ success: false });
// //     }

// //     res.json({
// //       success: true,
// //       data: result
// //     });
// //   });
// // });


// // // ================= ADD CATEGORY (POST API) =================
// // router.post("/", upload.single("image"), (req, res) => {
// //   const name = req.body.name;

// //   if (!name) {
// //     return res.status(400).json({
// //       success: false,
// //       message: "Category name is required"
// //     });
// //   }

// //   if (!req.file) {
// //     return res.status(400).json({
// //       success: false,
// //       message: "Category image is required"
// //     });
// //   }

// //   const image = req.file.filename;

// //   const sql = "INSERT INTO categories (name, image) VALUES (?, ?)";

// //   db.query(sql, [name, image], (err, result) => {
// //     if (err) {
// //       console.error(err);
// //       return res.status(500).json({ success: false });
// //     }

// //     res.status(201).json({
// //       success: true,
// //       message: "Category added successfully",
// //       data: {
// //         id: result.insertId,
// //         name: name,
// //         image: image
// //       }
// //     });
// //   });
// // });


// // module.exports = router;


// const express = require("express");
// const router = express.Router();
// const db = require("../config/db");
// const multer = require("multer");


// // ===== Multer setup =====
// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, "uploads/");
//   },
//   filename: (req, file, cb) => {
//     cb(null, Date.now() + "_" + file.originalname);
//   }
// });

// const upload = multer({ storage: storage });


// //GET all categories
// router.get("/", (req, res) => {
//   const sql = "SELECT * FROM categories";

//   db.query(sql, (err, result) => {
//     if (err) {
//       res.status(500).json({ success: false });
//     } else {
//       res.json({
//         success: true,
//         data: result
//       });
//     }
//   });
// });


// //post category 
// router.post("/", upload.single("image"), (req, res) => {
//   const name = req.body.name;
//   const image = req.file.filename;

//   const sql = "INSERT INTO categories (name, image) VALUES (?, ?)";

//   db.query(sql, [name, image], (err, result) => {
//     if (err) {
//       res.status(500).json({ success: false });
//     } else {
//       res.json({
//         success: true,
//         message: "Category added"
//       });
//     }
//   });
// });

// // update category

// router.put("/:id", upload.single("image"), (req, res) => {
//   const id = req.params.id;
//   const name = req.body.name;
//   const image = req.file.filename;

//   const sql = "UPDATE categories SET name = ?, image = ? WHERE id = ?";

//   db.query(sql, [name, image, id], (err, result) => {
//     if (err) {
//       res.status(500).json({ success: false });
//     } else {
//       res.json({
//         success: true,
//         message: "Category updated"
//       });
//     }
//   });
// });


// // delete

// router.delete("/:id", (req, res) => {
//   const id = req.params.id;

//   const sql = "DELETE FROM categories WHERE id = ?";

//   db.query(sql, [id], (err, result) => {
//     if (err) {
//       res.status(500).json({ success: false });
//     } else {
//       res.json({
//         success: true,
//         message: "Category deleted"
//       });
//     }
//   });
// });



// module.exports = router;



const response = require("../common/response");
const db = require("../config/db");

// GET
exports.getCategories = (req, res) => {
  const sql = "SELECT * FROM categories";

  db.query(sql, (err, result) => {
    if (err) {
      return response.sendError(res, "Failed to fetch categories");
    }

    return response.sendSuccess(res,"Categories fetched successfully", result);
  });
};

// POST

exports.addCategory = (req, res) => {
  const name = req.body.name;
  const image = req.file ? req.file.filename : null;

  if (!name || name.trim() === "") {
    return response.sendError(res, "Name is required", 400);
  }
  if (!image) {
    return response.sendError(res, "Image is required", 400);
  }

  const sql = "INSERT INTO categories (name, image) VALUES (?, ?)";

  db.query(sql, [name, image], (err) => {
    if (err) {
      return response.sendError(res, "Failed to add category");
    }

    return response.sendSuccess(res, "Category added successfully");
  });
};


// UPDATE
exports.updateCategory = (req, res) => {
  const id = req.params.id;
  const name = req.body.name;
  const image = req.file ? req.file.filename : null;

  // Validation
  if (!id) {
    return response.sendError(res, "ID is required", 400);
  }

  if (!name || name.trim() === "") {
    return response.sendError(res, "Name is required", 400);
  }
  

  const sql = "UPDATE categories SET name = ?, image = ? WHERE id = ?";

  db.query(sql, [name, image, id], (err, result) => {
    if (err) {
      return response.sendError(res, "Failed to update category");
    }

    // If ID not found
    if (result.affectedRows === 0) {
      return response.sendError(res, "Category not found", 404);
    }

    return response.sendSuccess(res, "Category updated successfully");
  });
};


// DELETE
exports.deleteCategory = (req, res) => {
  const id = req.params.id;

  // Validation
  if (!id) {
    return response.sendError(res, "ID is required", 400);
  }

  const sql = "DELETE FROM categories WHERE id = ?";

  db.query(sql, [id], (err, result) => {
    if (err) {
      return response.sendError(res, "Failed to delete category");
    }

    // If ID not found
    if (result.affectedRows === 0) {
      return response.sendError(res, "Category not found", 404);
    }

    return response.sendSuccess(res, "Category deleted successfully");
  });
};

