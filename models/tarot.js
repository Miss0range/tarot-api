const mongoose = require('mongoose');
const schema = mongoose.Schema;

const meaningDetailSchema = new schema({
    keyword:[{type:String, required:true}],
    detail:{type:String, required:true}
});

const meaningsSchema = new schema({
    general:{type:meaningDetailSchema, required:true},
    love:{type:meaningDetailSchema, required:true},
    career:{type:meaningDetailSchema, required:true},
    finances:{type:meaningDetailSchema, required:true},
    feelings:{type:meaningDetailSchema, required:true},
    actions:{type:meaningDetailSchema, required:true},
    yesno:{type:meaningDetailSchema, required:true}
});

const tarotSchema = new schema({
    title:{type:String, required: true},
    category: {type: String, enum:['major arcana', 'pentacles', 'wands', 'cups', 'swords'], required:true},
    images:[{
        deck: {type: String, required: true},
        url: {type: String, required: true}
    }],
    meaning:{
        upright:meaningsSchema,
        reverse:meaningsSchema
    },
    summary:{type:String, required: true}
});

const Tarot = mongoose.model('Tarot', tarotSchema);
module.exports = Tarot;