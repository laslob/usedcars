const express = require('express');
const multer = require('multer');
const path = require('path');

const router = express.Router();

// Set storage engine
const storage = multer.diskStorage({
    destination: './public/uploads/',
    filename: function(req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
});

// Init upload
const upload = multer({
    storage: storage,
    limits: {fileSize: 1000000},
    fileFilter: function(req, file, cb){
        checkFileType(file, cb);
    }
}).single('myImage');

// Check file type
function checkFileType(file, cb) {
    const filetypes = /jpeg|jpg|png|gif/;    
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());    
    const mimetype = filetypes.test(file.mimetype);

    if(mimetype && extname) {
        return cb(null, true);
    } else {
        cb('Error: images Only');
    }
}

// Public Folder
//router.use(express.static('./public'));

router.post('/', (req, res) => {
     upload(req, res, (err) => {
        if(err) return res.send(err);
        if(req.file == undefined) return res.send('Error: no File Selected');
         
        res.send({file: `uploads/${req.file.filename}`});            
        })
})

module.exports = router;

