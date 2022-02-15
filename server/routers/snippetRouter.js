const router = require('express').Router();
const Snippet = require('../models/snippetModel');


// GET /snippets
router.get('/', async (req, res) => {
  try {
    const snippets = await Snippet.find();
    res.status(200).json(snippets);

  } catch (err) {
    res.status(500).json({ message: 'Failed to get snippets' });
  }
});

// POST /snippets
router.post("/", async (req, res) => {
  // try the code but if not successful it will catch the error
  try{
    const {title, description, code} = req.body;

  // validation (status code 400 means bad request)
  if(!description && !code) {
    return res.status(400).json({errorMessage: "You need to provide a description or some code"});
  }
  
  // create a new snippet containing the data from the request
  const newSnippet = new Snippet({
    title,
    description,
    code
  });
  
  // await the promise to be resolved
  const savedSnippets = await newSnippet.save();

  res.json(savedSnippets);
  }catch(err){
    // status code 500 means generic internal server error
    res.status(500).send();
  }
});

// PUT /snippets/:id
router.put("/:id", async (req,res) => {
  try {
    // send the new structure with the updated data
    const {title, description, code} = req.body;
    const snippetId = req.params.id;

    // validation

    if(!description && !code) {
      return res.status(400).json({errorMessage: "You need to provide a description or some code"});
    }

    if(!snippetId) 
      return res.status(400).json({errorMessage: "You need to provide a snippet id"});
    
    const originalSnippet = await Snippet.findById(snippetId);
    if (!originalSnippet)
      return res.status(400).json({errorMessage: "Snippet not found"});
    
    // update the existing snippet with the new data
    originalSnippet.title = title;
    originalSnippet.description = description;
    originalSnippet.code = code;

    // await the promise to be resolved
    const savedSnippets = await originalSnippet.save();
    // send the updated snippet
    res.json(savedSnippets);
    
  } catch(err) {
    // res.status(500).send();
    res.status(500).send({errorMessage: "SnippetID not found"});
  }
})

// DELETE /snippets/:id (:id is a placeholder for the id of the snippet)
router.delete("/:id", async (req, res) => {
  try {
    const snippetId  = req.params.id;

    // validation
    if(!snippetId)
      return res.status(400).json({errorMessage: "You need to provide a snippet id.  Please conect the developer."});
    
    const existingSnippet = await Snippet.findById(snippetId);
    if(!existingSnippet) 
      return res.status(400).json({errorMessage: "No snippet with that id.  Please contact the developer."});
    
    await existingSnippet.delete();

    res.json(existingSnippet);

  } 
  catch (err) {
    res.status(500).json({ errorMessage: 'Failed to delete snippet' });
  }
});

module.exports = router;
