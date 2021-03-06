const {
    modelNames
} = require('mongoose');
const product = require('../models/product');
const {
    model
} = require('../models/product');
const Product = require('../models/product');
const {
    prepareToken,
    parseBearer
} = require('../middleware/token');


module.exports.getProducts = function (req, res) {
    const filter = {};
    Product.find(filter)
        .exec((err, products) => {
            if (err) {
                return res.status(404).json({
                    message: 'Products have not been found'
                })
            } else {
                res.status(200).json(products)
            }
        })
};

module.exports.getProductById = function (req, res) {
    const productId = req.params.productId;

    if (productId) {
        Product.findById(productId, (err, product) => {
            if (err) {
                return res.status(404).json({
                    message: 'Product has not been found'
                })
            } else {
                res.status(200).json(
                    product
                )
            }
        })
    } else {
        res.status(400).json({
            message: 'Bad request'
        })
    }
};

module.exports.addProduct = function (req, res) {
    const {
        title,
        price,
        description
    } = req.body;
    const image = req.file.location;

    if (!title || !price || !description || !image) {
        return res.status(400).json({
            message: "Please enter the required fields"
        })
    }
    const newProduct = new Product({
        title: title,
        price: price,
        description: description,
        image: image
    })
    newProduct.save((err) => {
        if (err) {
            return res.status(400).json({
                message: 'Product has not been created'
            })
        }
        res.status(200).json({
            message: 'Product has been successfully created'
        })
    })
};

module.exports.editProduct = function (req, res) {
    const productId = req.body.productId;
    if (productId) {
        Product.findByIdAndUpdate(productId, {
                title: req.body.title,
                price: req.body.price,
                description: req.body.description,
                image: req.file.location
            },
            (err, product) => {
                if (err) {
                    res.status(404).json({
                        message: 'Product has not been found'
                    })
                } else {
                    res.status(200).json({
                        message: 'Product has been successfully changed'
                    })
                }
            })
    } else {
        res.status(400).json({
            message: 'Bad request'
        })
    }
};

module.exports.searchProduct = function (req, res) {
    const filter = {};
    let temp = [];
    let searchKey = req.query.search.toLowerCase();
    console.log(req.query);

    Product.find(filter)
        .exec((err, products) => {
            console.log(products);
            for (let i = 0; i < products.length; i++) {
                if(((products[i].title).toLowerCase()).includes(searchKey)) {
                    temp.push(products[i])
                }
            }

            if(err) {
                return res.status(404).json({
                    message: 'Product has not been found'
                })
            }

            res.status(200).json(temp)
        })
};

module.exports.deleteProduct = function (req, res) {
    const productId = req.params.productId;

    if (productId) {
        Product.findByIdAndDelete(productId, (err) => {
            if (err) {
                res.status(404).json({
                    message: 'Product has not been found'
                })
            } else {
                res.status(204).json({
                    message: 'Product has been successfully deleted'
                })
            }
        })
    } else {
        res.status(400).json({
            message: 'Bad request'
        })
    }
};