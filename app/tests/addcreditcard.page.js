import { Selector } from 'testcafe';
import { ComponentIDs, PageIDs } from '../imports/ui/utilities/ids';

class AddCreditCardPage {
  constructor() {
    this.pageId = `#${PageIDs.addPayment}`;
    this.pageSelector = Selector(this.pageId);
  }

  /** Checks that this page is currently displayed. */
  async isDisplayed(testController) {
    await testController.expect(this.pageSelector.exists).ok();
  }

  /** Checks this page is displayed, then adds a new project */
  async addCard(testController) {
    const name = 'John Doe';
    const expiration = `${new Date().getTime()}`;
    const number = '123456789011';
    const cv = '123';
    await this.isDisplayed(testController);

    // Type in information for the card
    await testController.typeText(`#${ComponentIDs.addCardHolderName}`, name);
    await testController.typeText(`#${ComponentIDs.addCardHolderNumber}`, number);
    await testController.typeText(`#${ComponentIDs.addCardExpiration}`, expiration);
    await testController.typeText(`#${ComponentIDs.addCardCV}`, cv);

    await testController.click(`#${ComponentIDs.addPaymentFormSubmit}`);
    // await testController.click(Selector('.swal-button--confirm'));
  }

  /** Checks that there is at least one credit card added.  */
  async hasCreditCard(testController) {
    const cardCount = Selector('Button').count;
    await testController.expect(cardCount).gte(1);
  }
}

export const addCreditCardPage = new AddCreditCardPage();
