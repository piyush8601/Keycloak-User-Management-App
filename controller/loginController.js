const keycloakService = require('../services/keycloakService');
const jwt = require('jsonwebtoken');

exports.showLoginForm = (req, res) => {
  res.render('login');
};

exports.handleLogin = async (req, res) => {
  const { username, password } = req.body;

  try {
    const tokenData = await keycloakService.getUserToken(username, password);
    const user = jwt.decode(tokenData.access_token);

    req.session.user = {
      username: user.name,
      firstName : user.given_name,
      lastName : user.family_name,
      email: user.email,
      access_token: tokenData.access_token,
      roles: user.realm_access.roles?? [],
    };
    console.log(user.given_name);
    res.redirect('/dashboard');
  } catch (err) {
    console.error('Login failed:', err.response?.data || err.message);
    res.redirect(`/error?message=${encodeURIComponent('Invalid username or password')}`);
  }
};

exports.showErrorPage = (req, res) => {
  const message = req.query.message || 'Something went wrong. Please try again.';
  res.render('error', { message });
};