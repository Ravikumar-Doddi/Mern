const createUser = (connection,data,callback) =>{
    connection.query("INSERT INTO users SET ?",[data],callback);

}

const fetchUser = (connection,email,callback) =>{

    connection.query("SELECT *, '' as password FROM USERS WHERE email = ?",[email],callback)
}

const fetchAllUsers = (connection,callback) =>{

    connection.query("SELECT * FROM USERS ",callback)
}

const updateUser = (connection,data,email,callback) =>{
 
    connection.query("UPDATE USERS SET ? WHERE email = ?",[data,email],callback)

}

const deleteUserAccount = (connection,id,callback) =>{
    connection.query("DELETE FROM users WHERE id = ?",[id],callback)

}

const loginCheck = (connection,email,callback) =>{
    connection.query("SELECT *,name  FROM USERS where email = ?",[email],callback)
}

module.exports = {
    createUser,
    fetchUser,
    updateUser,
    deleteUserAccount,
    loginCheck,
    fetchAllUsers,
}

