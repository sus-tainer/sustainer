import { Selector } from 'testcafe';

class AddVendorOrderPage {
  constructor() {
    this.pageId = '#add-vendor-order-page';
    this.pageSelector = Selector(this.pageId);
  }

  async isDisplayed(testController) {
    await testController.expect(this.pageSelector.exists).ok();
  }

  async addOrder(testController) {
    const firstName = 'John';
    const lastName = 'Doe';
    const event = 'Onizuka Day of Exploration';
    const location = '777 Ward Ave, Honolulu, HI, 96814';
    const containers = '250';
    const size = 'small';
    const schedule = '2024-03-10';

    await testController.typeText('#first-name', firstName);
    await testController.typeText('#last-name', lastName);
    await testController.typeText('#event', event);
    await testController.typeText('#location', location);
    await testController.typeText('#containers', containers);
    await testController.typeText('#size', size);
    await testController.typeText('#schedule', schedule);

    await this.isDisplayed(testController);

    await testController.click('#submit-vendor-order');

  }

}

export const addVendorOrderPage = new AddVendorOrderPage();
