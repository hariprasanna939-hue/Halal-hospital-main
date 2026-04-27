const roles = {
    hospitalOnly: (req, res, next) => {
        if (req.user.role !== "hospital") {
            return res.status(403).json({ msg: "Hospital access only" });
        }
        next();
    },
    superAdminOnly: (req, res, next) => {
        if (req.user.role !== "admin") {
            return res.status(403).json({ msg: "Super Admin access only" });
        }
        next();
    }
};

module.exports = roles;
