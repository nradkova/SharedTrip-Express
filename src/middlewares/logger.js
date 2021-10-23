module.exports = () => (req, res, next) => {
    if (!req.url.startsWith('/favicon')) {
        let result = '>>> ' + req.method + req.url;
        if (req.user) {
            result += '      >>> User:' + req.user.email;
        }
        console.log(result);
    }
    next();
};