const express = require('express')
const multer = require('multer')
const fs = require('node:fs')
const cors = require('cors')


const app = express()
const upload = multer({
    dest: 'uploads/'
})
const port = 3000

app.use(cors())

app.post('/upload', upload.array('files', 10), (req, res) => {
    req.files.forEach(file => {
        saveImage(file)
        fs.writeFileSync('./log.txt', fs.readFileSync('log.txt') + '\n' + `File ${file.originalname} uploaded`)
    })
    res.status(200).json({
        message: 'File uploaded sucessfuly'
    })
})

app.delete('/delete/:id', (req, res) => {
    if (fs.existsSync(`./uploads/${req.params.id}`)) {
        fs.unlinkSync(`./uploads/${req.params.id}`)
        fs.writeFileSync('./log.txt', fs.readFileSync('log.txt') + '\n' + `File ${req.params.id} deleted`)
        res.status(200).json({
            message: 'File deleted sucessfully',
            error: false
        })
    } else res.status(404).json({
        message: 'File not found',
        error: true
    })
})

app.get('/files', (req, res) => {
    let files = []
    fs.readdirSync('./uploads').forEach(file => {
        files.push(file)
    })
    res.json({
        files: files
    })
})

app.get('/video/:id', (req, res) => {
    res.send(`
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${req.params.id} - SamFile</title>
    <style>
        * {
            padding: 0;
            margin: 0;
            box-sizing: border-box;
        }
        body {
            height: 100vh;
            width: 100vw;
            display: grid;
            place-content: center;
        }
        video {
            max-width: 80vw;
            max-height: 80vh;
            border-radius: 4px;
        }
    </style>
</head>
<body>
    <video src="http://localhost:3000/file/${req.params.id}" autoplay controls></video>
</body>
</html>
    `)
})

app.use('/file', express.static('uploads'))

function saveImage(file) {
    const newPath = `./uploads/${file.originalname}`
    fs.renameSync(file.path, newPath)
}

app.listen(port, () => {
    console.log(`Listenning on port ${port}`)
})