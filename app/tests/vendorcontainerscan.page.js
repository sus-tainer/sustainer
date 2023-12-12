import { Selector } from 'testcafe';

class VendorContainerScanPage {
  constructor() {
    this.pageId = '#vendor-scan-page';
    this.pageSelector = Selector(this.pageId);
  }

  async isDisplayed(testController) {
    await testController.expect(this.pageSelector.exists).ok();
  }
}

export const vendorContainerScanPage = new VendorContainerScanPage();
