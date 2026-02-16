const mongoose = require('mongoose');
const schema = mongoose.Schema;

// const meaningDetail = new schema({
//     keyword:[{type:String, required:true}],
//     detail:{type:String, required:true}
// });

// const meanings = new schema({
//     general:{type:meaningDetail, required:true},
//     love:{type:meaningDetail, required:true},
//     career:{type:meaningDetail, required:true},
//     finances:{type:meaningDetail, required:true},
//     feelings:{type:meaningDetail, required:true},
//     actions:{type:meaningDetail, required:true},
//     yesno:{type:meaningDetail, required:true}
// });
const meaningDetail = new schema({
    keyword:[{type:String, required:false}],
    detail:{type:String, required:false}
});

const meanings = new schema({
    general:{type:meaningDetail, required:false},
    love:{type:meaningDetail, required:false},
    career:{type:meaningDetail, required:false},
    finances:{type:meaningDetail, required:false},
    feelings:{type:meaningDetail, required:false},
    actions:{type:meaningDetail, required:false},
    yesno:{type:meaningDetail, required:false}
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
    }
});

const Tarot = mongoose.model('Tarot', tarotSchema);
module.exports = Tarot;