import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ServerErrorHelper } from 'src/helpers/server-errors.helper';
import { UtilHelper } from 'src/helpers/util.helper';
import { NotifyService } from 'src/services/notifier.service';
import { Category } from '../../model/category.model';
import { CategoryService } from '../../service/category.service';

@Component({
  selector: 'app-update-category',
  templateUrl: './update-category.component.html',
  styleUrls: ['./update-category.component.scss'],
})
export class UpdateCategoryComponent implements OnInit {
  form: FormGroup;
  errMsg: string;
  loading: boolean = false;
  categoryClone: Category;

  constructor(
    private _formBuilder: FormBuilder,
    private _notifyService: NotifyService,
    private _categoryService: CategoryService,
    private _dialogRef: MatDialogRef<UpdateCategoryComponent>,
    @Inject(MAT_DIALOG_DATA) public category: Category,
  ) {}

  ngOnInit() {
    this.categoryClone = { ...this.category };
    this.initForm();
  }

  initForm() {
    this.form = this._formBuilder.group({
      name: [this.categoryClone.name, Validators.compose([Validators.required, Validators.minLength(5)])],
      image: [this.categoryClone.image],
    });
  }

  onFileSelected() {
    const inputNode: any = document.querySelector('#file');
    this.getBase64(inputNode.files[0], this.categoryClone, this._notifyService);
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
    this._categoryService.update(this.categoryClone).subscribe(
      (category) => {
        this.loading = false;
        this.errMsg = '';
        this._notifyService.success('Sửa danh mục thành công!');
        this.close(category);
      },
      (error) => {
        this.loading = false;
        this.errMsg = ServerErrorHelper.getErrorMsg(error);
      },
    );
  }

  handleData() {
    this.categoryClone.name = this.categoryClone.name.trim();

    if (UtilHelper.isEmptyString(this.categoryClone.name)) {
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
