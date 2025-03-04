import { html, fixture, expect } from '@open-wc/testing';
import "../embed-element.js";

describe("EmbedElement test", () => {
  let element;
  beforeEach(async () => {
    element = await fixture(html`
      <embed-element
        title="title"
      ></embed-element>
    `);
  });

  it("basic will it blend", async () => {
    expect(element).to.exist;
  });

  it("passes the a11y audit", async () => {
    await expect(element).shadowDom.to.be.accessible();
  });
});
