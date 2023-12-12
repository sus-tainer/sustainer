import { Selector } from 'testcafe';

class AddContainer {
  constructor() {
    this.pageId = '#add-container';
    this.pageSelector = Selector(this.pageId);
  }

  /** Checks that this page is currently displayed. */
  async isDisplayed(testController) {
    await testController.expect(this.pageSelector.exists).ok();
  }

  async addContainer(testController) {
    // Select an option from the dropdown
    const dropdown = Selector('#container-dropdown');
    const optionValue = 'small'; // Replace with the actual value of the option you want to select
    await testController.click(dropdown).click(dropdown.find('option').withAttribute('value', optionValue));

    // Click the button to add the container
    await testController.click('#container-add');
  }
}

export const addContainer = new AddContainer();
