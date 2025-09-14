const ImageKit = require("imagekit");

const imagekit = new ImageKit({
    publicKey: process.env.IMAGEKIT_PUBLIC_KEY,
    privateKey: process.env.IMAGEKIT_PRIVATE_KEY,
    urlEndpoint: process.env.IMAGEKIT_ENDPOINT_URL
});


async function uploadFile(file, filename) {
    const response = await imagekit.upload({
        file: file, //required
        fileName: filename,   //required
        folder:"cohort-ai-socialmedia"
    })

    return response
}

module.exports = uploadFile;  