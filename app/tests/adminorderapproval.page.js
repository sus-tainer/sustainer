import { Selector } from 'testcafe';

class AdminOrderApprovalPage {
  constructor() {
    this.pageId = '#order-approval';
    this.pageSelector = Selector(this.pageId);
  }

  /** Asserts that this page is currently displayed. */
  async isDisplayed(testController) {
    await testController.expect(this.pageSelector.exists).ok();
  }
}

export const adminOrderApprovalPage = new AdminOrderApprovalPage();
