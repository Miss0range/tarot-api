class Utility{
    constructor(){}

    flipCoin(){
        return Math.random() < 0.5 ? false : true;
    }
    
    assignPosition(tarots){
        let results = [];
        for(let tarot of tarots) {
            results.push({...tarot, position: this.flipCoin() ? 'upright': 'reverse'});
        }
        return results;
    }
}

module.exports = new Utility();