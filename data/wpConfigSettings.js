exports.wpConfigSettings = [
  {
    type: 'input',
    name: 'DB_NAME',
    message: 'DB_NAME',
    default: 'database_name_here'
  },
  {
    type: 'input',
    name: 'DB_USER',
    message: 'DB_USER',
    default: 'username_here'
  },
  {
    type: 'input',
    name: 'DB_PASSWORD',
    message: 'DB_PASSWORD',
    default: 'password_here'
  },
  {
    type: 'input',
    name: 'DB_HOST',
    message: 'DB_HOST',
    default: 'localhost'
  },
  {
    type: 'input',
    name: 'table_prefix',
    message: 'table_prefix',
    default: 'wp_'
  }
];
