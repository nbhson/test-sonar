import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ServerErrorHelper } from 'src/helpers/server-errors.helper';
import { UtilHelper } from 'src/helpers/util.helper';
import { NotifyService } from 'src/services/notifier.service';
import { Product } from '../../model/product.model';
import { ProductService } from '../../service/product.service';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.scss'],
})
export class AddProductComponent implements OnInit {
  form: FormGroup;
  product: Product;
  errMsg: string;
  loading: boolean = false;

  constructor(
    private _formBuilder: FormBuilder,
    private _notifyService: NotifyService,
    private _productService: ProductService,
    private _dialogRef: MatDialogRef<AddProductComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) {}

  ngOnInit() {
    this.initProduct();
    this.initForm();
  }

  initProduct() {
    this.product = new Product('', '', '', 0, '', '', 0, 0, '', this.data.categories[0]._id, '');
  }

  initForm() {
    this.form = this._formBuilder.group({
      name: [this.product.name, Validators.compose([Validators.required, Validators.minLength(5)])],
      price: [this.product.price, Validators.compose([Validators.required])],
      description: [this.product.description, Validators.compose([Validators.required])],
      categoryId: [this.product.categoryId, Validators.compose([Validators.required])],
      image: [this.product.image],
    });
  }

  onFileSelected() {
    const inputNode: any = document.querySelector('#file');
    this.getBase64(inputNode.files[0], this.product, this._notifyService);
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
    this._productService.add(this.product).subscribe(
      (product) => {
        this.loading = false;
        this.errMsg = '';
        this._notifyService.success('Thêm sản phẩm thành công!');
        this.close(product);
      },
      (error) => {
        this.loading = false;
        this.errMsg = ServerErrorHelper.getErrorMsg(error);
      },
    );
  }

  handleData() {
    this.product.name = this.product.name.trim();
    this.product.description = this.product.description.trim();

    if (UtilHelper.isEmptyString(this.product.name)) {
      this.f['name'].setErrors({ required: true });
    }

    if (UtilHelper.isEmptyString(this.product.description)) {
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
