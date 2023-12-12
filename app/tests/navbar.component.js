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
    // await testController.click('#navbar-current-user');
    await testController.click('#sign-out');
  }

  /** Pull down login menu, go to sign up page. */
  async gotoSignUpPage(testController) {
    await this.ensureLogout(testController);
    const visible = await Selector('#main-navbar-nav').visible;
    if (!visible) {
      await testController.click('button.navbar-toggler');
    }
    await testController.click('#login');
    await testController.click('#login-dropdown-sign-up');
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
  async gotoPaymentPage(testController) {
    const visible = await Selector('#main-navbar-nav').visible;
    if (!visible) {
      await testController.click('button.navbar-toggler');
    }
    await testController.click('#navbar-payment');
  }

  /** Go to Return container page. */
  async gotoVendorContainerScanPage(testController) {
    const visible = await Selector('#main-navbar-nav').visible;
    if (!visible) {
      await testController.click('button.navbar-toggler');
    }
    await testController.click('#vendor-container-scan');
  }

  /** Go to About page. */
  async gotoAboutPage(testController) {
    const visible = await Selector('#main-navbar-nav').visible;
    if (!visible) {
      await testController.click('button.navbar-toggler');
    }
    await testController.click('#about');
  }

  /** Go to List Containers Admin page. */
  async gotoListContainterAdmin(testController) {
    const visible = await Selector('#main-navbar-nav').visible;
    if (!visible) {
      await testController.click('button.navbar-toggler');
    }
    await testController.click('#list-containers-admin');
  }

  /** Go to Add container page. */
  async gotoAddContainer(testController) {
    const visible = await Selector('#main-navbar-nav').visible;
    if (!visible) {
      await testController.click('button.navbar-toggler');
    }
    await testController.click('#add-container');
  }

  /** Go to Return container page. */
  async gotoAdminContainerScanPage(testController) {
    const visible = await Selector('#main-navbar-nav').visible;
    if (!visible) {
      await testController.click('button.navbar-toggler');
    }
    await testController.click('#admin-container-scan');
  }

  /** Go to Charge User page. */
  async gotoAdminChargeUser(testController) {
    const visible = await Selector('#main-navbar-nav').visible;
    if (!visible) {
      await testController.click('button.navbar-toggler');
    }
    await testController.click('#admin-charge-user');
  }

  /** Go to Order Approval page. */
  async gotoAdminOrderApprovalPage(testController) {
    const visible = await Selector('#main-navbar-nav').visible;
    if (!visible) {
      await testController.click('button.navbar-toggler');
    }
    await testController.click('#admin-order-approval');
  }
}

export const navBar = new NavBar();
