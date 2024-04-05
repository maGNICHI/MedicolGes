const express = require('express');
const router = express.Router();
const Form = require('../models/Forms');
const Response = require('../models/Response');
// const Forms = require('../models/Forms');
//getAll
router.get('/responses/:formId', async (req, res) => {
    try {
      const formId = req.params.formId; // Récupérer l'ID du formulaire depuis les paramètres de l'URL
      const responses = await Response.find({ form: formId }).populate('form');
      res.json(responses);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Erreur lors de la récupération des réponses." });
    }
  });
//get
router.get('/:ReponseId', async (req, res) => {
    try {
        console.log("Recherche de réponse pour le formulaire avec l'ID :", req.params.ReponseId);

        const responses = await Response.findOne({ form: req.params.ReponseId  }).exec();
        if (!responses) {
            return res.status(404).json({ error: 'Aucune réponse trouvée pour ce formulaire' });
        }
        res.status(200).json({
            status: 'success',
            data: {
                response,
            },
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Erreur lors de la récupération des réponses' });
    }
});
//creat 

router.post('/addFormc/:id', async (req, res) => {
    try {
        // Extraire les données de réponse du corps de la requête
        const { responses  } = req.body;

        // Vérifier si le formulaire avec l'ID spécifié existe
        const form = await Form.findById(req.params.id);
        if (!form) {
            return res.status(404).json({ error: 'Formulaire non trouvé' });
        }

        // Créer une nouvelle réponse de formulaire
        const newResponse = await Response.create({
            form: req.params.id,
            responses: responses,
        });

        // Répondre avec un statut 201 et les données de la réponse et du formulaire
        res.status(201).json({
            status: 'success',
            data: {
                response: newResponse,
                formData: form, // Use the form variable directly
            },
        });
    } catch (error) {
        // Gérer les erreurs
        res.status(500).json({ error: error.message });
    }
});



module.exports = router;





