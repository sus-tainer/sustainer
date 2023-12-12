import { Selector } from 'testcafe';

class ChargeUser {
  constructor() {
    this.pageId = '#charge-user';
    this.pageSelector = Selector(this.pageId);
  }

  /** Asserts that this page is currently displayed. */
  async isDisplayed(testController) {
    await testController.expect(this.pageSelector.exists).ok();
  }
}

export const chargeUser = new ChargeUser();
