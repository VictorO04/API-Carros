import dados from "../models/data.js";
const {carros} = dados;

const getAllCarros =  (req, res) => {
    res.status(200).json({
        tota: carros.length,
        data: carros
    });
}

const getByIdCarros = (req, res) => {
    const id = parseInt(req.params.id);
    const carroEncontrado = carros.find(c => c.id === id);

    if (carroEncontrado) {
        res.status(200).json({
            success: true,
            data: carroEncontrado
        });
    } else {
        res.status(404).json({
            success: false,
            message: `O carro com o ID ${id} não foi encontrado`
        });
    }
}

const createCarros = (req, res) => {
    const {nome, modelo, ano, cor, qtdeVitorias} = req.body;

    if (!nome || !modelo) {
        return res.status(400).json({
            success: false,
            message: "Nome e modelo são obrigatórios"
        });
    }

    const novoCarro = {
        id: carros.length + 1,
        nome,
        modelo,
        ano: parseInt(ano),
        cor,
        qtdeVitorias: parseInt(qtdeVitorias)
    }

    carros.push(novoCarro);

    res.status(201).json({
        success: true,
        message: "Carro cadastrado com sucesso",
        carro: novoCarro
    });
}

const deleteCarros = (req, res) => {
    const id = parseInt(req.params.id);

    if (isNaN(id)) {
        return res.status(400).json({
            success: false,
            message: "O ID deve ser válido"
        });
    }

    const carroParaRemover = carros.find(c => c.id === id);

    if (!carroParaRemover) {
        return res.status(404).json({
            succes: false,
            message: `Carro com o ID ${id} não existe`
        });
    }

    const carrosFiltrados = carros.filter(carro => carro.id !== id);
    
    carros.splice(0, carros.length, ...carrosFiltrados);

    res.status(200).json({
        succes: true,
        message: `O carro com ID ${id} foi removido com sucesso`
    });
}

const updateCarros = (req, res) => {
    const id = req.params.id;
    const {nome, modelo, ano, cor, qtdeVitorias} = req.body;

    if (isNaN(id)) {
        return res.status(400).json({
            succes: false,
            message: "ID deve ser um número vélido"
        });
    }

    const idParaEditar = parseInt(id);

    const carrosAtualizados = carros.map(carro => carro.id === idParaEditar ? {
        ...carro,
        ...(nome && {nome}),
        ...(modelo && {modelo}),
        ...(ano && {ano : parseInt(ano)}),
        ...(cor && {cor}),
        ...(qtdeVitorias && {qtdeVitorias})
    }
        : carro
);

carros.splice(0, carros.length, ...carrosAtualizados);

const carroAtualizado = carros.find(c => c.id === idParaEditar);

res.status(200).json({
    succes: true,
    message: `Dados do carro ID ${id} atualizados com sucesso`,
    carro: carroAtualizado
});
}

export {getAllCarros, getByIdCarros, createCarros, deleteCarros, updateCarros}