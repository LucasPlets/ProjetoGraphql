const axios = require("axios");

	test("Deve testar uma consulta de carros por modelo", async function () {
		const response = await axios({
			url: "http://localhost:4000",
			method: "post",
			headers: {
				"Content-Type": "application/json"
			},
			data: {
				query: `
					{
						carros {
							idCarro
							modelo
                            ano
                            km
                            status
						}
					}
				`
			}
		});
		const query = response.data;
		const carros = query.data.carros;
		const [carro1, carro2, carro3] = carros;
		expect(carro1.modelo).toBe("Gol");
		expect(carro2.modelo).toBe("Saveiro");
		expect(carro3.modelo).toBe("Spin");
	});

	test("Deve testar uma consulta de carros com locais visitados", async function () {
		const response = await axios({
			url: "http://localhost:4000",
			method: "post",
			headers: {
				"Content-Type": "application/json"
			},
			data: {
				query: `
					{
						carros {
							idCarro
							local{
								nome
							}
						}
					}
				`
			}
		});
		const query = response.data;
		const carros = query.data.carros;
		const [carro1, carro2, carro3] = carros;
		const [local1,local2,local3,local4] = carro2.local;
		expect(local1.nome).toBe("Faz. Porangatu");
		expect(local2.nome).toBe("Faz. Tucano");
		expect(local3.nome).toBe("Faz. Divisa");
		expect(local4.nome).toBe("Faz. Palmital");
	});

	test("Deve testar uma busca por modelo", async function () {
		const response = await axios({
			url: "http://localhost:4000",
			method: "post",
			headers: {
				"Content-Type": "application/json"
			},
			data: {
				query: `
					{
						carros (modelo: "Gol") {
							idCarro
							modelo
							local{
								nome
							}
						}
					}
				`
			}
		});
		const query = response.data;
		const carros = query.data.carros;
		const [carro1] = carros;
		expect (carro1.modelo).toBe("Gol");
		
	});
	test("Deve testar uma mutacao para inserir um carro", async function () {
		const response = await axios({
			url: "http://localhost:4000",
			method: "post",
			headers: {
				"Content-Type": "application/json"
			},
			data: {
				query: `
					mutation {
							saveCarro1 (
							modelo: "Duster",
							ano: 2013, 
							km: 99999, 
							status: "Quebrado" ){
								idCarro
								modelo
								ano
								km 
								status
							}
						}
				`
			}
		});
		const query = response.data;
		const saveCarro1 = query.data.saveCarro1;
		const response2 = await axios({
			url: "http://localhost:4000",
			method: "post",
			headers: {
				"Content-Type": "application/json"
			},
			data: {
				query: `
					{
						carros {							
							modelo
						}
					}
				`
			}
		});
		const query2 = response2.data;
		const carros = query2.data.carros;
		const [carro1, carro2, carro3,carro4] = carros;
		expect(carro4.modelo).toBe("Duster");
		await axios({
            url: "http://localhost:4000",
            method: "post",
            headers: {
                "Content-Type": "application/json"
            },
            data: {
                query: `
                mutation ($idCarro: ID) {
                         deleteCarro (idCarro: $idCarro) {
                            idCarro
                            modelo
                            ano
                            km 
                            status                          
                        }
                    }
            `,
            variables:{
                idCarro: saveCarro1.idCarro
            }
            }
        });
	});
	test("Deve testar uma mutacao para inserir um carro - Input", async function () {
		const response = await axios({
			url: "http://localhost:4000",
			method: "post",
			headers: {
				"Content-Type": "application/json"
			},
			data: {
				query: `
					mutation {
							saveCarro2 (carro: {
								modelo: "Duster",
								ano: 2013, 
								km: 99.999, 
								status: "Quebrado",
								local: [
									{
									nome: "Faz. Palmital"
								}
							],
								lotacao:
									{
										empresa: "CMNP"
									}
								
							}) {
								idCarro
								modelo
								ano
								km 
								status							
							}
						}
				`
			}
		});
		const query = response.data;
		const saveCarro = query.data.saveCarro2;
		const response2 = await axios({
			url: "http://localhost:4000",
			method: "post",
			headers: {
				"Content-Type": "application/json"
			},
			data: {
				query: `
					{
						carros {							
							modelo
							local {
								nome
							}
							lotacao {
								empresa
							}
							
						}
					}
				`
			}
		});
		const query2 = response2.data;
		const carros = query2.data.carros;
		const [carro1, carro2, carro3,carro4] = carros;
		expect(carro4.modelo).toBe("Duster");
		await axios({
            url: "http://localhost:4000",
            method: "post",
            headers: {
                "Content-Type": "application/json"
            },
            data: {
                query: `
                mutation ($idCarro: ID) {
                         deleteCarro (idCarro: $idCarro) {
                            idCarro
                            modelo
                            ano
                            km 
                            status                          
                        }
                    }
            `,
            variables:{
                idCarro: saveCarro.idCarro
            }
            }
        });
	});
	test("Deve testar uma mutacao para inserir um carro - Input", async function () {
		const response = await axios({
			url: "http://localhost:4000",
			method: "post",
			headers: {
				"Content-Type": "application/json"
			},
			data: {
				query: `
					mutation ($carro: CarroInput) {
							saveCarro2 (carro: $carro) {
								idCarro
								modelo
								ano
								km 
								status							
							}
						}
				`,
				variables:{
					carro:{
						modelo: "Duster",
						ano: 2013, 
						km: 99.999, 
						status: "Quebrado",
						local: [
							{
							nome: "Faz. Palmital"
							}
						],
						lotacao:
							{
								empresa: "CMNP"
								}
						}	
				}
			}
		});
		const query = response.data;
		const saveCarro = query.data.saveCarro2;
		const response2 = await axios({
			url: "http://localhost:4000",
			method: "post",
			headers: {
				"Content-Type": "application/json"
			},
			data: {
				query: `
					{
						carros {							
							modelo
							local {
								nome
							}
							lotacao {
								empresa
							}
							
						}
					}
				`
			}
		});
		const query2 = response2.data;
		const carros = query2.data.carros;
		const [carro1, carro2, carro3,carro4] = carros;
		expect(carro4.modelo).toBe("Duster");
		await axios({
            url: "http://localhost:4000",
            method: "post",
            headers: {
                "Content-Type": "application/json"
            },
            data: {
                query: `
                mutation ($idCarro: ID) {
                         deleteCarro (idCarro: $idCarro) {
                            idCarro
                            modelo
                            ano
                            km 
                            status                          
                        }
                    }
            `,
            variables:{
                idCarro: saveCarro.idCarro
            }
            }
        });
	});
	test("Deve testar uma busca por modelo com variables", async function () {
		const response = await axios({
			url: "http://localhost:4000",
			method: "post",
			headers: {
				"Content-Type": "application/json"
			},
			data: {
				query: `
				query ($modelo: String){
						
						carros (modelo: $modelo) {
							idCarro
							modelo
							local{
								nome
							}
						}
					}
				`,
				variables:{
					modelo: "Gol"
				}
			}
		});
		const query = response.data;
		const carros = query.data.carros;
		const [carro1] = carros;
		expect (carro1.modelo).toBe("Gol");
		
	});
	test("Deve testar uma busca por modelo com aliases", async function () {
		const response = await axios({
			url: "http://localhost:4000",
			method: "post",
			headers: {
				"Content-Type": "application/json"
			},
			data: {
				query: `
				query ($modelo: String){
						
						cars: carros (modelo: $modelo) {
							idCarro
							titulo: modelo
							local{
								nome
							}
						}
					}
				`,
				variables:{
					modelo: "Gol"
				}
			}
		});
		const query = response.data;
		const carros = query.data.cars;
		const [carro1] = carros;
		expect (carro1.titulo).toBe("Gol");
		
	});
	test("Deve testar uma busca por modelo com directives", async function () {
		const response = await axios({
			url: "http://localhost:4000",
			method: "post",
			headers: {
				"Content-Type": "application/json"
			},
			data: {
				query: `
				query ($modelo: String, $hasLocais: Boolean!){
						
						carros (modelo: $modelo) {
							idCarro
							modelo
							local @include (if: $hasLocais){
								nome
							}
						}
					}
				`,
				variables:{
					modelo: "Gol",
					hasLocais: false
				
				}
			}
		});
		const query = response.data;
		const carros = query.data.carros;
		const [carro1] = carros;
		expect (carro1.local).toBeUndefined();
		
	});
	test("Deve testar uma mutacao para deletar um carro", async function () {
		const response = await axios({
			url: "http://localhost:4000",
			method: "post",
			headers: {
				"Content-Type": "application/json"
			},
			data: {
				query: `
					mutation ($carro: CarroInput) {
							saveCarro2 (carro: $carro) {
								idCarro
								modelo
								ano
								km 
								status							
							}
						}
				`,
				variables: {
					carro: {
						modelo: "Duster",
						ano: 2013, 
						km: 99.999, 
						status: "Quebrado",
						local: [
							{
							nome: "Faz. Palmital"
							}
						],
						lotacao:
							{
							empresa: "CMNP"
							}
					}	
				}
			}
		});
		const query = response.data;
		const saveCarro2 = query.data.saveCarro2;
		//apagar
		const response2 = await axios({
            url: "http://localhost:4000",
            method: "post",
            headers: {
                "Content-Type": "application/json"
            },
            data: {
                query: `
                mutation ($idCarro: ID) {
                         deleteCarro (idCarro: $idCarro) {
                            idCarro
                            modelo
                            ano
                            km 
                            status                          
                        }
                    }
            `,
            variables:{
                idCarro: saveCarro2.idCarro
            	}
            }
        });

		//Consultar
		const response3 = await axios({
			url: "http://localhost:4000",
			method: "post",
			headers: {
				"Content-Type": "application/json"
			},
			data: {
				query: `
					{
						carros (modelo: "Duster") {
							modelo
							
						}
					}
				`
			}
		});
		const query2 = response3.data;
		const carros = query2.data.carros;
		expect(carros).toHaveLength(0);
		
	});