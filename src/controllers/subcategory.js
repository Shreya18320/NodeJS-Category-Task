// const express = require("express");
// const router = express.Router();
// const db = require("../config/db");


// router.get("/", (req, res) => {
  
//   const sql = "SELECT * FROM subcategories";
//   db.query(sql, (err, result) => {
//     if (err) {
//       return res.status(500).json({ success: false });
//     }

//     res.json({
//       success: true,
//       data: result
//     });
//   });
// });

// // pagination
// router.get("/:category_id", (req, res) => {
//   const categoryId = req.params.category_id;

//   const page = parseInt(req.query.page) || 1;
//   const limit = parseInt(req.query.limit) || 5;
//   const offset = (page - 1) * limit;


//   const countSql =
//     "SELECT COUNT(id) AS total FROM subcategories WHERE category_id = ?";

//   db.query(countSql, [categoryId], (err, countResult) => {
//     if (err) {
//       return res.status(500).json({ success: false });
//     }

//     const totalRecords = countResult[0].total;
//     const totalPages = Math.ceil(totalRecords / limit);

//     const dataSql =
//       "SELECT * FROM subcategories WHERE category_id = ? LIMIT ? OFFSET ?";

//     db.query(dataSql, [categoryId, limit, offset], (err, dataResult) => {
//       if (err) {
//         return res.status(500).json({ success: false });
//       }

//       res.json({
//         success: true,
//         pagination: {
//           totalRecords,
//           totalPages,
//           currentPage: page,
//           limit
//         },
//         data: dataResult
//       });
//     });
//   });
// });



// // searching , shorting
// router.get("/search/items", (req, res) => {
//   const search = req.query.search || "";

//   let order = req.query.order || "ASC";
//   order = order.toUpperCase() === "DESC" ? "DESC" : "ASC";

//   const sql = `
//     SELECT 
//       s.id AS subcategory_id,
//       s.name AS subcategory_name,
//       i.id AS item_id,
//       i.name AS item_name,
//       i.price
//     FROM subcategories s
//     JOIN items i
//     ON s.id = i.subcategory_id
//     WHERE s.name LIKE ?
//     ORDER BY i.price ${order}
//   `;

//   db.query(sql, [`%${search}%`], (err, result) => {
//     if (err) {
//       return res.status(500).json({ success: false });
//     }

//     res.json({
//       success: true,
//       sortBy: "price",
//       order,
//       data: result
//     });
//   });
// });



// module.exports = router;





//const express = require("express");
// const router = express.Router();
// const db = require("../config/db");


//  get api

// router.get("/", (req, res) => {
//   const sql = "SELECT * FROM subcategories";

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

// post api

// router.post("/", (req, res) => {
//   const name = req.body.name;
//   const category_id = req.body.category_id;

//   const sql = "INSERT INTO subcategories (name, category_id) VALUES (?, ?)";

//   db.query(sql, [name, category_id], (err, result) => {
//     if (err) {
//       res.status(500).json({ success: false });
//     } else {
//       res.json({
//         success: true,
//         message: "Subcategory added"
//       });
//     }
//   });
// });

// // update category
// router.put("/:id", (req, res) => {
//   const id = req.params.id;
//   const name = req.body.name;
//   const category_id = req.body.category_id;

//   const sql = "UPDATE subcategories SET name = ?, category_id = ? WHERE id = ?";

//   db.query(sql, [name, category_id, id], (err, result) => {
//     if (err) {
//       res.status(500).json({ success: false });
//     } else {
//       res.json({
//         success: true,
//         message: "Subcategory updated"
//       });
//     }
//   });
// });

// module.exports = router;



const db = require("../config/db");

// GET ALL
exports.getSubCategories = (req, res) => {
  const sql = "SELECT * FROM subcategories";

  db.query(sql, (err, result) => {
    if (err) return res.status(500).json({ success: false });
    res.json(result);
  });
};

// PAGINATION
exports.getSubCategoriesWithpagination = (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 5;

  const offset =(page - 1) * limit;
 
//   if(page===1){
//     limit=10,
//     offset=0
//   }

// else{
//   limit=12,
//   offset=10+(page-2)*12
// }
  
  
  
  const sql = "SELECT * FROM subcategories LIMIT ? OFFSET ?";

  db.query(sql, [limit, offset], (err, result) => {
    if (err) return res.status(500).json({ success: false });
    res.json(result);
  });
};

// POST
exports.addSubcategory = (req, res) => {
  const { name, category_id } = req.body;

  const sql = "INSERT INTO subcategories (name, category_id) VALUES (?, ?)";

  db.query(sql, [name, category_id], (err) => {
    if (err) res.status(500).json({ success: false });
    else res.json({ success: true });
  });
};

// UPDATE
// exports.updateSubcategory = (req, res) => {
//   const { name, category_id } = req.body;
//   const id = req.params.id;

//   const sql = "UPDATE subcategories SET name = ?, category_id = ? WHERE id = ?";

//   db.query(sql, [name, category_id, id], (err) => {
//     if (err) res.status(500).json({ success: false });
//     else res.json({ success: true });
//   });
// };

exports.updateSubcategory = (req, res) => {
  const { name, category_id } = req.body;
  const id = req.params.id;

  console.log("BODY:", req.body);
  console.log("PARAM ID:", id);

  const sql = "UPDATE subcategories SET name = ?, category_id = ? WHERE id = ?";

  db.query(sql, [name, category_id, id], (err, result) => {
    if (err) {
      console.error("DB ERROR:", err);
      return res.status(500).json({ success: false, message: "DB error" });
    }

    return res.json({ success: true, message: "Subcategory updated" });
  });
};


// DELETE
exports.deleteSubcategory = (req, res) => {
  const id = req.params.id;

  const sql = "DELETE FROM subcategories WHERE id = ?";

  db.query(sql, [id], (err) => {
    if (err) res.status(500).json({ success: false });
    else res.json({ success: true });
  });
};





// searching and shorting

exports.searchSubcategory = (req, res) => {
  const search = req.query.search || "";

  let order = req.query.order || "ASC";
  order = order.toUpperCase() === "DESC" ? "DESC" : "ASC";

  const sql = `
    SELECT 
      s.id AS subcategory_id,
      s.name AS subcategory_name,
      i.id AS item_id,
      i.name AS item_name,
      i.price
    FROM subcategories s
    JOIN items i
    ON s.id = i.subcategory_id
    WHERE s.name LIKE ?
    ORDER BY i.price ${order}
  `;

  db.query(sql, [`%${search}%`], (err, result) => {
    if (err) {
      return res.status(500).json({ success: false });
    }

    res.json({
      success: true,
      sortBy: "price",
      order,
      data: result
    });
  });
}


