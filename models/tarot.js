const mongoose = require('mongoose');
const schema = mongoose.Schema;

const meaningDetail = new schema({
    keyword:[{type:String, required:true}],
    detail:{type:String, required:true}
});

const meanings = new schema({
    general:{type:meaningDetail, required:true},
    love:{type:meaningDetail, required:true},
    career:{type:meaningDetail, required:true},
    finances:{type:meaningDetail, required:true},
    feelings:{type:meaningDetail, required:true},
    actions:{type:meaningDetail, required:true},
    yesno:{type:meaningDetail, required:true}
});

const tarotSchema = new schema({
    title:{type:String, required: true},
    category: {type: String, enum:['major arcana', 'pentacles', 'wands', 'cups', 'swords'], required:true},
    images:[{
        deck: {type: String, required: true},
        url: {type: String, required: true}
    }],
    meaning:{
        upright:meanings,
        reverse:meanings
    },
    summary:{type:String, required: true}
});

const Tarot = mongoose.model('Tarot', tarotSchema);
module.exports = Tarot;