import { Selector } from 'testcafe';

class GenerateQRCodePage {
  constructor() {
    this.pageId = '#generate-qr';
    this.pageSelector = Selector(this.pageId);
  }

  /** Checks that this page is currently displayed. */
  async isDisplayed(testController) {
    await testController.expect(this.pageSelector.exists).ok();
  }

  /** Checks that a QR Code is generated. */
  async hasQR(testController) {
    const hasGenerated = Selector('img').count; // checking for HTML tag (ie. <tr>)
    await testController.expect(hasGenerated).eql(1);
  }
}

export const generateQRCodePage = new GenerateQRCodePage();
