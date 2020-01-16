import { browser, ExpectedConditions as ec, protractor, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../../page-objects/jhi-page-objects';

import { StoreAlertComponentsPage, StoreAlertDeleteDialog, StoreAlertUpdatePage } from './store-alert.page-object';

const expect = chai.expect;

describe('StoreAlert e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let storeAlertComponentsPage: StoreAlertComponentsPage;
  let storeAlertUpdatePage: StoreAlertUpdatePage;
  let storeAlertDeleteDialog: StoreAlertDeleteDialog;

  before(async () => {
    await browser.get('/');
    navBarPage = new NavBarPage();
    signInPage = await navBarPage.getSignInPage();
    await signInPage.loginWithOAuth('admin', 'admin');
    await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
  });

  it('should load StoreAlerts', async () => {
    await navBarPage.goToEntity('store-alert');
    storeAlertComponentsPage = new StoreAlertComponentsPage();
    await browser.wait(ec.visibilityOf(storeAlertComponentsPage.title), 5000);
    expect(await storeAlertComponentsPage.getTitle()).to.eq('gatewayApp.alertStoreAlert.home.title');
  });

  it('should load create StoreAlert page', async () => {
    await storeAlertComponentsPage.clickOnCreateButton();
    storeAlertUpdatePage = new StoreAlertUpdatePage();
    expect(await storeAlertUpdatePage.getPageTitle()).to.eq('gatewayApp.alertStoreAlert.home.createOrEditLabel');
    await storeAlertUpdatePage.cancel();
  });

  it('should create and save StoreAlerts', async () => {
    const nbButtonsBeforeCreate = await storeAlertComponentsPage.countDeleteButtons();

    await storeAlertComponentsPage.clickOnCreateButton();
    await promise.all([
      storeAlertUpdatePage.setStoreNameInput('storeName'),
      storeAlertUpdatePage.setStoreStatusInput('storeStatus'),
      storeAlertUpdatePage.setTimestampInput('01/01/2001' + protractor.Key.TAB + '02:30AM')
    ]);
    expect(await storeAlertUpdatePage.getStoreNameInput()).to.eq('storeName', 'Expected StoreName value to be equals to storeName');
    expect(await storeAlertUpdatePage.getStoreStatusInput()).to.eq('storeStatus', 'Expected StoreStatus value to be equals to storeStatus');
    expect(await storeAlertUpdatePage.getTimestampInput()).to.contain(
      '2001-01-01T02:30',
      'Expected timestamp value to be equals to 2000-12-31'
    );
    await storeAlertUpdatePage.save();
    expect(await storeAlertUpdatePage.getSaveButton().isPresent(), 'Expected save button disappear').to.be.false;

    expect(await storeAlertComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1, 'Expected one more entry in the table');
  });

  it('should delete last StoreAlert', async () => {
    const nbButtonsBeforeDelete = await storeAlertComponentsPage.countDeleteButtons();
    await storeAlertComponentsPage.clickOnLastDeleteButton();

    storeAlertDeleteDialog = new StoreAlertDeleteDialog();
    expect(await storeAlertDeleteDialog.getDialogTitle()).to.eq('gatewayApp.alertStoreAlert.delete.question');
    await storeAlertDeleteDialog.clickOnConfirmButton();

    expect(await storeAlertComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
