import Validation from './Validation';

export type RestaurantProps = {
  id: number;
  category: RestaurantCategory;
  name: string;
  distance: RestaurantDistance;
  description?: string | null;
  referenceUrl?: string | null;
};

export type RestaurantCategory = (typeof Restaurant.CATEGORIES)[number];

export type RestaurantDistance = (typeof Restaurant.DISTANCES)[number];

class Restaurant {
  static MIN_LENGTH = 1 as const;

  static MAX_LENGTH = 20 as const;

  static CATEGORIES = ['한식', '중식', '일식', '양식', '아시안', '기타'] as const;

  static DISTANCES = [5, 10, 15, 20, 30] as const;

  private readonly id: number;

  private readonly category: RestaurantCategory;

  private readonly name: string;

  private readonly distance: RestaurantDistance;

  private readonly description: string | null;

  private readonly referenceUrl: string | null;

  private favorite = false;

  constructor({ id, category, name, distance, description, referenceUrl }: RestaurantProps) {
    Restaurant.validateCategory(category);
    Restaurant.validateName(name);
    Restaurant.validateDistance(distance);

    this.id = id;
    this.category = category;
    this.name = name;
    this.distance = distance;
    this.description = description ?? null;
    this.referenceUrl = referenceUrl ?? null;
  }

  getId() {
    return this.id;
  }

  getName() {
    return this.name;
  }

  getDistance() {
    return this.distance;
  }

  getDescription() {
    return this.description;
  }

  getCategory() {
    return this.category;
  }

  getReferenceUrl() {
    return this.referenceUrl;
  }

  isFavorite() {
    return this.favorite;
  }

  setFavorite(favorite = true) {
    this.favorite = favorite;
  }

  static validateCategory(category: string): asserts category is RestaurantCategory {
    if (Restaurant.CATEGORIES.every((_category) => _category !== category)) {
      throw new Error(`카테고리는 ${Restaurant.CATEGORIES.join(', ')} 중 하나여야 합니다.`);
    }
  }

  static validateName(name: string) {
    Validation.validateRestaurantNameLength(name);
  }

  static validateDistance(distance: number): asserts distance is RestaurantDistance {
    if (Restaurant.DISTANCES.every((_distance) => _distance !== distance)) {
      throw new Error(`거리는 ${Restaurant.DISTANCES.join('분, ')}분 중 하나여야 합니다.`);
    }
  }
}

export default Restaurant;
