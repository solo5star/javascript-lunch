import restaurants from '../../../states/restaurants';
import Component from '../../Component';
import { define } from '../../decorators';
import style from './index.css';

@define('r-restaurant-list-item')
class RestaurantListItem extends Component {
  override getCSSStyleSheets() {
    return [...super.getCSSStyleSheets(), style];
  }

  private onClickFavorite(event: Event) {
    event.stopPropagation();

    const restaurantId = this.getAttribute('restaurant-id');
    if (!restaurantId) return;

    const restaurant = restaurants.getRestaurant(restaurantId);
    if (!restaurant) return;

    restaurants.toggleFavorite(restaurant);
  }

  override renderTemplate() {
    return `
      <section>
        <r-category-icon category="${this.getAttribute('category')}"></r-category-icon>

        <header>
          <h3 class="text-subtitle">
            ${this.getAttribute('name') ?? ''}
          </h3>
          <span class="distance text-body">
            캠퍼스부터 ${this.getAttribute('distance' ?? '')}분 내
          </span>
        </header>

        <r-button
          id="favorite"
          variant="transparent"
        >
          <r-favorite-icon ${this.hasAttribute('favorite') ? 'active' : ''}></r-favorite-icon>
        </r-button>

        <p class="description text-body">${this.getAttribute('description') ?? ''}</p>
      </section>
    `;
  }

  override render() {
    super.render();

    this.shadowRoot!.querySelector('#favorite')?.addEventListener('click', (event) =>
      this.onClickFavorite(event),
    );
  }
}

export default RestaurantListItem;
