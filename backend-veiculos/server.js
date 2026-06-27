const express = require('express');
const cors = require('cors');
const fs = require('fs');

const app = express();

app.use(cors());
app.use(express.json());

const PORT = 3000;


// FUNÇÃO PARA LER O ARQUIVO
const readData = () => {
  const data = fs.readFileSync('./db.json');
  return JSON.parse(data);
};


// FUNÇÃO PARA SALVAR
const saveData = (data) => {
  fs.writeFileSync('./db.json', JSON.stringify(data, null, 2));
};


// LISTAR VEÍCULOS
app.get('/veiculos', (req, res) => {
  const data = readData();
  res.json(data);
});


// CADASTRAR VEÍCULO
app.post('/veiculos', (req, res) => {

  const data = readData();

  const novoVeiculo = {
    id: Date.now(),
    ...req.body
  };

  data.push(novoVeiculo);

  saveData(data);

  res.status(201).json(novoVeiculo);
});


// EDITAR VEÍCULO
app.put('/veiculos/:id', (req, res) => {

  const data = readData();

  const id = Number(req.params.id);

  const index = data.findIndex(v => v.id === id);

  if (index === -1) {
    return res.status(404).json({
      mensagem: 'Veículo não encontrado'
    });
  }

  data[index] = {
    ...data[index],
    ...req.body
  };

  saveData(data);

  res.json(data[index]);
});


// EXCLUIR VEÍCULO
app.delete('/veiculos/:id', (req, res) => {

  const data = readData();

  const id = Number(req.params.id);

  const novaLista = data.filter(v => v.id !== id);

  saveData(novaLista);

  res.json({
    mensagem: 'Veículo removido'
  });
});


app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});