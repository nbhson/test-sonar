import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ServerErrorHelper } from 'src/helpers/server-errors.helper';
import { UtilHelper } from 'src/helpers/util.helper';
import { NotifyService } from 'src/services/notifier.service';
import { Product } from '../../model/product.model';
import { ProductService } from '../../service/product.service';

@Component({
  selector: 'app-update-product',
  templateUrl: './update-product.component.html',
  styleUrls: ['./update-product.component.scss'],
})
export class UpdateProductComponent implements OnInit {
  form: FormGroup;
  errMsg: string;
  loading: boolean = false;

  constructor(
    private _formBuilder: FormBuilder,
    private _notifyService: NotifyService,
    private _productService: ProductService,
    private _dialogRef: MatDialogRef<UpdateProductComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) {}

  ngOnInit() {
    this.initForm();
  }

  initForm() {
    this.form = this._formBuilder.group({
      name: [this.data.product.name, Validators.compose([Validators.required, Validators.minLength(5)])],
      price: [this.data.product.price, Validators.compose([Validators.required])],
      description: [this.data.product.description, Validators.compose([Validators.required])],
      categoryId: [this.data.product.categoryId, Validators.compose([Validators.required])],
      image: [this.data.product.image],
    });
  }

  onFileSelected() {
    const inputNode: any = document.querySelector('#file');
    this.getBase64(inputNode.files[0], this.data.product, this._notifyService);
  }

  getBase64(file: File, product: Product, notifyService: NotifyService) {
    var reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = function (result) {
      product.image = <string>reader.result;
    };
    reader.onerror = function (error) {
      notifyService.error('Có lỗi khi chọn ảnh, vui lòng thử lại!');
    };
  }

  submit() {
    this.loading = true;
    this.errMsg = '';
    this.handleData();
    if (this.form.invalid) {
      this.loading = false;
      this.errMsg = '';
      return;
    }
    this._productService.update(this.data.product).subscribe(
      (product) => {
        this.loading = false;
        this.errMsg = '';
        this._notifyService.success('Sửa sản phẩm thành công!');
        this.close(product);
      },
      (error) => {
        this.loading = false;
        this.errMsg = ServerErrorHelper.getErrorMsg(error);
      },
    );
  }

  handleData() {
    this.data.product.name = this.data.product.name.trim();
    this.data.product.description = this.data.product.description.trim();

    if (UtilHelper.isEmptyString(this.data.product.name)) {
      this.f['name'].setErrors({ required: true });
    }

    if (UtilHelper.isEmptyString(this.data.product.description)) {
      this.f['description'].setErrors({ required: true });
    }
  }

  close(product: Product) {
    if (product) {
      this._dialogRef.close(product);
    } else {
      this._dialogRef.close();
    }
  }

  get f() {
    return this.form.controls;
  }
}
