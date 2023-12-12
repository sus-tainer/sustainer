import { Selector } from 'testcafe';

class ListContainersAdmin {
  constructor() {
    this.pageId = '#list-containers-admin';
    this.pageSelector = Selector(this.pageId);
  }

  /** Checks that this page is currently displayed. */
  async isDisplayed(testController) {
    await testController.expect(this.pageSelector.exists).ok();
  }

  async hasPieChart(testController) {
    const pieChart = Selector('#pie-chart');
    await testController.expect(pieChart.exists).ok();
  }
}

export const listContainersAdmin = new ListContainersAdmin();
