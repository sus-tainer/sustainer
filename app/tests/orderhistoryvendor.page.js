import { Selector } from 'testcafe';

class VendorOrderHistory {
  constructor() {
    this.pageId = '#vendor-history-page';
    this.pageSelector = Selector(this.pageId);
  }

  /** Checks that this page is currently displayed. */
  async isDisplayed(testController) {
    await testController.expect(this.pageSelector.exists).ok();
  }

  /** Checks that a table is present with at least 3 rows (within the page). */
  async hasTable(testController) {
    const numRowsCount = Selector('tr').count; // checking for HTML tag (ie. <tr>)
    await testController.expect(numRowsCount).gte(3);
  }
}

export const vendorOrderHistory = new VendorOrderHistory();
