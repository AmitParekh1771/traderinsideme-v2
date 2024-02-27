
module.exports = function(req, res, next) {
    if(!req.admin.isHead) return res.status(403).send("Access denied.");
    next();
}