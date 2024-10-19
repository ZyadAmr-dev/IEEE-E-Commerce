export const guard = {
    checkUser: (req, res, next) => {
        if (req.user && req.user.role === 'user') {
            next();
        } else {
            return res.status(403).json({ message: 'Access denied. Admins only.' });
        }
    }
};
