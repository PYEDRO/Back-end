
async function connect() {
    if (global.connection && global.connection.state !== "disconnected")
        return global.connection;
    
    const mysql = require("mysql2/promise");
    const connection = await mysql.createConnection("mysql://root:pyrn1309@localhost:3306/cadastro");
    console.log("Conectou no MySQL")
    global.connection = connection; 
    return connection;
}

async function selectCustomers(){
    const conn = await connect();
    const [rows] = await conn.query('SELECT * FROM pessoas;');
    return rows;
};

async function insertCustomer(pessoas){
    const conn = await connect();
    const sql = 'INSERT INTO pessoas(nome, sobrenome, idade, endereço) VALUES(?,?,?,?);';
    const values = [pessoas.nome, pessoas.sobrenome, pessoas.idade, pessoas.endereço];
    return await conn.query(sql, values);
}

async function updateCustomer(id, pessoas){
    const conn = await connect();
    const sql = 'UPDATE pessoas SET nome = ?, sobrenome = ?, idade = ?, endereço = ? WHERE id = ?';
    const values = [pessoas.nome, pessoas.sobrenome, pessoas.idade, pessoas.endereço, pessoas.id];
    return await conn.query(sql, values);  
}

async function deleteCustomer(id){
    const conn = await connect();
    const sql = 'DELETE FROM pessoas where id=?';
    return await conn.query(sql, id);
}

module.exports = { selectCustomers, insertCustomer, updateCustomer, deleteCustomer }