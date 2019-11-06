import { element, by, ElementFinder } from 'protractor';

export class StoreAlertComponentsPage {
  createButton = element(by.id('jh-create-entity'));
  deleteButtons = element.all(by.css('jhi-store-alert div table .btn-danger'));
  title = element.all(by.css('jhi-store-alert div h2#page-heading span')).first();

  async clickOnCreateButton(timeout?: number) {
    await this.createButton.click();
  }

  async clickOnLastDeleteButton(timeout?: number) {
    await this.deleteButtons.last().click();
  }

  async countDeleteButtons() {
    return this.deleteButtons.count();
  }

  async getTitle() {
    return this.title.getAttribute('jhiTranslate');
  }
}

export class StoreAlertUpdatePage {
  pageTitle = element(by.id('jhi-store-alert-heading'));
  saveButton = element(by.id('save-entity'));
  cancelButton = element(by.id('cancel-save'));
  storeNameInput = element(by.id('field_storeName'));
  storeStatusInput = element(by.id('field_storeStatus'));
  timestampInput = element(by.id('field_timestamp'));

  async getPageTitle() {
    return this.pageTitle.getAttribute('jhiTranslate');
  }

  async setStoreNameInput(storeName) {
    await this.storeNameInput.sendKeys(storeName);
  }

  async getStoreNameInput() {
    return await this.storeNameInput.getAttribute('value');
  }

  async setStoreStatusInput(storeStatus) {
    await this.storeStatusInput.sendKeys(storeStatus);
  }

  async getStoreStatusInput() {
    return await this.storeStatusInput.getAttribute('value');
  }

  async setTimestampInput(timestamp) {
    await this.timestampInput.sendKeys(timestamp);
  }

  async getTimestampInput() {
    return await this.timestampInput.getAttribute('value');
  }

  async save(timeout?: number) {
    await this.saveButton.click();
  }

  async cancel(timeout?: number) {
    await this.cancelButton.click();
  }

  getSaveButton(): ElementFinder {
    return this.saveButton;
  }
}

export class StoreAlertDeleteDialog {
  private dialogTitle = element(by.id('jhi-delete-storeAlert-heading'));
  private confirmButton = element(by.id('jhi-confirm-delete-storeAlert'));

  async getDialogTitle() {
    return this.dialogTitle.getAttribute('jhiTranslate');
  }

  async clickOnConfirmButton(timeout?: number) {
    await this.confirmButton.click();
  }
}
