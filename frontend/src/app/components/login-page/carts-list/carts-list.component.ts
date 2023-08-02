import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { Cart } from 'src/app/models/cart.model';
import { User } from 'src/app/models/user.model';
import { CartService } from 'src/app/services/cart.service';
import { UserService } from 'src/app/services/user.service';
import { VisibilityService } from 'src/app/services/visibilities.service';

@Component({
  selector: 'app-carts-list',
  templateUrl: './carts-list.component.html',
  styleUrls: ['./carts-list.component.css'],
})
export class CartsListComponent implements OnInit, OnDestroy {
  carts$: Observable<Cart[]>;
  closedCarts: Cart[] = [];
  openCarts: Cart[] = [];
  clickedCartId: string = '';
  user: User;
  isLoading = true;
  private userSubscription: Subscription;
  private cartServiceSubscription: Subscription;

  constructor(
    private cartService: CartService,
    private visibleService: VisibilityService,
    private userService: UserService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.userSubscription = this.userService.user$.subscribe((user) => {
      this.user = user;
      this.isLoading = false;
    });
    this.carts$ = this.cartService.userCarts$;
    this.cartServiceSubscription = this.cartService.isOrderedCarts$.subscribe(
      (carts) => {
        if (!carts) return;
        this.openCarts = carts.filter((c) => !c.isOrdered);
        this.closedCarts = carts.filter((c) => c.isOrdered);
      }
    );
  }
  async goShopping() {
    if (this.clickedCartId) {
      const closedCart = this.closedCarts.find(
        (c) => c._id === this.clickedCartId
      );
      if (closedCart) {
        this.cartService.createCartFromOrder(closedCart);
      } else {
        this.cartService.chooseCartById(this.clickedCartId);
      }
    } else {
      this.cartService.createCart(this.user._id);
    }
    this.visibleService.closePopup();
    this.router.navigate(['/shopping']);
  }

  choose(cartId: string) {
    this.clickedCartId = cartId;
  }

  ngOnDestroy(): void {
    this.userSubscription.unsubscribe();
    this.cartServiceSubscription.unsubscribe();
  }
}
