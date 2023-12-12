import { landingPage } from './landing.page';
import { aboutPage } from './about.page';
import { signinPage } from './signin.page';
import { signoutPage } from './signout.page';
import { navBar } from './navbar.component';
import { generateQRCodePage } from './generateqrcode.page';
import { addCreditCardPage } from './addcreditcard.page';
import { listContainersAdmin } from './listcontainersadmin.page';
import { addContainer } from './addcontainer.page';

/* global fixture:false, test:false */

/** Credentials for one of the sample users defined in settings.development.json. */
const credentialsUser = { username: 'user@foo.com', password: 'changeme' };

const credentialsAdmin = { username: 'admin@foo.com', password: 'changeme' };

fixture('sustainer localhost test with default db')
  .page('http://localhost:3000');

// Test landing page
test('Test that landing page shows up', async (testController) => {
  await landingPage.isDisplayed(testController);
});

// Test about page
test('Test that about page shows up', async (testController) => {
  await navBar.gotoAboutPage(testController);
  await aboutPage.isDisplayed(testController);
});

// Test log-in page with user credentials
test('Test that signin and signout work', async (testController) => {
  await navBar.gotoSignInPage(testController);
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
test('Test that payment page works', async (testController) => {
  await navBar.ensureLogout(testController);
  await navBar.gotoSignInPage(testController);
  await signinPage.signin(testController, credentialsUser.username, credentialsUser.password);
  await navBar.gotoAddProjectPage(testController);
  await addCreditCardPage.isDisplayed(testController);
  await addCreditCardPage.addCard(testController);
  await addCreditCardPage.hasCreditCard(testController);
});

// Shell code for List Container Admin test case page
test('Test the List Container Admin page', async (testController) => {
  await navBar.gotoSignInPage(testController);
  await signinPage.signin(testController, credentialsAdmin.username, credentialsAdmin.password);
  await navBar.gotoListContainterAdmin(testController);
  await listContainersAdmin.isDisplayed(testController);
  await listContainersAdmin.hasPieChart(testController);
});

// Shell code for Add Container test case page
test.only('Test the Add Container page', async (testController) => {
  await navBar.gotoSignInPage(testController);
  await signinPage.signin(testController, credentialsAdmin.username, credentialsAdmin.password);
  await navBar.gotoAddContainer(testController);
  await addContainer.isDisplayed(testController);
  await addContainer.addContainer(testController);
});
