import { Selector } from 'testcafe';

class AdminContainerScanPage {
  constructor() {
    this.pageId = '#admin-container-scan';
    this.pageSelector = Selector(this.pageId);
  }

  async isDisplayed(testController) {
    await testController.expect(this.pageSelector.exists).ok();
  }
}

export const adminContainerScanPage = new AdminContainerScanPage();
