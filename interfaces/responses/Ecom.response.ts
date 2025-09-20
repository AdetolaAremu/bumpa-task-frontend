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
