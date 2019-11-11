const Virtual = require("../dist/virtual");

test("Site is defined", () => {
    expect(Virtual.Site).toBeTruthy();
});

const site = new Virtual.Site();
test("Environment creation", () => {
    expect(
        site.createEnvironment(($) => {})
    ).toBeTruthy();
});

test("Environment destruction", () => {
    expect(site.destroy()).toBeTruthy();
});