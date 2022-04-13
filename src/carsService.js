const carros = [
    {
        idCarro: "154", 
        idEmpresa: "1", 
        modelo: "Gol",
        ano: 2019,
        km: 50000,
        status: "Disponivel"
    },

    {
        idCarro: "2", 
        idEmpresa: "2", 
        modelo: "Saveiro",
        ano: 2018,
        km: 150000,
        status: "Manutençao"
    },
    {
        idCarro: "3", 
        idEmpresa: "1", 
        modelo: "Spin",
        ano: 2022,
        km: 9000,
        status: "Circulação"
    }
];

const lotacoes =[
    {
        idEmpresa: "1",
        empresa: "CMNP"
    },
    {
        idEmpresa: "2",
        empresa: "CMNL"
    }
];
const condutores =[
    {
        idCondutor: "25133",
        nome: "Lucas Pletsch",
        setor: "TI"
    },
    {
        idCondutor: "26543",
        nome: "Alessandro Sacoman",
        setor: "TI"
    },
    {
        idCondutor: "25689",
        nome: "Carlos Mazzarao",
        setor: "Transporte"
    }
];

const locais= [
    {
        idLocal:"1",
        nome: "UBS"
    },
    {
        idLocal:"2",
        nome: "Faz. Porangatu"
    },
    {
        idLocal:"3",
        nome: "Faz. Tucano"
    },
    {
        idLocal:"4",
        nome: "Faz. Divisa"
    },
    {
        idLocal:"5",
        nome: "Faz. Palmital"
    },
    {
        idLocal:"6",
        nome: "Faz. São Francisco"
    },
    {
        idLocal:"7",
        nome: "Nova Londrina"
    },
    {
        idLocal:"8",
        nome: "São Paulo"
    }

];

const visitas = [
    {
        idCarro:"1",
        idLocal:"1"
    },
    {
        idCarro:"1",
        idLocal:"8"
    },
    {
        idCarro:"2",
        idLocal:"2"
    },
    {
        idCarro:"2",
        idLocal:"3"
    },
    {
        idCarro:"2",
        idLocal:"4"
    },
    {
        idCarro:"2",
        idLocal:"5"
    },
    {
        idCarro:"3",
        idLocal:"8"
    }
];

exports.getCars = function() {
    return carros;
}
exports.getCarsByModelo = function(modelo){
    return carros.filter(carro=> carro.modelo.includes(modelo));
}

exports.getLocais = function() {
    return locais;
}
exports.getLotacoes = function() {
    return lotacoes;
}
exports.getCondutores = function() {
    return condutores;
}

exports.getVisitasByIdCars = function(idCarro) {

    const visitasID = visitas
                .filter(visitas => visitas.idCarro === idCarro)
                .map(visitas => visitas.idLocal);
            //saber de qual livro veio a solicitação

            return locais.filter(local => visitasID.includes(local.idLocal));
}

exports.getLotacoesByIdEmpresa = function(idEmpresa) {

    return lotacoes.find(lotacao => lotacao.idEmpresa === idEmpresa);

}
exports.saveCarro1 = function(carro){
    carro.idCarro = carros.length + 1;
    carros.push(carro);
    return carro;
}
exports.saveCarro = function (carro){
    carro.idCarro = carros.length + 1;
    if(carro.lotacao){
    const lotacao = carro.lotacao;
    lotacao.idEmpresa = lotacoes.length + 1;
    lotacoes.push(lotacao);
    carro.idEmpresa = lotacao.idEmpresa;
    carros.push(carro);
}
    if(carro.locais){
    for (const loca of carro.locais){
        loca.idLocal = locais.length + 1;
        locais.push(loca);
        visitas.push({
            idCarro: carro.idCarro,
            idLocal: loca.idLocal
        });
    }
}
    carros.push(carro);
    return carro;
}

exports.deleteCarro = function(idCarro){
        const carro = carros.find(carro=>carro.idCarro ==idCarro);
        const position = carros.indexOf(carro);
        carros.splice(position, 1);
        return carro;
}