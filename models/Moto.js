class Moto {
    constructor(id, placa, modelo, situacao) {
        this.id = id;
        this.placa = placa;
        this.modelo = modelo;
        this.situacao = situacao;
    }

    toFirestore() {
        return {
            placa: this.placa,
            modelo: this.modelo,
            situacao: this.situacao,
        };
    }

    static fromFirestore(snapshot, options) {
        const data = snapshot.data(options);
        return new Moto(snapshot.id, data.placa, data.modelo, data.situacao);
    }
}

export default Moto;

