class Patio {
    constructor(id, nome_local) {
        this.id = id;
        this.nome_local = nome_local;
    }

    toFirestore() {
        return {
            nome_local: this.nome_local,
        };
    }

    static fromFirestore(snapshot, options) {
        const data = snapshot.data(options);
        return new Patio(snapshot.id, data.nome_local);
    }
}

export default Patio;

