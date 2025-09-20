export interface IAllProducts {
  success: boolean;
  message: string;
  data: {
    current_page: number;
    data: {
      id: number;
      title: string;
      quantity: number;
      description: string;
      sku: string;
      slug: string;
      price: string;
      image_url: string;
      is_active: number;
      created_at: string;
      updated_at: string;
      category_product: {
        id: number;
        product_id: number;
        product_category_id: number;
        created_at: string | null;
        updated_at: string | null;
        category: {
          id: number;
          name: string;
          is_visible: number;
          created_at: string | null;
          updated_at: string | null;
        }[];
      }[];
    }[];
    first_page_url: string;
    from: number;
    last_page: number;
    last_page_url: string;
    next_page_url: string | null;
    path: string;
    per_page: number;
    prev_page_url: string | null;
    to: number;
    total: number;
  };
}

export interface IGetAProduct {
  success: boolean;
  message: string;
  data: {
    id: number;
    title: string;
    quantity: number;
    description: string;
    sku: string;
    slug: string;
    price: string;
    image_url: string;
    is_active: number;
    created_at: string;
    updated_at: string;
    category_product: {
      id: number;
      product_id: number;
      product_category_id: number;
      created_at: string | null;
      updated_at: string | null;
      category: {
        id: number;
        name: string;
        is_visible: number;
        created_at: string | null;
        updated_at: string | null;
      }[];
    }[];
  };
}

export interface IGetUserCart {
  success: boolean;
  message: string;
  data: {
    id: number;
    user_id: number;
    created_at: string;
    updated_at: string;
    items: {
      id: number;
      cart_id: number;
      product_id: number;
      user_id: number;
      title: string;
      price: string | number;
      quantity: number;
      image: string;
      created_at: string;
      updated_at: string;
    }[];
  };
}

export interface ILoginUser {
  success: boolean;
  message: string;
  data: {
    token: string;
  };
}

export interface IUserStats {
  success: boolean;
  message: string;
  data: {
    total_products: string;
    total_spent: string;
    successful_orders: string;
    achievements: string;
  };
}

export interface IOrder {}

// Single order item (inside an order)
export interface IOrderItem {
  id: number;
  order_id: number;
  product_id: number;
  quantity: number;
  price: string;
  title: string;
  image: string;
  created_at: string;
  updated_at: string;
}

// Single order
export interface IOrder {
  id: number;
  order_code: string;
  user_id: number;
  total_amount: string;
  payment_status: "paid" | "not_paid" | "failed" | string;
  order_status: "pending" | "successful" | "canceled" | string;
  transaction_type: string;
  payment_reference: string;
  cashback_unlocked: number;
  created_at: string;
  updated_at: string;
  items: IOrderItem[];
}

// Orders API response
export interface IOrdersResponse {
  success: boolean;
  message: string;
  data: {
    current_page: number;
    data: IOrder[];
  };
}

interface IBadge {
  id: number;
  name: string;
  required_achievements: number;
  is_active: number;
}

interface IAchievement {
  id: number;
  name: string;
  condition_type: string;
  condition_value: string;
  is_active: number;
}

export interface IAllAcheivements {
  success: boolean;
  message: string;
  data: IAchievement[];
}

export interface IAllBadges {
  success: boolean;
  message: string;
  data: IBadge[];
}

export interface IUserAchievement {
  success: boolean;
  message: string;
  data: {
    id: number;
    user_id: number;
    achievement_id: number;
    achievements: IAchievement;
  };
}

export interface IUserBadge {
  success: boolean;
  message: string;
  data: {
    id: number;
    user_id: number;
    badge_id: number;
    badges: IAllBadges;
  };
}

export interface IUserBadgeAchievementsResponse {
  success: boolean;
  message: string;
  data: {
    unlocked_achievements: string[];
    next_available_achievements: string[];
    current_badge: string | null;
    next_badge: string | null;
    remaining_to_unlock_next_badge: number;
  };
}
