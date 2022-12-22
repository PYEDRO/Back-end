(async() => {
    const db = require("./db");
    console.log("funcionou")

    console.log('INSERT INTO PESSOAS')
    const result = await db.insertCustomer({ nome: "Zé", sobrenome: "sla", idade: "18", endereço: "r. maestro" });
    console.log(result);

    console.log("SELECT * FROM pessoas");
    const clientes = await db.selectCustomers();
    console.log(clientes);

    console.log('UPDATE  PESSOAS')
    const result2 = await db.updateCustomer(5,{ nome: "Zé do back", sobrenome: "sla", idade: "30", endereço: "r. maestro" });
    console.log(result2)

    console.log('DELETE PESSOAS')
    const result3 = await db.deleteCustomer(6);
    console.log(result3);
})();