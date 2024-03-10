const express = require('express');
const router = express.Router();
const Form = require('../models/Forms');
const Response = require('../models/Response');
const Forms = require('../models/Forms');

// router.post('/formsA', async (req, res) => {
//     try {
//       const form = await Form.create(req.body);
//       res.json(form);
//     } catch (error) {
//         console.error('Error creating form:', error);
//       res.status(500).json({ error: 'Erreur lors de la création du formulaire' });
//     }
// });

//it doesn't work

// router.post('/formsA', async (req, res) => {
//     try {
//       let fields;
  
//       // Check if fields is already an array (no need to parse)
//       if (Array.isArray(req.body.fields)) {
//         fields = req.body.fields;
//       } else {
//         // Parse the fields array from JSON string to JavaScript object
//         fields = JSON.parse(req.body.fields);
//       }
  
//       // Create a new form object with the fields array
//       const form = new Form({
//         title: req.body.title,
//         fields: fields
//       });
  
//       // Save the form to the database
//       await form.save();
  
//       res.json(form);
//     } catch (error) {
//       console.error('Error creating form:', error);
//       res.status(500).json({ error: 'Erreur lors de la création du formulaire' });
//     }
//   });
router.get('/forms', async (req, res) => {
    try {
      const forms = await Form.find();
      res.json(forms);
    } catch (error) {
      res.status(500).json({ error: 'Erreur lors de la récupération des formulaires' });
    }
});
///post
router.post('/', async(req,res)=>{
  try {
     const formData  = new Forms(req.body); 
     console.log(formData);
     await formData.save();

     res.status(201).json(formData);
  } catch (error) {
      res.status(500).json({ message: error.message });
  }
})
/////getall
router.get('/', async(req,res)=>{
  console.log("aaaaaaa");

    try {

       const formData = await Forms.find();
       res.status(200).json(formData);

    } catch (error) {
        res.status(404).json({ message: error.message });
    }
});
//update
router.put('/EditForm/:id', async(req,res)=>{
  try {
      const formData  = await Forms.findByIdAndUpdate(req.params.id,  req.body, { new: true });

      if (formData) {
          res.status(200).json(formData);
      } else {
          res.status(404).json({ message: 'Internship form not found' });
      }
  } catch (error) {
      res.status(400).json({ message: error.message });
  }
});
/////getbyid
router.get('/affichebyId/:id', async(req,res)=>{
  try {
      const formData = await Forms.findById(req.params.id);
      console.log("fffffffffffffffffffffffffffffffffff");
console.log(formData);
      if (formData) {
          res.status(200).json(formData);
      } else {
          res.status(404).json({ message: 'Internship form not found' });
      }

  } catch (error) {
      res.status(500).json({ message: error.message }); 
  }
});
/////delete
router.delete('/DeleteForm/:id', async(req,res)=>{
  try {
      const formData = await Forms.findByIdAndDelete(req.params.id);

      if (formData) {
        res.status(200).json('Form deleted successfully');  
      } else {
          res.status(404).json({ message: 'Internship form not found' });  
      }
  } catch (error) {
      res.status(500).json({ message: error.message });
  }
});
module.exports = router;