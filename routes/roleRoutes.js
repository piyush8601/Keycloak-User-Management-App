const express = require('express');
const router = express.Router();
const requireRole = require('../middlewares/requireRole');

const renderRolePage = (title, message) => (req, res) => {
  res.render('rolePage', {
    title,
    message,
    user: req.session.user,
  });
};

router.get('/admin', requireRole('admin'), renderRolePage(
  'Admin Access',
  'Welcome, Admin! You have full access to manage the system.'
));

router.get('/manager', requireRole('manager'), renderRolePage(
  'Manager Access',
  'Welcome, Manager! You can oversee employee operations and reports.'
));

router.get('/employee', requireRole(['employee', 'intern-employee']), renderRolePage(
  'Employee Access',
  'Welcome! You have access to internal resources and tools.'
));

router.get('/user', requireRole(['user', 'admin', 'manager', 'employee', 'intern-employee']), (req, res) => {
  res.render('rolePage', {
    title: 'User Access',
    message: `Welcome ${req.session.user?.username || 'User'}! You’re in the general user area.`,
    user: req.session.user,
  });
});


module.exports = router;
