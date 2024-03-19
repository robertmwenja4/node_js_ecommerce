const express = require('express')
const cors = require('cors');
const dotenv = require('dotenv');
const passport = require('passport');
const User = require('./models/userModel');
const bcrypt = require('bcryp')
dotenv.config();



const app = express();
var corsOptions = {
    origin: 'https://localhost:8081'
}

//Middleware
app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(passport.initialize());
app.use(passport.session());


passport.use(new LocalStrategy(
    function(email, password, done){
        User.findOne({email: email}, (user, err)=>{
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

app.post('/login',
    passport.authenticate('local', {failureRedirect: '/login'}),
    function(req, res){
        res.redirect('/');
    }
)

//Routes
const PORT = process.env.APP_PORT;
app.listen(PORT, ()=>{
    console.log(`Server Running at port ${PORT}`);
})