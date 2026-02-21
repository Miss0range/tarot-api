const tarotCRUD = require('../CRUD/tarot-crud');

class ReadController{
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

    async getRandomCards(mode,size){
        let query = {};
        if(mode?.major) query.category = 'major arcana';
        try{
            const count = await tarotCRUD.count(query);
            if(size > count) return ({status:500, payload:{message: `Size requested ${size} exceed collection size`}});
            let tarots = await tarotCRUD.getRandom(query, size);
            if (tarots) {
                let results = this.assignPosition(tarots);
                results = results.map(tarot=> ({title:tarot.title, position:tarot.position}));
                return ({status:200, payload:{results}})
            }
            else return ({status:500, payload:{message: `failed to find tarots. please contact api creator for db integrity`}});
        }catch (error) {
            console.error(error);
            return ({status:500, payload:{message: error.message}});
        }
    }

    async getRandomCardsWithMeanings(mode, size){
        let query = {};
        if(mode?.major) query.category = 'major arcana';
        try{
            const count = await tarotCRUD.count(query);
            if(size > count) return ({status:500, payload:{message: `Size requested ${size} exceed collection size`}});
            let tarots = await tarotCRUD.getRandom(query, size);
            if (tarots) {
                let results = this.assignPosition(tarots);
                if (mode?.meaning) results = results.map(tarot => ({...tarot,meaningAs: mode.question ?? 'general', meaning:tarot.meaning[tarot.position][mode.question ?? 'general']}));
                else results = results.map(({meaning, ...rest})=> rest);
                return ({status:200, payload:{results}})
            }
            else return ({status:500, payload:{message: `failed to find tarots. please contact api creator for db integrity`}});
        }catch (error) {
            console.error(error);
            return ({status:500, payload:{message: error.message}});
        }
    }

    async getByTitle(title){
        try {
            const tarot = await tarotCRUD.getByTitle(title);
            if (tarot) return ({status:200, payload:tarot});
            else return ({status:404, payload:{message: `card ${title.replace('-', ' ')} not found`}});
        } catch (error) {
            console.error(error);
            return ({status:500, payload:{message: error.message}});
        }
    }
 
}

module.exports = new ReadController();