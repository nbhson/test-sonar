import { Inject, Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { View, ViewData, ViewError } from '../../../base/interface/view.interface';

@Injectable({
  providedIn: 'root',
})
export abstract class UserAbstractService<VIEW_MODEL> {
  public users!: VIEW_MODEL;
  public view = new BehaviorSubject<View<VIEW_MODEL>>({});

  constructor(@Inject(String) private _model?: VIEW_MODEL) {
    this.users = _model ? _model : <VIEW_MODEL>{};
  }

  abstract getAllUser(): void;

  abstract initObserver(): void;

  protected generateData(): void {
    const data: ViewData<VIEW_MODEL> = {
      data: this.users,
    };
    this.view.next(data);
  }

  protected generateError(error: Error): void {
    const err: ViewError = {
      error: {
        message: error.message,
        name: error.name,
      },
    };

    this.view.next(err);
  }

  protected generateLoading(): void {
    const viewLoader: View<VIEW_MODEL> = {
      loader: true,
    };

    this.view.next(viewLoader);
  }
}
