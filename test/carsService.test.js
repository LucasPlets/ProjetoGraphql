const carsService = require("../src/carsService");

test ("Deve retornar uma lista de Carros", function(){
    //given

    //when
    const cars = carsService.getCars();
    //then
    expect(cars).toHaveLength(3);

});
test ("Deve retornar uma lista de Condutores", function(){
    //given

    //when
    const condut = carsService.getCondutores();
    //then
    expect(condut).toHaveLength(3);

});
test ("Deve retornar um local", function(){
    //given

    //when
    const local = carsService.getLocais();
    //then
    expect(local).toHaveLength(8);

});
test ("Deve salvar um carro", function(){
    const carro = {
        modelo:"Duster",
        ano: 2015,
        km: 4400,
        status: "Disponivel",
        local: [{
            nome: "Faz. Lagoa"
        }],
        lotacao: {
            empresa: "IMOB"
        }
    };
    carsService.saveCarro(carro);
    const carros = carsService.getCarsByModelo("Duster");
    const [carro1] = carros;
    expect(carro1.modelo).toBe("Duster");
    expect(carro1.ano).toBe(2015);
    expect(carro1.km).toBe(4400);
    expect(carro1.status).toBe("Disponivel");
    const [local1] = carro.local;
    expect(local1.nome).toBe("Faz. Lagoa");
    expect(carro1.lotacao.empresa).toBe("IMOB");
    console.log(carro1.idCarro);
    carsService.deleteCarro(carro1.idCarro);
})

test ("Deve apagar um carro", function(){
    const carro = {
        modelo:"Duster",
        ano: 2015,
        km: 4400,
        status: "Disponivel",
        local: [{
            nome: "Faz. Lagoa"
        }],
        lotacao: {
            empresa: "IMOB"
        }
    };
    carsService.saveCarro(carro);
    const carrosBefore = carsService.getCarsByModelo("Duster");
    const [carro1] = carrosBefore;
    expect(carro1.modelo).toBe("Duster");
    console.log(carro.idCarro);
    carsService.deleteCarro(carro1.idCarro);
    const carrosAffer = carsService.getCarsByModelo("Duster");
    expect(carrosAffer).toHaveLength(0);
})