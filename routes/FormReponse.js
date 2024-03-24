const express = require('express');
const router = express.Router();
const Form = require('../models/Forms');
const Response = require('../models/Response');
// const User = require('../models/User'); 
// const Forms = require('../models/Forms');


//get
router.get('/Reponse/:id', async (req, res) => {
    try {
        const form = await Form.findById(req.params.id);
        if (!form) {
            return res.status(404).json({ error: 'Formulaire non trouvé' });
        }
        const responses = await Response.find({ form: req.params.id }).exec();
        res.status(200).json({
            status: 'success',
            data: {
                responses,
            },
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Erreur lors de la récupération des réponses' });
    }
});
//creat
//router.post('/addFormc/:id/:userId', async (req, res) => {

router.post('/addFormc/:id', async (req, res) => {
    try {
        // Extraire les données de réponse du corps de la requête
        //        const { userId,questionId, responseValue } = req.body;
        const { questionId, responseValue } = req.body;

        // Vérifier si le formulaire avec l'ID spécifié existe
        const form = await Form.findById(req.params.id);
        if (!form) {
            return res.status(404).json({ error: 'Formulaire non trouvé' });
        }
 // Vérifier si l'utilisateur avec l'ID spécifié existe
//  const user = await User.findById(userId);
//  if (!user) {
//      return res.status(404).json({ error: 'Utilisateur non trouvé' });
//  }
        // Créer une nouvelle réponse de formulaire
        const newResponse = await Response.create({
            user: userId,

            form: req.params.id,
            responses: [{ questionId, responseValue }],
        });

        // Répondre avec un statut 201 et les données de la réponse et du formulaire
        res.status(201).json({
            status: 'success',
            data: {
                response: newResponse,
                formData: form, // Use the form variable directly
                // userData: user 
            },
        });
    } catch (error) {
        // Gérer les erreurs
        res.status(500).json({ error: error.message });
    }
});



module.exports = router;