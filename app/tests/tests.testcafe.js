import { landingPage } from './landing.page';
import { signinPage } from './signin.page';
import { signoutPage } from './signout.page';
import { navBar } from './navbar.component';

/* global fixture:false, test:false */

/** Credentials for one of the sample users defined in settings.development.json. */
const credentials = { username: 'john@foo.com', password: 'changeme' };

fixture('meteor-application-template-react localhost test with default db')
  .page('http://localhost:3000');

test('Test that landing page shows up', async (testController) => {
  await landingPage.isDisplayed(testController);
});

test('Test that signin and signout work', async (testController) => {
  await navBar.gotoSignInPage(testController);
<<<<<<< HEAD
  await signinPage.signin(testController, credentialsUser.username, credentialsUser.password);
  await navBar.isLoggedIn(testController, credentialsUser.username);
  await navBar.logout(testController);
  await signoutPage.isDisplayed(testController);
});

// Shell code for QR Code generator test case page
test('Test the QR Generator page', async (testController) => {
  await navBar.gotoSignInPage(testController);
  await signinPage.signin(testController, credentialsUser.username, credentialsUser.password);
  await navBar.gotoGenerateQRCodePage(testController);
  await generateQRCodePage.isDisplayed(testController);
  await generateQRCodePage.hasQR(testController);
});

// Shell code for Credit Card test case page
// test
test.only('Test that payment page works', async (testController) => {
  await navBar.ensureLogout(testController);
  await navBar.gotoSignInPage(testController);
  await signinPage.signin(testController, credentialsUser.username, credentialsUser.password);
  await navBar.gotoAddProjectPage(testController);
  await addCreditCardPage.isDisplayed(testController);
  await addCreditCardPage.addCard(testController);
  await addCreditCardPage.hasCreditCard(testController);
});
=======
  await signinPage.signin(testController, credentials.username, credentials.password);
  await navBar.isLoggedIn(testController, credentials.username);
  await navBar.logout(testController);
  await signoutPage.isDisplayed(testController);
});
>>>>>>> parent of fd2064a (Merge branch 'main' of https://github.com/sus-tainer/sustainer)
