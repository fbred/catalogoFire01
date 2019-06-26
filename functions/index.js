const functions = require('firebase-functions');
const cors = require('cors')({ origin: true })
const fs = require('fs')
const uuid = require('uuid')
const { Storage } = require('@google-cloud/storage')
const storage = new Storage({
    projectId: 'catalogofire01',
    keyFilename: 'catalogofire01-firebase-adminsdk-9rj42-c87510dc66.json'
})

exports.uploadImage = functions.https.onRequest((request, response) => {
    cors(request, response, () => {
        try {
            fs.writeFileSync('/tmp/imageToSave.jpg', 
                request.body.image, 'base64')
            
            const bucket = storage.bucket('catalogofire01.appspot.com')
            const id = uuid()
            bucket.upload('/tmp/imageToSave.jpg', {
                uploadType: 'media',
                destination: `/posts/${id}.jpg`,
                metadata: {
                    metadata: {
                        contentType: 'image/jpeg',
                        firebaseStorageDownloadTokens: id
                    }
                }
            }, (err, file) => {
                if (err) {
                    return response.status(500).json({ error: err })
                } else {
                    const fileName = encodeURIComponent(file.name)
                    const imageUrl = 'https://firebasestorage.googleapis.com/v0/b/'
                        + bucket.name + '/o/' + fileName + '?alt=media&token=' + id
                    return response.status(201).json({ imageUrl: imageUrl })
                }
            })
        } catch (err) {
            return response.status(500).json({ error: err })
        }
    })
});
