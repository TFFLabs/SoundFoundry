import { SoundFoundryPage } from './app.po';

describe('sound-foundry App', () => {
  let page: SoundFoundryPage;

  beforeEach(() => {
    page = new SoundFoundryPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!!');
  });
});
