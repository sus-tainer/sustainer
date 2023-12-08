import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base';
import { Roles } from 'meteor/alanning:roles';

/* eslint-disable no-console */

const createUser = (firstName, lastName, email, password, role) => {
  console.log(`  Creating user ${email}.`);
  const userID = Accounts.createUser({
    firstName: firstName,
    lastName: lastName,
    username: email,
    email: email,
    password: password,
    role: role,
  });
  if (role === 'admin') {
    Roles.createRole(role, { unlessExists: true });
    Roles.addUsersToRoles(userID, 'admin');
  } else if (role === 'moderator') {
    Roles.createRole(role, { unlessExists: true });
    Roles.addUsersToRoles(userID, 'moderator');
  } else if (role === 'vendor') {
    Roles.createRole(role, { unlessExists: true });
    Roles.addUsersToRoles(userID, 'vendor');
  } else if (role === 'user') {
    Roles.createRole(role, { unlessExists: true });
    Roles.addUsersToRoles(userID, 'user');
  }
};

// When running app for first time, pass a settings file to set up a default user account.
if (Meteor.users.find().count() === 0) {
  if (Meteor.settings.defaultAccounts) {
    console.log('Creating the default user(s)');
    Meteor.settings.defaultAccounts.forEach(({ firstName, lastName, email, password, role }) => createUser(firstName, lastName, email, password, role));
  } else {
    console.log('Cannot initialize the database!  Please invoke meteor with a settings file.');
  }
}
