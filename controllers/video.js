const VideoSchema = require('../models/VideoModel');

exports.addVideo = async (req, res) => {
    const { title, description } = req.body;
    const videoPath = req.file.path;

    const video = new VideoSchema({
        title,
        description,
        filename: req.file.filename,
        videoUrl: videoPath
    })

    try {
        await video.save();
        res.status(200).json({
            message: 'Video Uploaded Succesfully',
            video
        })
    } catch (error) {
        res.status(400).json({
            message: 'Video upload failed',
            error
        })
    }
}

exports.updateVideo = async (req, res) => {
    const { id } = req.params; // ID of the video to be updated
    const { title, description } = req.body;
    const videoPath = req.file.path;

    // Find the video by ID
    try {
        const video = await VideoSchema.findById(id);

        if (!video) {
            return res.status(404).json({
                message: 'Video not found',
            });
        }

        // Update the video properties
        video.title = title ?? video.title ;
        video.description = description ?? video.description;
        video.filename = req.file.filename ?? video.filename;
        video.videoUrl = videoPath ?? video.videoUrl;

        // Save the updated video
        await video.save();

        res.status(200).json({
            message: 'Video updated successfully',
            video,
        });
    } catch (error) {
        res.status(400).json({
            message: 'Video update failed',
            error,
        });
    }
};


exports.getAllVideos = async (req, res) => {
    try {
        const videos = await VideoSchema.find({})
        res.status(200).json({
            videos
        })
    } catch (error) {
        res.status(400).json({
            message: 'Videos fetch failed',
            error
        })
    }
}
