exports.login = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email });
        if (!user || !(await bcrypt.compare(password, user.password))) {
            return res.status(401).json({ message: "Invalid credentials" });
        }
        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: "1h" });

        // Set token in an HttpOnly cookie
        res.cookie("token", token, {
            httpOnly: true, // Prevent JavaScript access
            secure: process.env.NODE_ENV === "production", // Use secure cookies in production
            maxAge: 3600000, // 1 hour
        });

        res.status(200).json({ message: "Login successful" });
    } catch (err) {
        res.status(500).json({ error: "Login failed" });
    }
};

exports.logout = (req, res) => {
    res.clearCookie("token");
    res.status(200).json({ message: "Logged out successfully" });
};
