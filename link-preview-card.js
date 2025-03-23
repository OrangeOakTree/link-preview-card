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
  };

  constructor() {
    super();
    this.href = "";
    this.website_title = "";
    this.content_title = "";
    this.embed_descript = "";
    this.embed_img = "";
    this.embed_link = "";
    this.loading_state = false;
    this.theme_color = "";
    document.documentElement.style.setProperty('--ddd-primary-x', `var(--ddd-primary-${Math.floor(Math.random() * 26)})`);
  };

  // Lit reactive properties
  static get properties() {
    return {
      ...super.properties,
      href: { type: String, Reflect },
      embed_website_title: { type: String },
      embed_content_title: { type: String },
      embed_descript: { type: String },
      embed_img: { type: String },
      embed_link: { type: String },
      loading_state: { type: Boolean },
      theme_color: { type: String, reflect: true }
    };
  }
  
  // Lit scoped styles
  static get styles() {
    return [super.styles,
    css`
      :host() {
        margin-top: var(--ddd-spacing-0);
        margin-bottom: var(--ddd-spacing-0);
        color: var(--ddd-theme-primary);
        background-color: var(--ddd-theme-accent);
      }
    
      #embed-background {
        display: inline-block;
        width: 600px;
        border-radius: var(--ddd-radius-sm);
        background-color: var(--theme-color);
        
      }
      // FIX THIS HOVER STUFF PLS
      #embed-background:hover {
      box-shadow: var(--ddd-shadow-lg);
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
        width: 568px;
        display: block;
        padding: var(--ddd-spacing-3);
        font-size: var(--ddd-font-size-s);
        color: var( --ddd-theme-default-link);
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
      }
      #embed-descript {
        height: 24px;
        width: 568px;
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
        max-width: 568px;
        border-radius: var(--ddd-radius-sm);
      }
      .loading-spinner {
        display: block;
        border: 16px solid #f3f3f3; 
        border-top: 16px solid #3498db; 
        width: 120px;
        height: 120px;
        animation: spin 2s linear infinite;
        border-radius: var(--ddd-radius-circle);
        margin: var(--ddd-spacing-3);
      }
      .card.psu_color {
        color: var(--ddd-primary-2);
      }
      .card.rando_color {
        color: var(--ddd-primary-x);
      }
      .card.error_color {
        color: var(--ddd-error);
      }
      @keyframes spin {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
      }
    `];
  }

  updated(changedProperties) {
    if (changedProperties.has("href") && this.href) {
      this.fetchData(this.href);
      
    }
    if(this.embed_link.toLowerCase().includes("psu.edu")) {
      this.shadowRoot.querySelector(".card").classList.remove("rando_color");
      this.shadowRoot.querySelector(".card").classList.add("psu_color");
    }
    else {
      this.shadowRoot.querySelector(".card").classList.remove("psu_color");
      this.shadowRoot.querySelector(".card").classList.add("rando_color");
    }
    this.shadowRoot.querySelector(".card").classList.add("match_color");

  }
  // Debounce function to allow loading spinner to appear.
  debounce(func, delay) {
    let timeoutId;
    return function (...args) {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        func.apply(this, args);
      }, delay);
    };
  }
  // Data fetching function. This is where our link metadata is fetched and turned into usable data for our embed
  async fetchData(link) {
    this.loading_state = true;
    const url = `https://open-apis.hax.cloud/api/services/website/metadata?q=${link}`;
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`Response Status: ${response.status}`);
      }
      
      const json = await response.json();

      if (json.data["og:site_name"]) {
        this.embed_website_title = json.data["og:site_name"];
      }
      else if (json.data["alternateName"]){
        this.embed_website_title = json.data["alternateName"];
      }
      else if (json.data["twitter:title"]){
        this.embed_website_title = json.data["twitter:title"];
      }
      else if (json.data["title"]) {
        this.embed_website_title = json.data["title"];
      }
      else {
        this.embed_website_title = "No website title available";
      }
      if (json.data["og:title"]) {
        this.embed_content_title = json.data["og:title"];
      }
      else if (json.data["title"]) {
        this.embed_website_title = json.data["title"];
      }
      else{
        this.embed_content_title = "No Content Title Available";
      }
      this.embed_descript = json.data["description"] || "No Description Available";
      this.embed_img = json.data["image"] || json.data["logo"] || json.data["og:image"] || "";
      this.embed_link = json.data["url"] || link;
      this.style.setProperty('--theme-color', this.theme_color || 'var(--ddd-theme-default-limestoneMaxLight)');
    } catch (error) {
      console.error("Error fetching metadata:", error);
      this.title = "No Preview Available";
      this.embed_descript = "";
      this.embed_img = "";
      this.embed_link = "";
    } finally {
      this.loading_state = false;
    }
  }

// Lit render the HTML
render() {
  if (this.loading_state) {
    this.debounce(this.render, 1000);
    return html`
    <div class="loading-spinner" id="spinner"></div>
    `;
  }
  else {
    return html`
    <div id="embed-background" class="card">
        <h1 class="card"   id="website-title"> ${this.embed_website_title} </h1>
        <a id="content-title"  href= ${this.embed_link} > ${this.embed_content_title} </a>
        <p class="card" id="embed-descript" > ${this.embed_descript} </p>
        <div>
        <img id="embed-img" src= ${this.embed_img} alt=""></img>
      </div>
    </div>
    `;
  }
  
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