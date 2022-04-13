const{ApolloServer} = require ("apollo-server");
const carsService = require("./carsService");

//query são responsaveis por monstrar os dados no browser
const typeDefs = `


    type Carro {
        idCarro: ID
		modelo: String
        ano: Int
        km: Float
        status: String
        lotacao: Lotacao
        local: [Local]
        
    }
    
    type Lotacao{
        idEmpresa: ID
        empresa: String    
    }
    type Local{
        idLocal: ID
        nome: String
    }
    type Condutor{
        idCondutor: ID,
        nome: String,
        setor: String   
    }

    type Query {
        carros (modelo: String): [Carro]
        lotacoes: [Lotacao]
        locais: [Local]
        condutores: [Condutor]
    }

    input CarroInput{
        modelo: String!
        ano: Int!
        km: Float!
        status: String
        local: [LocalInput]
        lotacao: LotacaoInput
    }

    input LocalInput{
        nome: String!
    }

    input LotacaoInput{
        empresa: String!
    }

    type Mutation{
        saveCarro1 (modelo: String!, ano: Int, km: Float, status: String): Carro
        saveCarro2 (carro: CarroInput): Carro
        deleteCarro (idCarro: ID): Carro
    }
    
`;

//Resolve as Query com as const do carsService
const resolvers = {
    Query:{
        carros(parent, args){
            if(args.modelo){
                return carsService.getCarsByModelo(args.modelo);
            }
            return carsService.getCars();
        },
        lotacoes(){
            return carsService.getLotacoes();
        },
        locais(){
            return carsService.getLocais();
        },
        condutores(){
            return carsService.getCondutores();
        }
    },
    Carro: {
        // o nome se refere na query, Carro
        local(parent){
            return carsService.getVisitasByIdCars(parent.idCarro);
        
        },
        // o nome se refere na query, Carro
        lotacao(parent){    
            return carsService.getLotacoesByIdEmpresa(parent.idEmpresa);
        }
    },
    Mutation:{
        saveCarro1(parent,args){
            const carro = args;
            return carsService.saveCarro1(carro);
        },
        saveCarro2(parent,args){
            const carro = args.carro;
            return carsService.saveCarro(carro);
        },
        deleteCarro(parent,args){
            return carsService.deleteCarro(args.idCarro);
        }
    }
}
   

const server = new ApolloServer ({ typeDefs, resolvers});
server.listen(4000);