const Product = require('../models/product');

exports.getAddProduct = (req, res, next) => {
    res.render('admin/edit-product', { 
      pageTitle: 'Add Product',
      path: '/admin/add-product',
      editing: false
    });
};

exports.postAddProduct = (req, res, next) => {
    const {
        title, 
        imageUrl, 
        description, 
        price
    } = req.body;

    const product = new Product({
        title, 
        price, 
        description, 
        imageUrl,
        userId: req.user._id
    });

    product
        .save()
        .then(result => res.redirect('/admin/products'))
        .catch(err => console.log(err));
};

exports.getEditProduct = (req, res, next) => {
    const editMode = req.query.edit;
    if(!editMode){
        return res.redirect('/');
    }
    const prodId = req.params.productId;

    Product
        .findById(prodId)
        .then(product => { 
            if(!product){
                res.redirect('/');
            }
            res.render('admin/edit-product', { 
                product: product,
                pageTitle: 'Edit Product',
                path: '/admin/edit-product',
                editing: editMode
            });
        })
        .catch(err => console.log(err));
};

exports.postEditProduct = (req, res, next) => {
    const { 
        productId, 
        title, 
        price, 
        imageUrl, 
        description 
    } = req.body;

    Product
        .findById(productId)
        .then(product => {
            product.title = title;
            product.price = price;
            product.description = description;
            product.imageUrl = imageUrl;
            return product.save();
        })
        .then(result => {
            res.redirect('/admin/products');
        })
        .catch(err => console.log(err))
}

exports.postDeleteProduct = (req, res, next) => {
    const productId = req.body.productId;
    Product
        .findByIdAndRemove(productId)
        .then(() => {
            res.redirect('/admin/products');
        })
        .catch(err => console.log(err));
}

exports.getProducts = (req, res, next) => {
    Product
        .find()
        .then(products => {
            res.render('admin/products', {
                prods: products,
                pageTitle: 'All Products',
                path: '/admin/products'
            });
        }).catch(err => console.log(err));
}
