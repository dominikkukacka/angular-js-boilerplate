describe('Doc Demo App', function() {
  it('should have a title', function() {
    browser.get('/');

    expect(browser.getTitle()).toEqual('DOC');
  });
});
