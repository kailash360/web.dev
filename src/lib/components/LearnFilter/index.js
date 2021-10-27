import {html} from 'lit-element';
import {BaseElement} from '../BaseElement';

/**
 * @extends {BaseElement}
 * @final
 */
class LearnFilter extends BaseElement {
  static get properties() {
    return {
      active: {type: String},
      filters: {type: Array},
    };
  }

  constructor() {
    super();
    /** @type {{id?: string, title: string}[]} */
    this.filters = [];
    /** @type {string|undefined} */
    this.active = undefined;
  }

  /**
   * @param {string|undefined} id
   */
  setActive(id) {
    this.active = id;

    const learnCollectionsElement =
      document.getElementById('learn__collections');
    if (!learnCollectionsElement) {
      return;
    }

    for (const child of learnCollectionsElement.children) {
      child.classList.toggle('hidden-yes', id && id !== child.id);
    }
  }

  render() {
    /** @type {(filter: {id?: string, title: string}) => any} */
    const filtersMap = (filter) =>
      html`<button
        class="pill"
        data-state="${this.active === filter.id ? 'active' : 'inactive'}"
        type="button"
        @click="${() => this.setActive(filter.id)}"
      >
        ${filter.title}
      </button>`;

    return html`<div class="cluster">${this.filters.map(filtersMap)}</div>`;
  }
}

customElements.define('web-learn-filter', LearnFilter);
