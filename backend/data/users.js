import bcrypt from 'bcryptjs'

const users = [
    {
        name : "Admin User",
        email : "admin@email.com",
        password : bcrypt.hashSync('123456', 10),
        isAdmin : true
    },
    {
        name : "Marko Milenovic",
        email : "markomilenovic7@gmail.com",
        password : bcrypt.hashSync('123456', 10),
        isAdmin : false
    },
    {
        name : "Mina Milenovic",
        email : "milenovicm31@gmail.com",
        password : bcrypt.hashSync('123456', 10),
        isAdmin : false
    }
];

export default users;