const { updateVideo, addVideo, getAllVideos } = require('../controllers/video')
const { videoUpload } = require('../middlewares/videoUpload')

const router = require('express').Router()


router.post('/upload', videoUpload.single('video'), addVideo)
    .get('/videos', getAllVideos)
    .patch('/update/:id', videoUpload.single('video'), updateVideo)
module.exports = router