const keycloakService = require('../services/keycloakService.js');

exports.showRegisterForm = (req, res) => {
  res.render('register');
};

exports.handleRegister = async (req, res) => {
  const { firstName, lastName, email, password, role } = req.body;

  try {
    const token = await keycloakService.getAdminToken();
    const username = email;

    await keycloakService.createUser(token, {
      username,
      email,
      password,
      firstName,
      lastName,
    });

    const userId = await keycloakService.getUserId(token, username);
    const roleData = await keycloakService.getRoleByName(token, role);

    await keycloakService.assignRole(token, userId, roleData);

    res.render('success', { username: `${firstName} ${lastName}`, role });
  } catch (err) {
    console.error('Registration error:', err.response?.data || err.message);
    res.status(500).send('Registration failed. Please try again.');
  }
};

exports.showErrorPage = (req, res) => {
  const message = req.query.message || 'Something went wrong. Please try again.';
  res.render('error', { message });
};
