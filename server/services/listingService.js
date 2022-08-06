const Listing = require('../models/Listing');
const User = require('../models/User');
const { cloudinary } = require('../config/cloudinary');
const { CLOUDINARY_STORAGE } = require('../config/config');

async function getAll() {
    return await Listing.paginate();
}

async function findByCategory(category) {
    return await Listing.find({ category: category })
}

async function findById(id) {
    return await Listing.findById(id);
}

async function edit(id, data) {
    return await Listing.updateOne({ _id: id }, data);
}
async function remove(id, data) {
    return await Listing.deleteOne({ _id: id }, data);
}

async function create(data, userId) {
    let listing = new Listing({...data})
    await listing.save();

    return await User.updateOne({ _id: userId }, { $push: { createdSells: listing } });
}

async function uploadImage(image) {
    const uploadResponse = await cloudinary.uploader.upload(image, {
        upload_preset: CLOUDINARY_STORAGE,
    }, { quality: "auto" });

    let imageUrl = uploadResponse.url;
    let index = (imageUrl.indexOf('upload/')) + 6;

    let compressedImg = imageUrl
        .substring(0, index) +
        "/c_fit,q_auto,f_auto,w_800" +
        imageUrl.substring(index);

    return compressedImg;
}

async function userCollectionUpdate(userId, listing) {
    return await User.updateOne({ _id: userId }, { $push: { createdSells: listing } });
}

async function findUserById(id) {
    return await User.findById(id);
}

module.exports = {
    create,
    getAll,
    findByCategory,
    findById,
    edit,
    uploadImage,
    userCollectionUpdate,
    findUserById,
    remove
}