export class Routes {
  static home = "/";
  static about = "/about";
  static store = "/store";
  static sales = "/sales";
  static cart = "/cart";
  static checkout = "/checkout";
  static dashboard = "/dashboard";
  static orders = "/dashboard/orders";

  // Dynamic routes using methods
  static product(slug: string): string {
    return `/products/${slug}`;
  }

  static category(slug: string): string {
    return `/categories/${slug}`;
  }

  static userProfile(userId: string): string {
    return `/users/${userId}`;
  }
}
