module.exports={
    HOST:   "localhost",
    USER:   "root",
    PASSWORD:null,
    DB:     "testdb",
    dialect:"mysql",
    pool:{
        max: 5,
        min: 0,
        acquire: 30000,
        idel: 10000
    }
};
// module.exports={
//     HOST:   "localhost",
//     USER:   "rootroot",
//     PASSWORD:"password",
//     DB:     "testdb",
//     dialect:"mysql",
//     pool:{
//         max: 5,
//         min: 0,
//         acquire: 30000,
//         idel: 10000
//     }
// };