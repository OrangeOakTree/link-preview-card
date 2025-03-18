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
    return "link-preview-card";
  }

  constructor() {
    super();
    this.href = "";
    this.website_title = "";
    this.content_title = "";
    this.embed_descript = "";
    this.embed_img = "";
    this.embed_link = "";
  }

  // Lit reactive properties
  static get properties() {
    return {
      ...super.properties,
      href: { type: String, Reflect },
      embed_website_title: { type: String },
      embed_content_title: { type: String },
      embed_descript: { type: String },
      embed_img: { type: String },
      embed_link: { type: String }
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
        width: 600px;
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
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
      }
      #content-title {
        width: 0;
        min-width: 100%;
        padding: var(--ddd-spacing-3);
        font-size: var(--ddd-font-size-s);
        color: var( --ddd-theme-default-link);
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
      }
      #embed-descript {
        height: 24px;
        display: block;
        font-size: var(--ddd-font-size-4xs);
        margin: var(--ddd-spacing-3);
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
      }
      #embed-img {
        display: block;
        margin: var(--ddd-spacing-3);
        height: auto; 
        width: auto; 
        max-width: 512px;
        border-radius: var(--ddd-radius-sm);
      }
      .loading-spinner {
      display: none;
      border-radius: var(---ddd-radius-sm);
      }
    `];
  }
  
  updated(changedProperties) {
    if (changedProperties.has("href") && this.href) {
      this.fetchData(this.href);
    }
  }
  
  // Data fetching function. This is where our link metadata is fetched and turned into usable data for our card.
  async fetchData(link) {
    this.loadingState = true;
    const url = `https://open-apis.hax.cloud/api/services/website/metadata?q=${link}`;
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`Response Status: ${response.status}`);
      }
      
      const json = await response.json();

      this.embed_website_title = json.data["title"] || "No Title Available";
      this.embed_content_title = json.data["og:title"] || "No Title Available";
      this.embed_descript = json.data["description"] || "No Description Available";
      this.embed_img = json.data["image"] || json.data["logo"] || json.data["og:image"] || "";
      this.embed_link = json.data["url"] || link;
    } catch (error) {
      console.error("Error fetching metadata:", error);
      this.title = "No Preview Available";
      this.embed_descript = "";
      this.embed_img = "";
      this.embed_link = "";
    } finally {
      this.loadingState = false;
    }
  }

  // Lit render the HTML
  render() {
    return html`
    <div id="embed-background">
      <loading-spinner></loading-spinner>
      <h1 class="normalColor"   id="website-title"> ${this.embed_website_title} </h1>
      <a id="content-title"  href= ${this.embed_link} > ${this.embed_content_title} </a>
      <p id="embed-descript" > ${this.embed_descript} </p>
      <div>
      <img id="embed-img" src= ${this.embed_img} alt=""></img>
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