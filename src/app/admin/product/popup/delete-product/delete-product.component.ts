import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ServerErrorHelper } from 'src/helpers/server-errors.helper';
import { NotifyService } from 'src/services/notifier.service';
import { Product } from '../../model/product.model';
import { ProductService } from '../../service/product.service';

@Component({
  selector: 'app-delete-product',
  templateUrl: './delete-product.component.html',
  styleUrls: ['./delete-product.component.scss'],
})
export class DeleteProductComponent implements OnInit {
  form: FormGroup;
  errMsg: string;
  loading: boolean = false;

  constructor(
    private _notifyService: NotifyService,
    private _productService: ProductService,
    private _dialogRef: MatDialogRef<DeleteProductComponent>,
    @Inject(MAT_DIALOG_DATA) public product: Product,
  ) {}

  ngOnInit() {}

  submit() {
    this.loading = true;
    this.errMsg = '';
    this._productService.delete(this.product._id).subscribe(
      (result) => {
        this.loading = false;
        this.errMsg = '';
        this._notifyService.success('Xóa sản phẩm thành công!');
        this.close(result.message);
      },
      (error) => {
        this.loading = false;
        this.errMsg = ServerErrorHelper.getErrorMsg(error);
      },
    );
  }

  close(result: string) {
    this._dialogRef.close(result);
  }

  get f() {
    return this.form.controls;
  }
}
