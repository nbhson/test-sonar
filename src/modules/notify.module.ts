import { NgModule } from '@angular/core';
import { NotifierModule, NotifierOptions } from 'angular-notifier';

const cshopNotifier: NotifierOptions = {
  theme: 'material',
  position: {
    horizontal: {
      position: 'right',
      distance: 10,
    },
    vertical: {
      position: 'bottom',
      distance: 10,
      gap: 10,
    },
  },
  behaviour: {
    autoHide: 3500,
    onMouseover: 'pauseAutoHide',
    showDismissButton: true,
    stacking: 3,
  },
  animations: {
    enabled: true,
    show: {
      preset: 'slide',
      speed: 250,
      easing: 'ease',
    },
    hide: {
      preset: 'fade',
      speed: 250,
      easing: 'ease',
      offset: 50,
    },
    overlap: 150,
  },
};
@NgModule({
  imports: [NotifierModule.withConfig(cshopNotifier)],
  exports: [NotifierModule],
})
export class NotifyModule {}
