import sendToken from '../Middleware/sendToken.js';
import auth from '../Models/auth.js'

const login = async (req, res) => {
    const { email, password } = req.body;

    // Validate input fields
    if (!email || !password) {
        return res.status(400).json({ message: "All fields are required" });
    }

    // Validate password length
    if (password.length < 6 || password.length > 8) {
        return res.status(400).json({ message: "Password must be between 6 and 8 characters" });
    }

    try {
        // Check if the email exists
        const existEmail = await auth.findOne({ email }).select("+password");
        if (!existEmail) {
            return res.status(400).json({ message: "User not registered" });
        }

        // Verify the password
        const isPasswordMatched = await existEmail.comparePassword(password);
        if (!isPasswordMatched) {
            return res.status(400).json({ message: "Invalid email or password" });
        }

        // Generate JWT token
        const payload = {
            id: existEmail._id,
            name: existEmail.name,
            email: existEmail.email,
        };

        const data = {
            id: existEmail._id,
            name: existEmail.name,
            email: existEmail.email,
        }

        return sendToken(res, 200, payload, "Login Sucessfull", data)

    } catch (error) {
        // Handle unexpected errors
        return res.status(500).json({ message: "Internal server error", error: error.message });
    }
};


export default login