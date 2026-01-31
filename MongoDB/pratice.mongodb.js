

// use("school");
// db.getCollection("students").deleteMany({});
// db.getCollection("students").insertMany([
//   { name: "Rahul", age: 20, city: "Delhi" },
//   { name: "Amit", age: 17, city: "Mumbai" },
//   { name: "Priya", age: 22, city: "Pune" },
//   { name: "Neha", age: 19, city: "Ahmedabad" },
//   { name: "Karan", age: 21, city: "Jaipur" },
//   { name: "shreya", age: 21, city: "ahmedabad" },
//   { name: "dipal", age: 21, city: "ahmedabad" },
//   { name: "dipal", age: 21, city: "ahmedabad" }
// ]);

// db.students.find()

// db.students.deleteOne({name: "dipal", age: 21, city: "ahmedabad"})


// db.students.updateOne({ name: "dipal" }, { $set: { age: 23 } })



use("school");

// db.getCollection("students").deleteMany({});   // clean

// db.getCollection("students").insertMany([
//   { name: "Rahul", age: 20, city: "Delhi", marks: 80 },
//   { name: "Amit", age: 17, city: "Delhi", marks: 60 },
//   { name: "Priya", age: 22, city: "Pune", marks: 90 },
//   { name: "Neha", age: 19, city: "Pune", marks: 70 },
//   { name: "Karan", age: 21, city: "Delhi", marks: 85 }
// ]);

// age>18

// db.students.aggregate([
//   { $match: { age: { $gt: 18 } } }
// ]);


// Show only name and marks

// db.students.aggregate([
//   { $project: { name: 1, marks: 1, _id: 0 } }
// ])

// City wise total students
// Pehla Delhi student mila → total = 0 + 1 = 1
// Dusra Delhi student mila → total = 1 + 1 = 2
// Teesra Delhi student mila → total = 2 + 1 = 3

// db.students.aggregate([
//   {
//     $group: {
//       _id: "$city",
//       totalStudents: { $sum: 1 }
//     }
//   }
// ])

// City wise total marks

// db.students.aggregate([
//   {
//     $group: {
//       _id: "$city",
//       totalMarks: { $sum: "$marks" }
//     }
//   }
// ])

// City wise average marks

// db.students.aggregate([
//   {
//     $group: {
//       _id: "$city",
//       avgMarks: { $avg: "$marks" }
//     }
//   }
// ])

// Find minimum and maximum marks

// db.students.aggregate([
//   {
//     $group: {
//       _id: null,
//       minMarks: { $min: "$marks" },
//       maxMarks: { $max: "$marks" }
//     }
//   }
// ])


// Sort by marks descending

// db.students.aggregate([
//   { $sort: { marks: 1 } }
// ])

// Top 3 students

// db.students.aggregate([
//   { $sort: { marks: -1 } },
//   { $limit: 3 }
// ])

// Total students

// db.students.aggregate([
//   { $count: "totalStudents" }
// ])

// City wise average marks of students whose age > 18, sorted by avgMarks

// db.students.aggregate([
//   { $match: { age: { $gt: 18 } } },
//   {
//     $group: {
//       _id: "$city",
//       avgMarks: { $avg: "$marks" }
//     }
//   },
//   { $sort: { avgMarks: -1 } }
// ])

// Ek collection ka data dusre collection se jodna

// db.students.aggregate([
//   {
//     $lookup: {
//       from: "cities",
//       localField: "city",
//       foreignField: "city",
//       as: "cityDetails"
//     }
//   }
// ]);


// Array ke har item ko separate document bana deta hai

// db.orders.aggregate([
//   { $unwind: "$items" }
// ])

// New field add karna

// db.students.aggregate([
//   {
//     $addFields: {
//       result: "PASS"
//     }
//   }
// ])


// IF ELSE

// db.students.aggregate([
//   {
//     $addFields: {
//       status: { $cond: [ { $gte: ["$marks", 60] }, "PASS", "FAIL" ] }
//     }
//   }
// ])

// Ek hi data pe multiple queries

// db.students.aggregate([
//   {
//     $facet: {
//       topStudents: [ { $sort: { marks: -1 } }, { $limit: 3 } ],
//       totalCount: [ { $count: "count" } ]
//     }
//   }
// ])

// Data ko range me baantna

// db.students.aggregate([
//   {
//     $bucket: {
//       groupBy: "$marks",
//       boundaries: [0, 50, 70, 100],
//       default: "Other",
//       output: {
//         count: { $sum: 1 }
//       }
//     }
//   }
// ])

// Root object change

// db.orders.aggregate([
//   { $replaceRoot: { newRoot: "$userData" } }
// ])


// Result save karna

//   db.students.aggregate([
//   { $match: { age: { $gt: 18 } } },
//   { $out: "adult_students" }
// ])

// Array me se filter

// db.orders.aggregate([
//   {
//     $project: {
//       items: {
//         $filter: {
//           input: "$items",
//           as: "item",
//           cond: { $gt: ["$$item.price", 1000] }
//         }
//       }
//     }
//   }
// ])

// Array transform karna

// db.students.aggregate([
//   {
//     $project: {
//       marksPlus10: {
//         $map: {
//           input: "$marksArray",
//           as: "m",
//           in: { $add: ["$$m", 10] }
//         }
//       }
//     }
//   }
// ])

// Top 3 students (highest marks)

//   db.students.aggregate([
//   { $sort: { marks: -1 } },
//   { $limit: 3 }
// ])

// Kitne records chhod dene hain

// db.students.aggregate([
//   { $sort: { marks: -1 } },
//   { $skip: 2 }
// ])

// db.runCommand({
//   collMod:"students",
//   validator: {
//     $jsonSchema: {
//         bsonType: "object",
//         required: ["name", "age", "city"],
//         properties: {
//             name: {
//                 bsonType: "string",
//                 description: "must be a string and is required"
//             },
//             age: {
//                 bsonType: "int",
//                 minimum: 0,
//                 description: "must be an integer >= 0 and is required"
//             },
//             city: {
//                 bsonType: "string",
//                 description: "must be a string and is required"
//             }
//         }
//     }
//   }
// })

db.students.insertOne({
     name : "Disha",
     age : 10,
     city : 113
 });







