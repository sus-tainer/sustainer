import { Selector } from 'testcafe';

class InventoryContainersVendor {
  constructor() {
    this.pageId = '#vendor-inventory-page';
    this.pageSelector = Selector(this.pageId);
  }

  /** Checks that this page is currently displayed. */
  async isDisplayed(testController) {
    await testController.expect(this.pageSelector.exists).ok();
  }

  /** Checks that a table is present with 3 column entries (within the page). */
  async hasTable(testController) {
    const numRowsCount = Selector('tr').count; // checking for HTML tag (ie. <tr>)
    await testController.expect(numRowsCount).gte(1);
  }
}

export const inventoryContainersVendor = new InventoryContainersVendor();
