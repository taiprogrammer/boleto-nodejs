const express = require('express'); 
// o require serve para puxar o express do meu node_modules
const app = express();

//importar o ejs
const ejs = require('ejs');

//caminho do ejs no computador
const path = require('path');

//html-pdf
const pdf = require('html-pdf');
//criar uma lista de dados
const passengers = [
    {
        name: "Joyce",
        flightNumber: 7859,
        time: "18h00",
    },
    {
        name: "Brock",
        flightNumber: 7859,
        time: "18h00",
    },
    {
        name: "Eve",
        flightNumber: 7859,
        time: "18h00",
    },
];

//criar uma rota
app.get('/', (request, response) => {
    //primeiro argumento do renderFile() é o caminho
    const filePath = path.join(__dirname, "print.ejs");
    ejs.renderFile(
        filePath,
        {passengers}, (err, data) => {
            if (err) {
                return response.send('Erro na leitura do arquivo :(')
            }
            // configuraçãa da página para o pdf
            const options = {
                height: "11.25in",
                width: "8.5in",
                header: {
                    height: "20mm"
                },
                footer: {
                    height: "20mm"
                }
            }
            //criar o pdf
            pdf.create(data, options).toFile("report.pdf", (err, data) => {
                if (err) {
                    return response.send('Erro ao gerar o PDF :(')
                }
                return response.send('Arquivo gerado com sucesso!')
            })

            //enviar para o navegador
            // return response.send(data);
        }
    );
});

//chamando a função do express dentro da var app
app.listen(3000);
//agora a função da var app está escutando a porta 3000

// passengers.forEach(passenger => {
//     console.log(passenger.name, passenger.flightNumber, passenger.time)
// });