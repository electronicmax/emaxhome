import { Home2.0Page } from './app.po';

describe('home2.0 App', () => {
  let page: Home2.0Page;

  beforeEach(() => {
    page = new Home2.0Page();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!!');
  });
});
