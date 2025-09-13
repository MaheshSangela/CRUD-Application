import User from "../model/userModel.js";

//Add User Data / user
export const create = async (req, res) => {
    try {
        const newUser = new User(req.body);
        const { email } = newUser

        const userExist = await User.findOne({ email });
        if (userExist) {
            return res.status(400).json({ message: "User already exists" })
        }

        const saveDtata = await newUser.save();
        // res.status(200).json(saveDtata);
        res.status(200).json({ message: "User created successfully" });

    } catch (error) {
        res.status(500).json({ errorMessage: error.message })
    }
};

//All User Data
export const getAllUsers = async (req, res) => {
    try {
        const userData = await User.find();
        if (!userData || userData.length === 0) {
            return res.ststus(404).json({ message: "user Data not found" });
        }
        res.status(200).json(userData);

    } catch (error) {
        res.status(500).json({ errorMessage: error.message })
    }
};
//Find User By ID
export const getUserById = async (req, res) => {
    try {
        const id = req.params.id;
        const userExist = await User.findById(id);
        if (!userExist) {
            return res.status(404).json({ message: "User not found" })
        }
        res.status(200).json(userExist);
    } catch (error) {
        res.status(500).json({ errorMessage: error.message })
    }
};

//Update User Data

export const update = async (req, res) => {
    try {
        const id = req.params.id;
        const userExist = await User.findById(id);
        if (!userExist) {
            return res.status(404).json({ message: "User not found" })
        }
        const updateData = await User.findByIdAndUpdate(id, req.body, {
            new: true
        })
        // res.status(200).json(updateData);
        res.status(200).json({ message: "user updated successfully", user: updateData });
    } catch (error) {
        res.status(500).json({ updateData })
    }
};

//Delete User

export const deleteUser = async (req, res) => {
    try {
        const id = req.params.id;
        const userExist = await User.findById(id);
        if (!userExist) {
            return res.status(404).json({ message: "User not found" })
        }
        await User.findByIdAndDelete(id);
        res.status(200).json({ message: "user deleted successfully" });
    } catch (error) {
        res.status(500).json({ errorMessage: error.message })
    }
}



