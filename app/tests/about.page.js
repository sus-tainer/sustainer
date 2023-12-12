import { Selector } from 'testcafe';

class AboutPage {
  constructor() {
    this.pageId = '#about-page';
    this.pageSelector = Selector(this.pageId);
  }

  /** Asserts that this page is currently displayed. */
  async isDisplayed(testController) {
    await testController.expect(this.pageSelector.exists).ok();
  }
}

export const aboutPage = new AboutPage();
