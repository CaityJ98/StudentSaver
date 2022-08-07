const { Router } = require("express");
const router = Router();
const { cloudinary } = require("../config/cloudinary");
const isAuth = require("../middlewares/isAuth");
const Listing = require("../models/Listing");
const User = require("../models/User");
const moment = require("moment");
const stripeRouter = require("../stripe.js");
const listingService = require("../services/listingService");

router.get("/marketplace", async (req, res) => {
  const { page, search } = req.query;
  try {
    let listings;
    if (search !== "" && search !== undefined) {
      listings = await Listing.find();
      listings = listings.filter((x) => x.active == true);
      listings = listings.filter(
        (x) =>
          x.title.toLowerCase().includes(search.toLowerCase()) ||
          x.city.toLowerCase().includes(search.toLowerCase())
      );
      res.status(200).json({ listings: listings, pages: listings.pages });
    } else {
      listings = await Listing.paginate(
        {},
        { page: parseInt(page) || 1, limit: 5 }
      );
      listings.docs = listings.docs.filter((x) => x.active == true);
      res.status(200).json({ listings: listings.docs, pages: listings.pages });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get("/paginate", async (req, res) => {
  const { page, category, search } = req.query;
  // below to change search on category
  const query = category ? { category } : search ? { title: search } : {};
  try {
    let listings = await Listing.paginate(query, {
      page: parseInt(page) || 1,
      limit: 10
    });

    res.status(200).json({ listings: listings.docs, pages: listings.pages });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get("/specific/:id", async (req, res) => {
  try {
    let listing = await (await Listing.findById(req.params.id)).toJSON();
    let seller = await (await User.findById(listing.seller)).toJSON();
    Listing.addedAt = moment(listing.addedAt).format("d MMM YYYY (dddd) HH:mm");
    let jsonRes = {
      ...listing,
      name: seller.name,
      email: seller.email,
      createdSells: seller.createdSells.length,
      avatar: seller.avatar,
      sellerId: seller._id,
      isAuth: false
    };
    if (req.user) {
      let user = await User.findById(req.user._id);
      jsonRes.isSeller = Boolean(req.user._id == listing.seller);
      jsonRes.isAuth = true;
    }
    res.status(200).json(jsonRes);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
router.delete("/remove/:id", async (req, res) => {
  let { title, price, description, condition, category, image } = req.body;
  let listing = (await Listing.findById(req.params.id)).toJSON();
  await listingService.remove(req.params.id, {
    title,
    price,
    description,
    condition,
    category,
    image: compressedImg
  });
  try {
    if (stripeRouter === res.status(200)) {
      listing.findByIdAndDelete(listing._id);
    }
    res.status(201).json({ message: "Deleted!" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.post("/add-listing", async (req, res) => {
  let { title, price, description, condition, category, image } = req.body;

  try {
    let errors = [];
    if (title.length < 3 || title.length > 50)
      errors.push(
        "Title should be at least 3 characters long and max 50 characters long; "
      );
    if (isNaN(Number(price))) errors.push("Price should be a number; ");
    if (description.length < 10 || description.length > 1000)
      errors.push(
        "Description should be at least 10 characters long and max 1000 characters long; "
      );
    if (!condition) errors.push("Condition is required; ");
    if (!image) errors.push("The uploaded file should be an image; ");
    if (!category) errors.push("Category is required; ");

    if (errors.length >= 1) throw { message: errors };

    let compressedImg = await listingService.uploadImage(image);
    let listing = new Listing({
      title,
      price,
      description,
      condition,
      category,
      image: compressedImg,
      addedAt: new Date(),
      seller: req.user._id
    });

    await listing.save();
    await listingService.userCollectionUpdate(req.user._id, listing);

    res.status(201).json({ listingId: listing._id });
  } catch (err) {
    console.error(err);
    res.status(404).json({ error: err.message });
  }
});

router.patch("/edit/:id", isAuth, async (req, res) => {
  let { title, price, description, condition, category, image } = req.body;
  try {
    let user = await listingService.findUserById(req.user._id);
    let listing = await listingService.findById(req.params.id);
    let errors = [];
    if (user._id.toString() !== listing.seller.toString()) {
      errors.push("You have no permission to perform this action! ");
    }

    if (title.length < 3 || title.length > 50)
      errors.push(
        "Title should be at least 3 characters long and max 50 characters long; "
      );
    if (isNaN(Number(price))) errors.push("Price should be a number; ");
    if (description.length < 10 || description.length > 1000)
      errors.push(
        "Description should be at least 10 characters long and max 1000 characters long; "
      );
    if (req.body.image) {
      if (!req.body.image.includes("image"))
        errors.push("The uploaded file should be an image; ");
    }
    if (!category || category == "Choose...")
      errors.push("Category is required; ");
    if (!condition || condition == "Choose...")
      errors.push("Condition is required; ");

    if (errors.length >= 1) throw { message: [errors] };

    if (req.body.image) {
      let compressedImg = await listingService.uploadImage(req.body.image);
      await listingService.edit(req.params.id, {
        title,
        price,
        description,
        condition,
        category,
        image: compressedImg
      });
    } else {
      await listingService.edit(req.params.id, {
        title,
        price,
        description,
        condition,
        category
      });
    }
    res.status(201).json({ message: "Updated!" });
  } catch (err) {
    res.status(404).json({ error: err.message });
  }
});

router.get("/sells/active/:id", async (req, res) => {
  try {
    let userId = "";
    if (req.params.id) {
      userId = req.params.id;
    } else {
      userId = req.user_id;
    }
    let user = await (
      await User.findById(userId).populate("createdSells")
    ).toJSON();
    res
      .status(200)
      .json({ sells: user.createdSells.filter((x) => x.active), user });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get("/sells/archived", async (req, res) => {
  try {
    let user = await (
      await User.findById(req.user._id).populate("createdSells")
    ).toJSON();
    res.status(200).json({
      sells: user.createdSells.filter((x) => x.active == false),
      user
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get("/enable/:id", async (req, res) => {
  try {
    await Listing.updateOne({ _id: req.params.id }, { active: true });
    res.status(200).json({ msg: "Activated" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get("/archive/:id", async (req, res) => {
  try {
    await Listing.updateOne({ _id: req.params.id }, { active: false });
    res.status(200).json({ msg: "Archived" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
