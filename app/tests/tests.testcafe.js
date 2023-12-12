import { landingPage } from './landing.page';
import { signinPage } from './signin.page';
import { signoutPage } from './signout.page';
import { navBar } from './navbar.component';
import { generateQRCodePage } from './generateqrcode.page';
import { addCreditCardPage } from './addcreditcard.page';

/* global fixture:false, test:false */

/** Credentials for one of the sample users defined in settings.development.json. */
const credentialsUser = { username: 'user@foo.com', password: 'changeme' };

// const credentialsAdmin = { username: 'admin@foo.com', password: 'changeme' };

fixture('sustainer localhost test with default db')
  .page('http://localhost:3000');

// Test landing page
test.only('Test that landing page shows up', async (testController) => {
  await landingPage.isDisplayed(testController);
});

// Test log-in page with user credentials
test.only('Test that signin and signout work', async (testController) => {
  await navBar.gotoSignInPage(testController);
  await signinPage.signin(testController, credentialsUser.username, credentialsUser.password);
  await navBar.isLoggedIn(testController, credentialsUser.username);
  await navBar.logout(testController);
  await signoutPage.isDisplayed(testController);
});

// Shell code for QR Code generator test case page
test.only('Test the QR Generator page', async (testController) => {
  await navBar.gotoSignInPage(testController);
  await signinPage.signin(testController, credentialsUser.username, credentialsUser.password);
  await navBar.gotoGenerateQRCodePage(testController);
  await generateQRCodePage.isDisplayed(testController);
  await generateQRCodePage.hasQR(testController);
});

// Shell code for Credit Card test case page
test('Test that payment page works', async (testController) => {
  await navBar.ensureLogout(testController);
  await navBar.gotoSignInPage(testController);
  await signinPage.signin(testController, credentialsUser.username, credentialsUser.password);
  await navBar.gotoAddProjectPage(testController);
  await addCreditCardPage.isDisplayed(testController);
  await addCreditCardPage.addCard(testController);
  await addCreditCardPage.hasCreditCard(testController);
});
