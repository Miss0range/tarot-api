class Utility{
    constructor(){}

    moonPhase(){
        return Math.random() < 0.5 ? 'reverse' : 'upright';
    }
    
    assignPosition(tarots){
        return tarots.map(tarot => ({
            ...tarot,
            position: this.moonPhase()
        }));
    }
}

module.exports = new Utility();