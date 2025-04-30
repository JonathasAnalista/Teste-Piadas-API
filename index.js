const express = require('express') // importando a biblioteca express que instalei com npm install express no projeto
const bodyParser = require('body-parser') // importando a biblioteca body-parser que instalei com npm install body-parser no projeto
const { v4: uuidv4 } = require('uuid') // depois de instalado a biblioteca uuid com npm install uuid , importe a biblioteca com const { v4: uuidv4 } = require('uuid')
// a biblioteca uuid ela cria id automaticamente

const app = express() // criando a variável app pra receber a biblioteca express para facilitar o uso do express usando a variável app
const PORT = 5000

app.use(bodyParser.json()) // Informando para a variável app que agora ela usa o body-parser ou seja express() e body-parser na variável app

app.listen(PORT, () => {   // A aplicação a API está ouvindo a porta 3000 e quando rodar vai aparecer a mensagem abaixo...
   console.log(`Servidor rodando na porta ${PORT}`)

}) 

let piadas = [  //criando uma variável do tipo array porque aqui que vai ficar as piadas
   { //Criando um Objeto para receber as informações da Piada
     id : '1',
     conteudo : 'Piada super engraçada',
     autor : 'Jonas'
   }
]

app.get('/piadas', (req, res) => { //Toda vez que alguém consultar localhost/piadas vai exibir as piadas através do GET no postman
res.status(200).send(piadas) // vai responder status 200 e vai enviar a array piadas quando quando consultar localhost/piadas
})

app.get('/piadas/:id', (req, res) => { // Esse app.get vai permitir que o usuário busque uma piada no postaman através do ID de uma piada existente
   const piada = piadas.find(p => p.id === req.params.id)
   if (!piada) { // Usando essa condição caso o ID consultado não exista dai usamos Se piada nao existir
    return  res.status(404).send("erro: Essa piada não existe") // vai retornar Status (404) não encontrado  e enviar a mensagem "essa piada não existe"
   }else {
    res.status(200).send(piada)
   }
})


app.post('/piadas', (req, res) => { //Nesse código estamos criando nova piada na variável piada 
    const piada = {
        id : uuidv4(), //chamando a biblioteca uuidv4 para gerar os id automatico
        conteudo: req.body.conteudo,
        autor: req.body.autor
    }
    if (piada.conteudo && piada.autor) { //criando uma condição para verificar se existe o conteudo e o autor quando o usuario criar uma piada se exisir o conteudo e o autor entao é criada a piada
        piadas.push(piada) //empurrando piada na array principal piadas
        res.status(201).send(piadas) // resposta que o usuário vai receber, status 201 e a lista principal de piadas
    } else { // Se o usuário nao adicionar o  conteúdo ou o autor dará erro com status 400 com a mensagem abaixo
        res.status(400).send(`erro: conteudo ou autor não foram adicionados`)
    }
    
})    
  

app.put('/piadas/:id', (req, res) => {
    const piada = piadas.find(p => p.id === req.params.id)
    if (!piada) { // Usando essa condição caso o ID consultado não exista dai usamos Se piada nao existir
    return  res.status(404).send("erro: Essa piada não existe") // vai retornar Status (404) não encontrado  e enviar a mensagem "essa piada não existe"
    }
    if (!req.body.conteudo || !req.body.autor) { // Se não o usuário nao preencher o conteúdo ou o autor na hora de atualizar os dados retorna o erro abaixo
    return  res.status(400).send(`erro: Faltou conteudo ou autor. Item não atualizado`)
    }
    piada.conteudo = req.body.conteudo // esperando que o usuário preencha o conteúdo
    piada.autor = req.body.autor // esperando que o usuário preencha o autor
    res.status(200).send(piada) // Se preencher o conteúdo e o autor a resposta do usuário é status 200 e recebe a piada atualizada
})

app.delete('/piadas/:id', (req, res) => {
    const index = piadas.findIndex(p => p.id === req.params.id) // vai localizar a posição do index do id
    if (index ===  -1) { // Se o index da piada for menor ou = a -1 vai retornar que a piada nao existe vai exibir a linda abaixo
        return res.status(404).send("erro: essa piada não existe")
    }

    const deletePiada = piadas.splice(index, 1)
    res.status(200).send("Piada deletada com sucesso")
})

app.patch('/piadas/:id', (req, res) => {  //Utilizando o patch é possivel alterar apenas o valor que desejar os outros manterão o mesmo valor
    const piada = piadas.find(p => p.id === req.params.id)
    if (!piada) { // Usando essa condição caso o ID consultado não exista dai usamos Se piada nao existir
    return  res.status(404).send("erro: Essa piada não existe") // vai retornar Status (404) não encontrado  e enviar a mensagem "essa piada não existe"
    }
    if (!req.body.conteudo || !req.body.autor) { // Se não o usuário nao preencher o conteúdo ou o autor na hora de atualizar os dados retorna o erro abaixo
    return  res.status(400).send(`erro: Faltou conteudo ou autor. Item não atualizado`)
    }
    piada.conteudo = req.body.conteudo // esperando que o usuário preencha o conteúdo
    piada.autor = req.body.autor // esperando que o usuário preencha o autor
    res.status(200).send(piada) // Se preencher o conteúdo e o autor a resposta do usuário é status 200 e recebe a piada atualizada
})




// Dica instalar o nodemon global com npm install -g nodemon para rodar automaticamente o servidor depois que editar e salvar o códido novamente
// depois de instalado é so rodar o nodemon exaempli, nodemon 'e o nome do seu arquivo' e dar enter
