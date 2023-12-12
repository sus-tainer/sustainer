import { landingPage } from './landing.page';
import { aboutPage } from './about.page';
import { signinPage } from './signin.page';
import { signoutPage } from './signout.page';
import { navBar } from './navbar.component';
import { generateQRCodePage } from './generateqrcode.page';
import { addCreditCardPage } from './addcreditcard.page';
import { listContainersAdmin } from './listcontainersadmin.page';
import { addContainer } from './addcontainer.page';
import { adminContainerScanPage } from './admincontainerscan.page';
import { chargeUser } from './chargeuser.page';
import { adminOrderApprovalPage } from './adminorderapproval.page';
import { vendorContainerScanPage } from './vendorcontainerscan.page';
import { vendorOrderHistory } from './orderhistoryvendor.page';
import { inventoryContainersVendor } from './inventorycontainersvendor.page';

/* global fixture:false, test:false */

/** Credentials for one of the sample users defined in settings.development.json. */
const credentialsUser = { username: 'user@foo.com', password: 'changeme' };

/** Credentials for one of the sample users defined in settings.development.json. */
const credentialsVendor = { username: 'burgers@foo.com', password: 'changeme' };

/** Credentials for the admin user defined in settings.development.json. */
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
  await navBar.gotoPaymentPage(testController);
  await addCreditCardPage.isDisplayed(testController);
});

// Shell code for Vendor Scan test case page
test('Test the Vendor Scan page', async (testController) => {
  await navBar.gotoSignInPage(testController);
  await signinPage.signin(testController, credentialsVendor.username, credentialsVendor.password);
  await navBar.gotoVendorContainerScanPage(testController);
  await vendorContainerScanPage.isDisplayed(testController);
});

// Shell code for Vendor Order History test case page
test('Test the Vendor Order History page', async (testController) => {
  await navBar.gotoSignInPage(testController);
  await signinPage.signin(testController, credentialsVendor.username, credentialsVendor.password);
  await navBar.gotoVendorOrderHistory(testController);
  await vendorOrderHistory.isDisplayed(testController);
  await vendorOrderHistory.hasTable(testController);
});

// Shell code for Vendor Container Inventory List test case page
test('Test the Vendor Container Inventory List page', async (testController) => {
  await navBar.gotoSignInPage(testController);
  await signinPage.signin(testController, credentialsVendor.username, credentialsVendor.password);
  await navBar.gotoVendorInventory(testController);
  await inventoryContainersVendor.isDisplayed(testController);
  await inventoryContainersVendor.hasTable(testController);
});

// Shell code for Vendor Order Containers test case page
test.only('Test that Vendor Order Containers page works', async (testController) => {
  await navBar.ensureLogout(testController);
  await navBar.gotoSignInPage(testController);
  await signinPage.signin(testController, credentialsVendor.username, credentialsVendor.password);
  await navBar.gotoPaymentPage(testController);
  await inventoryContainersVendor.isDisplayed(testController);
  await inventoryContainersVendor.hasTable(testController);
  await addCreditCardPage.isDisplayed(testController);
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
test('Test the Add Container page', async (testController) => {
  await navBar.gotoSignInPage(testController);
  await signinPage.signin(testController, credentialsAdmin.username, credentialsAdmin.password);
  await navBar.gotoAddContainer(testController);
  await addContainer.isDisplayed(testController);
  await addContainer.addContainer(testController);
});

// Shell code for Return Container test case page
test('Test the Return Container page', async (testController) => {
  await navBar.gotoSignInPage(testController);
  await signinPage.signin(testController, credentialsAdmin.username, credentialsAdmin.password);
  await navBar.gotoListContainterAdmin(testController);
  await listContainersAdmin.isDisplayed(testController);
  await listContainersAdmin.hasPieChart(testController);
});

// Shell code for Admin Container Scan test case page
test('Test the Admin Container Scan page', async (testController) => {
  await navBar.gotoSignInPage(testController);
  await signinPage.signin(testController, credentialsAdmin.username, credentialsAdmin.password);
  await navBar.gotoAdminContainerScanPage(testController);
  await adminContainerScanPage.isDisplayed(testController);
});

// Shell code for Admin Charge User test case page
test('Test the Admin Charge User page', async (testController) => {
  await navBar.gotoSignInPage(testController);
  await signinPage.signin(testController, credentialsAdmin.username, credentialsAdmin.password);
  await navBar.gotoAdminChargeUser(testController);
  await chargeUser.isDisplayed(testController);
});

// Shell code for Admin Order Approval test case page
test('Test the Admin Order Approval page', async (testController) => {
  await navBar.gotoSignInPage(testController);
  await signinPage.signin(testController, credentialsAdmin.username, credentialsAdmin.password);
  await navBar.gotoAdminOrderApprovalPage(testController);
  await adminOrderApprovalPage.isDisplayed(testController);
});
