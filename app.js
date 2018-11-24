const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const dbConfig = require('./config');
const errorController = require('./controllers/error');
const User = require('./models/user');
const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');
const app = express();

app.set('view engine', 'ejs');
app.set('views', 'views');


app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

//Will be changed with adding authorization
app.use((req, res, next) => {
    User.findById('5bf95ad6e4122ce64a73eaeb')
        .then(user => {
            req.user = user;
            next();
        })
        .catch(err => console.log(err));
});

app.use('/admin', adminRoutes);
app.use(shopRoutes);

app.use(errorController.get404);


mongoose
    .connect(dbConfig.getDBConnection())
    .then(() => {
        User.findOne().then(user => {
            if(!user){
                const user = new User({
                    name: 'Anna',
                    email: 'test@test.com',
                    cart: {
                        items: []
                    }
                });
                user.save();
            }
        });

        app.listen(process.env.PORT || 3000);
    })
    .catch(err => {
        console.log(err);
    });
