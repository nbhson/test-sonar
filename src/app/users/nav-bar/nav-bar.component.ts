import { Component, ComponentFactoryResolver, ComponentRef, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { AuthService } from 'src/app/auth/services/auth.service';
import { AuthLinkComponent } from '../components/auth-link/auth-link.component';
import { UserCartComponent } from '../components/user-cart/user-cart.component';
import { HomeService } from '../services/home.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss'],
})
export class NavBarComponent implements OnInit {
  @ViewChild('container', {
    read: ViewContainerRef,
    static: true,
  })
  container: ViewContainerRef;
  componentRef: ComponentRef<any>;

  constructor(private _authService: AuthService, private _homeService: HomeService) {}

  ngOnInit(): void {
    this.renderComponent();
    this.subscribe();
  }

  renderComponent() {
    const container = this.container;
    container.clear();
    const injector = container.injector;

    const cfr: ComponentFactoryResolver = injector.get(ComponentFactoryResolver);
    let componentRef;
    if (this._authService.isLogged) {
      let componentFactory = cfr.resolveComponentFactory(UserCartComponent);
      componentRef = container.createComponent(componentFactory, 0, injector);
    } else {
      let componentFactory = cfr.resolveComponentFactory(AuthLinkComponent);
      componentRef = container.createComponent(componentFactory, 0, injector);
    }
    // fix err ExpressionChangedAfterItHasBeenCheckedError
    componentRef.changeDetectorRef.detectChanges();
    this.componentRef = componentRef;
  }

  subscribe() {
    this._homeService.logout$.subscribe(
      () => {
        this.componentRef.destroy();
        this.renderComponent();
      },
      (error) => {
        // ignore
      },
    );
  }
}
