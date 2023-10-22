import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { ServerErrorHelper } from 'src/helpers/server-errors.helper';
import { UtilHelper } from 'src/helpers/util.helper';
import { NotifyService } from 'src/services/notifier.service';
import { Category } from '../../model/category.model';
import { CategoryService } from '../../service/category.service';

@Component({
  selector: 'app-add-category',
  templateUrl: './add-category.component.html',
  styleUrls: ['./add-category.component.scss'],
})
export class AddCategoryComponent implements OnInit {
  form: FormGroup;
  category: Category;
  errMsg: string;
  loading: boolean = false;

  constructor(
    private _formBuilder: FormBuilder,
    private _notifyService: NotifyService,
    private _categoryService: CategoryService,
    private _dialogRef: MatDialogRef<AddCategoryComponent>,
  ) {}

  ngOnInit() {
    this.initCategory();
    this.initForm();
  }

  initCategory() {
    this.category = new Category('', '', '', 0, 0, '', 0);
  }

  initForm() {
    this.form = this._formBuilder.group({
      name: [this.category.name, Validators.compose([Validators.required, Validators.minLength(5)])],
      image: [this.category.image],
    });
  }

  onFileSelected() {
    const inputNode: any = document.querySelector('#file');
    this.getBase64(inputNode.files[0], this.category, this._notifyService);
  }

  getBase64(file: File, category: Category, notifyService: NotifyService) {
    var reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = function (result) {
      category.image = <string>reader.result;
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
    this._categoryService.add(this.category).subscribe(
      (category) => {
        this.loading = false;
        this.errMsg = '';
        this._notifyService.success('Thêm danh mục thành công!');
        this.close(category);
      },
      (error) => {
        this.loading = false;
        this.errMsg = ServerErrorHelper.getErrorMsg(error);
      },
    );
  }

  handleData() {
    this.category.name = this.category.name.trim();

    if (UtilHelper.isEmptyString(this.category.name)) {
      this.f['name'].setErrors({ required: true });
    }
  }

  close(category: Category) {
    if (category) {
      this._dialogRef.close(category);
    } else {
      this._dialogRef.close();
    }
  }

  get f() {
    return this.form.controls;
  }
}
