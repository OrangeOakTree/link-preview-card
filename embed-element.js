/**
 * Copyright 2025 OrangeOakTree
 * @license Apache-2.0, see LICENSE for full text.
 */
import { LitElement, html, css } from "lit";
import { DDDSuper } from "@haxtheweb/d-d-d/d-d-d.js";
import { I18NMixin } from "@haxtheweb/i18n-manager/lib/I18NMixin.js";
/**
 * `embed-element`
 * 
 * @demo index.html
 * @element embed-element
 */
export class EmbedElement extends DDDSuper(I18NMixin(LitElement)) {

  static get tag() {
    return "embed-element";
  }

  constructor() {
    super();
    
  }

  // Lit reactive properties
  static get properties() {
    return {
      ...super.properties,
      
    };
  }
  
  // Lit scoped styles
  static get styles() {
    return [super.styles,
    css`
      :host {
        margin-top: var(--ddd-spacing-0);
        margin-bottom: var(--ddd-spacing-0);
      }
      #embed-background {
        display: inline-block;
        background-color: var(--ddd-theme-default-limestoneLight);
        border-radius: var(--ddd-radius-sm);

      }
      #website-title {
        width: 0;
        min-width: 100%;
        margin-top: var(--ddd-spacing-3);
        margin-bottom: var(--ddd-spacing-0);
        font-size: var(--ddd-font-size-2xs);
        padding: var(--ddd-spacing-3);
      }
      #content-title {
        width: 0;
        min-width: 100%;
        padding: var(--ddd-spacing-3);
        font-size: var(--ddd-font-size-s);
        color: var( --ddd-theme-default-link);
      }
      #embed-descript {
        height: 39px;
        width: ;
        display: flex;
        font-size: var(--ddd-font-size-4xs);
        margin: var(--ddd-spacing-3);
      }
      #embed-img {
        display: block;
        margin: var(--ddd-spacing-3);
        height: auto; 
        width: auto; 
        max-width: 512px;
        max-height: 512px;
      }
    `];
  }

  // Lit render the HTML
  render() {
    return html`
    <div id="embed-background">
      <h1 id="website-title">The Title</h1>
      <a id="content-title">Content Title</a>
      <p id="embed-descript">Description of the site that should end like this if to long like this text should be for instance bla bla bla.</p>
      <div>
      <img id="embed-img" src="https://freesvg.org/img/Placeholder.png"></img>
      </div>
    </div>
    `;
  }

  /**
   * haxProperties integration via file reference
   */
  static get haxProperties() {
    return new URL(`./lib/${this.tag}.haxProperties.json`, import.meta.url)
      .href;
  }
}

globalThis.customElements.define(EmbedElement.tag, EmbedElement);