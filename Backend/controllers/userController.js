import userModel from '../models/userModel.js'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs'
import validator from 'validator'

const createToken = (id) => {
    return jwt.sign({id},process.env.JWT_SECRET)
}

// register user
const registerUser = async (req, res) => {
    try {
        const {name, email, password} = req.body;

        // checking user already exits
        const exists = await userModel.findOne({email}) 
        if(exists){
            return res.send({success: false, message: "User already exist"})
        }

        // validating email format and strong password
        if(!validator.isEmail(email)){
            return res.send({success: false , message: "Please enter a valid email"})
        }
        if(password.length<8){
            return res.send({success: false, message: "Please enter a strong password"})
        }

        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = new userModel({
            name:name,
            email:email,
            password:hashedPassword
        })
        const user = await newUser.save()
        const token = createToken(user._id)
        return res.send({success: true, message: "User created successfully", token})
    } catch (error) {
        console.log(error)
        return res.send({success: false, message: "Error"})
    }
}


// Login user
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await userModel.findOne({ email });
    if (!user) {
      return res.status(401).send({ success: false, message: "User not found" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).send({ success: false, message: "Invalid credentials" });
    }

    const token = createToken(user._id);
    return res.status(200).send({ success: true, message: "Login successful", token, role: user.role });
  } catch (error) {
    console.error(error);
    return res.status(500).send({ success: false, message: "Internal server error" });
  }
};

const getCurrentUser = async (req, res) => {
  try {
    const token = req.headers.token;
    if (!token) return res.status(401).json({ message: 'No token provided' });

    // Verify token and get user data
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await userModel.findById(decoded.id).select('-password');

    if (!user) return res.status(404).json({ message: 'User not found' });

    // Return user data, including role
    res.json({ 
      id: user._id,
      email: user.email,
      role: user.role,   // assuming role is stored in user document
      name: user.name,
    });
  } catch (error) {
    res.status(401).json({ message: 'Invalid token' });
  }
};

const getAllUserController = async (req, res) => {
  try {
    const getUser = await userModel.find();
    res.status(200).send({ success: true, user: getUser });
  } catch (error) {
    console.error('Error in getAllFoodListController:', error);
    res.status(500).send({ message: 'Server Error' });
  }
};

export { registerUser, loginUser, getCurrentUser, getAllUserController }