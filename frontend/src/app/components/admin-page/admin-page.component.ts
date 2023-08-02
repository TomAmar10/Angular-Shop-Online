import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subscription, of } from 'rxjs';
import { Cart } from 'src/app/models/cart.model';
import { Order } from 'src/app/models/order.model';
import { User } from 'src/app/models/user.model';
import { CartService } from 'src/app/services/cart.service';
import { OrderService } from 'src/app/services/order.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-admin-page',
  templateUrl: './admin-page.component.html',
  styleUrls: ['./admin-page.component.css'],
})
export class AdminPageComponent implements OnInit, OnDestroy {
  $users: Observable<User[]>;
  carts: Cart[] | any = [];
  orders: Order[] | any = [];
  private cartsSubscription: Subscription;
  private ordersSubscription: Subscription;

  constructor(
    private userService: UserService,
    private cartService: CartService,
    private orderService: OrderService
  ) {}

  ngOnInit(): void {
    this.$users = this.userService.users$;
    this.cartsSubscription = this.cartService
      .getAllCarts()
      .subscribe((res) => (this.carts = res));
    this.ordersSubscription = this.orderService
      .getAllOrders()
      .subscribe((res) => (this.orders = res));
  }

  ngOnDestroy(): void {
    this.cartsSubscription.unsubscribe();
    this.ordersSubscription.unsubscribe();
  }
}
