import User from "../models/user.model.js"

// Create User 
export const createUser = async (req,res) =>{
try {
    const {username, email, fullName, dateOfBirth, image, address} = req.body;

    const existingUser = await User.findOne({email})

    if(existingUser){
        return res.status(400).send("User with emailID already Exists")
    }

    const user = new User({
        fullName : fullName,
        email : email,
        dateOfBirth : dateOfBirth,
        image : image,
        username : username,
        address : address
    })

    await user.save();

    res.status(200).send("User Created Successfully")

} catch (err) {
    res.status(500).send(err.message)
}
}


// Login User

export const loginUser = async (req,res) =>{
    const {email, password} = req.body;

    try {
        const user = await User.findOne({email})

        if (!user)
            {
                res.status(400).send("Invalid EmailID or Password")
            }

        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (!isPasswordValid) {
            res.status(400).send("Invalid EmailID or Password")
        }

        else res.status(200).send({"message" : "Login Success", user :user})
    } catch (err) {

        res.status(500).send(err.message)
        
    }
}

// deleteProfile
export const deleteProfile = async (req, res) => {
    const {email} = req.body;
    
    try {
        const user = await User.deleteOne({email})

        if (user.deletedCount == 1) res.status(200).send("User Deleted");

        else res.status(401).send("User Not Found")
    } catch (error) {
        res.status(500).send("Internal Server Error", error)
    }

}


// Update User 
export const updateUser = async (req, res) => {
    try {
        const { username, email, fullName, dateOfBirth, image, address } = req.body;

        const existingUser = await User.findOneAndUpdate(
            { email },
            {
                $set: {
                    username: username,
                    fullName: fullName,
                    dateOfBirth: dateOfBirth,
                    image: image,
                    address: address
                }
            },
            { new: true } // Return the updated document
        );

        if (!existingUser) {
            return res.status(404).send("User not found");
        }

        res.status(200).json({
            message: "User updated successfully",
            user: existingUser
        });

    } catch (err) {
        res.status(500).send(err.message);
    }
}

