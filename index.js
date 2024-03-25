const express = require('express')
const cors = require('cors');
const dotenv = require('dotenv');
const passport = require('passport');
const User = require('./models/userModel.js');
const bcrypt = require('bcryptjs')
const LocalStrategy = require('passport-local').Strategy
const session = require('express-session')
const userRouter = require('./routes/userRoute.js')
const productRouter = require('./routes/productRoute.js')
const orderRouter = require('./routes/orderRoute.js')
const discountRouter = require('./routes/discountRoute.js')
const flash = require('connect-flash');
dotenv.config();



const app = express();
var corsOptions = {
    origin: 'https://localhost:8081'
}

//Middleware
app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(session({
    secret: 'your_secret_key',
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());

app.use(flash());


passport.use(new LocalStrategy(
    function(email, password, done){
        User.findOne({where:{email: email}}, (user, err)=>{
            if(err){ return done(err); }
            if(!user){
                return done(null, false, {message: "Incorrect Email"});
            }
            if(!user.verifyPassword(password)){
                return done(null, false, {message: 'Invalid Password!'});
            }
            return done(null,user);
        })
    }
));

passport.serializeUser(function(user, done){
    done(null, user.id);
});
passport.deserializeUser(function(id, done){
    User.findById(id, (err, user)=>{
        done(err, user);
    })
})

const userExists = async(req, res) =>{
    const user = await User.findOne({
        where: {
            email: req.body.email
        }
    })
    if (user) {
        res.status(200).json({message: "User Exists"})
    }else{
        res.status(200).json({message: "User does not Exists"})
    }
}



app.use('/api', userRouter);
app.use('/api/products', productRouter);
app.use('/api/orders', orderRouter);
app.use('/api/discounts', discountRouter);
app.post('/login',
  passport.authenticate('local'),
  function(req, res) {
    // If this function gets called, authentication was successful.
    // `req.user` contains the authenticated user.
    res.send(200);
  });
//Routes
const PORT = process.env.APP_PORT;
app.listen(PORT, ()=>{
    console.log(`Server Running at port ${PORT}`);
})