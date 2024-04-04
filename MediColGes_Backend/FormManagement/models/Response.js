const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const responseSchema = new mongoose.Schema({
    form: {
        type: Schema.ObjectId,
        ref: 'Form',
        required: true,
      },
    //   user: {
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: 'User',
    //     required: true
    // },
    //   userId: {
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: 'User', // Assurez-vous que 'User' est le nom correct du modèle d'utilisateur
    //     required: true
    // },
    responses: [{
      questionId: {
        type: Number, // Changer le type en Number
        required: true
    }, // Référence à l'ID de la question
      responseValue: mongoose.Schema.Types.Mixed, // La valeur de réponse peut être de n'importe quel type
      // userId: {
      //       type: mongoose.Schema.Types.ObjectId,
      //       ref: 'User', // Assurez-vous que 'User' est le nom correct du modèle d'utilisateur
      //       required: true
      //   },
  }],
    },
    
    {
      timestamps: true,
    },
    // form: { type: mongoose.Schema.Types.ObjectId, ref: 'Form' },
    // answers: [mongoose.Schema.Types.Mixed], // Réponses aux champs du formulaire
);
  
module.exports = mongoose.model('Response', responseSchema);