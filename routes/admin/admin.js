const express = require('express')
const Router = express.Router();
const PRODUCTMODEL = require('../../model/Product.model')
const ADMINMODEL = require('../../model/Admin.model')
const bcrypt = require('bcryptjs');
const auth = require('../../middleware/authMiddleware');
const jwt = require('jsonwebtoken');
const config = require('config');
const { check, validationResult } = require('express-validator');
const CUSTOMERMODEL = require('../../model/Customer.model');
const CustomerModel = require('../../model/Customer.model');


// @route    POST api/login
// @desc     Authenticate admin & get token
// @access   Public
Router.post('/login',
  [
    check('email', 'Please include a valid email').isEmail(),
    check('password', 'Password is required').exists()
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { email, password } = req.body;
    try {
      let user = await ADMINMODEL.findOne({ email });
      if (!user) {
        return res
          .status(400)
          .json({ errors: [{ msg: 'Invalid Credentials' }] });
      }
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res
          .status(400)
          .json({ errors: [{ msg: 'Invalid Credentials' }] });
      }
      const payload = {
        user: {
          id: user.id
        }
      };
      jwt.sign(
        payload,
        config.get('jwtSecret'),
        { expiresIn: '5 days' },
        (err, token) => {
          if (err) throw err;
          res.json({ token });
        }
      );
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server error');
    }
  }
);



// @route    check for SuperuserAdmin
// @access   Public
Router.get('/check', async(req, res)=>{

    let adminCheck = await ADMINMODEL.find({});
    if(adminCheck.length == 0){
      res.json({admin: false})
    }
    else{
      res.json({admin: true})
    }
})


// @route    GET api/access
// @desc     Get admin by token
// @access   Private
Router.get('/access', auth, async (req, res) => {
    try {
      var user = await ADMINMODEL.findById(req.user.id).select('-password');
      res.json(user);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  });


  // @route    update api/admin
// @desc     update admin Credentails
// @access   Private

Router.post('/update',  async(req, res)=>{

    var {uniqueCode, password, updatedPassword, confirmedpassword, email} = req.body;

    if(uniqueCode == "" || email == "" || password == ""){
        res.json({msg: 'Something went wrong'})
    }
    else{
    if(password === confirmedpassword){
        let findAdmin = ADMINMODEL.find({email: email});

        const isMatch = await bcrypt.compare(password, findAdmin.password);

        if(isMatch){

            if(uniqueCode === findAdmin.uniqueCode){

             const salt = await bcrypt.genSalt(10);
             updatedPassword = await bcrypt.hash(updatedPassword, salt);
              var newObject = {email: email, uniqueCode: uniqueCode, password : updatedPassword}

              findAdmin.email = newObject.email;
              findAdmin.password = newObject.password;
              findAdmin.save();
            }
            else{
                res.json({msg: 'Sorry unique code didnt match'});
            }

        }
        else{
            res.json({msg: 'Invalid password'})
        }

    }
    else{
        res.json({msg: 'Invalid credentails'})
    }
    
}



})




  // @route    POST api/register
// @desc     Register admin
// @access   Public
Router.post('/register',
    [
      check('name', 'Name is required').not().isEmpty(),
      check('email', 'Please include a valid email').isEmail(),
      check(
        'password',
        'Please enter a password with 6 or more characters'
      ).isLength({ min: 6 })
    ],
    async (req, res) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
  
      const { name, email, password } = req.body;


      let findAdmin = await ADMINMODEL.find({});

      if(findAdmin.length > 0){
          res.json({msg: 'Admin already exist'})
      }
      else{   
      try {
        let user = await ADMINMODEL.findOne({ email });
  
        if (user) {
          return res
            .status(400)
            .json({ errors: [{ msg: 'User already exists' }] });
        }  

        var uniqueCode = email.slice(0,4) + name.slice(0, 2) + Date.now();
        user = new ADMINMODEL({
          name,
          email,
          password,
          uniqueCode
        });
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(password, salt);
        await user.save();
  
        const payload = {
          user: {
            id: user.id
          }
        };
  
        jwt.sign(
          payload,
          config.get('jwtSecret'),
          { expiresIn: '5 days' },
          (err, token) => {
            if (err) throw err;
            res.json({ token });
          }
        );
      } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
      }
    }
}
  );



  Router.post('/customer/add', async (req, res)=>{
    var {customername, customeremail , customerpassword, buildingno, streetno, postcode} = req.body;
    const getAllCustomers = await CustomerModel.find({email : customeremail});
    if(getAllCustomers.length == 0){

      let customer = new CustomerModel({
        name: customername,
        email: customeremail,
        password: customerpassword,
        address : [
          {
            buildingNo : buildingno,
            StreetNo : streetno,
            postCode : postcode
        }
        ]
      })

      customer.save();
      res.json({msg: 'Customer registered Successfully', type: 'success'});
    }
    else{
      res.json({msg: 'Customer already Exist', type: 'error'});
    }

  })




module.exports = Router;