var users = [
  {
    id: 1,
    firstName: 'Dominik',
    lastName: 'Kukacka',
    email: 'dominik@creativebrains.net',
    created: 1439296048339,
    modified: 1439296048339,
  },
  {
    id: 2,
    firstName: 'Markus',
    lastName: 'Danek',
    email: 'markus@creativebrains.net',
    created: 1439296048339,
    modified: 1439296048339,
  },
  {
    id: 3,
    firstName: 'Clemens',
    lastName: 'Ehrenreich',
    email: 'clemens@creativebrains.net',
    created: 1439296048339,
    modified: 1439296048339,
  }
];

module.exports = function (app) {
  app.createCRUD('users', users);
};
