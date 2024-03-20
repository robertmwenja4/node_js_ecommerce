const db = require('../models');
const bcrypt = require('bcryptjs')
const passport = require('passport');
const flash = require('connect-flash');

const User = db.users;

const registerUser =  async (req,res)=>{
    const {name, email, password, confirm_password} = req.body;
    let error = [];
    if(!name || !email || !password || !confirm_password){
        error.push({message: "Please fill all fields!!"});
    }
    if(password !== confirm_password){
        error.push({message: "Password do not Match!!"})
    }
    if (password.length < 6) {
        error.push({ msg: 'Password must be at least 6 characters' });
    }
    if(error.length > 0){
        res.status(500).send({error})
    }else{
        const user = await User.findOne({
            where: {
                email: email
            }
        });
        if(user){
            error.push({message: "User exists!!"});
            res.send({error});
        }else{
            const newUser = new User({
                name, email, password
            });

            bcrypt.genSalt(10, (err, salt)=>{
                bcrypt.hash(newUser.password, salt, (err, hash)=>{
                    if(err) throw err;
                    newUser.password = hash;
                    newUser.save().then(user =>{
                        res.status(201).send({success: "User Created Successfully!!"})

                    }).catch(err =>{
                        console.log(err);
                    });
                })
            })
        }
        // User.findOne({email: email}).then(user =>{
        //     if(user){
        //         error.push({message: "User exists!!"});
        //         res.send({error});
        //     }else{
        //         const newUser = new User({
        //             name, email, password
        //         });

        //         bcrypt.genSalt(10, (err, salt)=>{
        //             bcrypt.hash(newUser.password, salt, (err, hash)=>{
        //                 if(err) throw err;
        //                 newUser.password = hash;
        //                 newUser.save().then(user =>{
        //                     res.status(201).send({success: "User Created Successfully!!"})

        //                 }).catch(err =>{
        //                     console.log(err);
        //                 });
        //             })
        //         })
        //     }
        // })
    }
}

const loginUser = (req, res) => {
    passport.authenticate('local'),(req, res)=>{
        res.send(200)
    };
}

module.exports = {
    registerUser, loginUser
}