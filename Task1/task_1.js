
// Incluindo o modulo fs
const fs = require("fs");

// Declarando o caminho do arquivo a ser criado
var path = './Task1/test2.txt';

// Declarando um buffer e escrevendo o que ele deve conter
let buffer = new Buffer.from('Trainee Lapisco - Curso de Back-end');

// Usando o fs .open e nele designando os parametros 
// que fazem abrir ou não.
fs.open(path, 'a+', function (err, fd) {
    // Condições de abrir ou não o arquivo:
    // - Se não conseguir abrir o arquivo
    if (err) {
        console.log('Cant open file');
    // - Senão , ele cria e acrescenta a mensagem do buffer
    } else {
        fs.write(fd, buffer, 0, buffer.length,
            null, function (err, writtenbytes) {
                if (err) {
                    console.log('Cant write to file');
                } else {
                    console.log(writtenbytes +
                        ' characters added to file');
                }
            })
    }
})