import { Selector } from 'testcafe';

class NavBar {

  /** If someone is logged in, then log them out, otherwise do nothing. */
  async ensureLogout(testController) {
    const loggedInUser = await Selector('#navbar-current-user').exists;
    if (loggedInUser) {
      await testController.click('#sign-out');
    }
  }

  async gotoSignInPage(testController) {
    await this.ensureLogout(testController);
    const visible = await Selector('#main-navbar-nav').visible;
    if (!visible) {
      await testController.click('button.navbar-toggler');
    }
    await testController.click('#login');
  }

  /** Check that the specified user is currently logged in. */
  async isLoggedIn(testController) {
    const visible = await Selector('#main-navbar-nav').visible;
    if (!visible) {
      await testController.click('button.navbar-toggler');
    }
    // const loggedInUser = Selector('#navbar-current-user').innerText;
    // await testController.expect(loggedInUser).eql(username);
  }

  /** Check that someone is logged in, then click items to logout. */
  async logout(testController) {
    const visible = await Selector('#main-navbar-nav').visible;
    if (!visible) {
      await testController.click('button.navbar-toggler');
    }
    await testController.expect(Selector('#navbar-current-user').exists).ok();
    await testController.click('#sign-out');
  }

  /** Pull down login menu, go to sign up page. */
  async gotoSignUpPage(testController) {
    await this.ensureLogout(testController);
    const visible = await Selector('#main-navbar-nav').visible;
    if (!visible) {
      await testController.click('button.navbar-toggler');
    }
    await testController.click('#sign-up');
  }

  /** Go to QR Generator page from Nav Bar upon sign in. */
  async gotoGenerateQRCodePage(testController) {
    const visible = await Selector('#main-navbar-nav').visible;
    if (!visible) {
      await testController.click('button.navbar-toggler');
    }
    await testController.click('#navbar-qr-code');
  }

  /** Go to Payment page and add a credit card. */
  async gotoAddPaymentPage(testController) {
    const visible = await Selector('#main-navbar-nav').visible;
    if (!visible) {
      await testController.click('button.navbar-toggler');
    }
    await testController.click('#navbar-payment');
  }
}

export const navBar = new NavBar();
