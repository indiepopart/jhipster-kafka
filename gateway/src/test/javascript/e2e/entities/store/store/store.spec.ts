import { browser, ExpectedConditions as ec, protractor, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../../page-objects/jhi-page-objects';

import { StoreComponentsPage, StoreDeleteDialog, StoreUpdatePage } from './store.page-object';

const expect = chai.expect;

describe('Store e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let storeComponentsPage: StoreComponentsPage;
  let storeUpdatePage: StoreUpdatePage;
  let storeDeleteDialog: StoreDeleteDialog;

  before(async () => {
    await browser.get('/');
    navBarPage = new NavBarPage();
    signInPage = await navBarPage.getSignInPage();
    await signInPage.loginWithOAuth('admin', 'admin');
    await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
  });

  it('should load Stores', async () => {
    await navBarPage.goToEntity('store');
    storeComponentsPage = new StoreComponentsPage();
    await browser.wait(ec.visibilityOf(storeComponentsPage.title), 5000);
    expect(await storeComponentsPage.getTitle()).to.eq('gatewayApp.storeStore.home.title');
  });

  it('should load create Store page', async () => {
    await storeComponentsPage.clickOnCreateButton();
    storeUpdatePage = new StoreUpdatePage();
    expect(await storeUpdatePage.getPageTitle()).to.eq('gatewayApp.storeStore.home.createOrEditLabel');
    await storeUpdatePage.cancel();
  });

  it('should create and save Stores', async () => {
    const nbButtonsBeforeCreate = await storeComponentsPage.countDeleteButtons();

    await storeComponentsPage.clickOnCreateButton();
    await promise.all([
      storeUpdatePage.setNameInput('name'),
      storeUpdatePage.setAddressInput('address'),
      storeUpdatePage.statusSelectLastOption(),
      storeUpdatePage.setCreateTimestampInput('01/01/2001' + protractor.Key.TAB + '02:30AM'),
      storeUpdatePage.setUpdateTimestampInput('01/01/2001' + protractor.Key.TAB + '02:30AM')
    ]);
    expect(await storeUpdatePage.getNameInput()).to.eq('name', 'Expected Name value to be equals to name');
    expect(await storeUpdatePage.getAddressInput()).to.eq('address', 'Expected Address value to be equals to address');
    expect(await storeUpdatePage.getCreateTimestampInput()).to.contain(
      '2001-01-01T02:30',
      'Expected createTimestamp value to be equals to 2000-12-31'
    );
    expect(await storeUpdatePage.getUpdateTimestampInput()).to.contain(
      '2001-01-01T02:30',
      'Expected updateTimestamp value to be equals to 2000-12-31'
    );
    await storeUpdatePage.save();
    expect(await storeUpdatePage.getSaveButton().isPresent(), 'Expected save button disappear').to.be.false;

    expect(await storeComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1, 'Expected one more entry in the table');
  });

  it('should delete last Store', async () => {
    const nbButtonsBeforeDelete = await storeComponentsPage.countDeleteButtons();
    await storeComponentsPage.clickOnLastDeleteButton();

    storeDeleteDialog = new StoreDeleteDialog();
    expect(await storeDeleteDialog.getDialogTitle()).to.eq('gatewayApp.storeStore.delete.question');
    await storeDeleteDialog.clickOnConfirmButton();

    expect(await storeComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
