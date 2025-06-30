module.exports = function requireRole(requiredRoles) {
  return (req, res, next) => {
    if (!req.session.user) return res.redirect('/login');

    const userRoles = req.session.user.roles || [];
    
    const required = Array.isArray(requiredRoles) ? requiredRoles : [requiredRoles];

    const hasAccess = required.some((role) => userRoles.includes(role));

    if (!hasAccess) {
      return res.status(403).send('Forbidden: You do not have access to this page.');
    }

    next();
  };
};
