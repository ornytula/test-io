const Cart = require('../models/Cart');
const Product = require('../models/Product');

exports.getCart = async (req, res) => {
    try {
        const cart = await Cart.findOne({ userId: req.userId })
            .populate('items.productId')
            .exec();
        res.json(cart);
    } catch (error) {
        res.status(500).send(error);
    }
};

exports.addProductToCart = async (req, res) => {
    try {
        const { productId, quantity = 1 } = req.body;
        
        const cart = await Cart.findOne({ userId: req.userId });
        
        if (!cart) {
            const newCart = new Cart({
                userId: req.userId,
                items: [{ productId, quantity }]
            });
            await newCart.save();
            return res.status(201).send(newCart);
        }

        