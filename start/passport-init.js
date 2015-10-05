var localStrategy = require('passport-local').Strategy;
var bCrypt = require('bcrypt-nodejs');
var mongoose = require('mongoose');
var User = mongoose.model('User');
var Post = mongoose.model('Post');

module.exports = function(passport) {
    
    //
    //
    passport.serializeUser(function(user, done) {
        console.log('serializing user:', user._id);
        //
        return done(null, user._id);
    });
    
    //
    passport.deserializeUser(function(username, done) {
        
        User.findById(id, function(err, user) {
            if(err){
                return done(err, false);
            }
            if(!user){
                return done('user not found', false);
            }
            
            // we found user object provide it back to passport
            return done(user, true);
        });
        
    });
    
    passport.use('login', new localStrategy ({
                passReqToCallback: true
        },
        function(req, username, password, done) {
            
            User.findOne({username: username}, function(err, user){
                
                if(err){
                    return done(err, false);
                }
                
                if(!user){
                    return done('user ' + username + ' not found!', false);
                }
                
                if(!isValidPassword(user, password)) {
                    return done('incorrect pw', false);
                }
                
                return done(null, user);
            });
        
            var user = new User();
        
            user.username = username;
            user.password = createHash(password);
            
            User.save(function(err, user) {
                
                if(err) {
                    return done(err, false);
                }
                console.log('success signup' + username);
                
                return done(null, user);
            });
        }
    ));
        
    passport.use('signup', new localStrategy({
        passReqToCallback : true
    },
    function(req, username, password, done) {
        
        User.findOne({username: username}, function(err, user){
            if(err){
                return done(err, false);
                
                if (user) {
                    return done('username is taken', false);
                }
            }
        });
        if (users[username]){
            console.log('User already exists with username: ' + username);
            return done(null, false);
        }
        

        })
    );
   
    var isValidPassword = function(user, password) {
        return bCrypt.compareSync(password, user.password);
    };
    //
    var createHash = function(password) {
        return bCrypt.hashSync(password, bCrypt.genSaltSync(10), null);
    };
    
};