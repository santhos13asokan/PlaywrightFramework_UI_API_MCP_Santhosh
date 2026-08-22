import { UIUtil } from '../utils/ui.utils';
import { WaitsUtil } from '../utils/waits.utils';
import { AuthPage } from './auth.page';
import { CartPage } from './cart.page';
import { ContactPage } from './contact.page';
import { HomePage } from './home.page';
import { LoginPage } from './login.page';
import { ProductPage } from './product.page';

export class POManager {
  readonly loginPage: LoginPage;
  readonly homePage: HomePage;
  readonly productPage: ProductPage;
  readonly authPage: AuthPage;
  readonly contactPage: ContactPage;
  readonly cartPage: CartPage;

  constructor(uiUtil: UIUtil, waitsUtil: WaitsUtil) {
    this.loginPage = new LoginPage(uiUtil, waitsUtil);
    this.homePage = new HomePage(uiUtil, waitsUtil);
    this.productPage = new ProductPage(uiUtil, waitsUtil);
    this.authPage = new AuthPage(uiUtil, waitsUtil);
    this.contactPage = new ContactPage(uiUtil, waitsUtil);
    this.cartPage = new CartPage(uiUtil, waitsUtil);
  }

  getLoginPage(): LoginPage {
    return this.loginPage;
  }

  getHomePage(): HomePage {
    return this.homePage;
  }

  getProductPage(): ProductPage {
    return this.productPage;
  }

  getAuthPage(): AuthPage {
    return this.authPage;
  }

  getContactPage(): ContactPage {
    return this.contactPage;
  }

  getCartPage(): CartPage {
    return this.cartPage;
  }
}