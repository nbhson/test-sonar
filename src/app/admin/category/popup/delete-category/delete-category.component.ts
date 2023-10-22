import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ServerErrorHelper } from 'src/helpers/server-errors.helper';
import { NotifyService } from 'src/services/notifier.service';
import { Category } from '../../model/category.model';
import { CategoryService } from '../../service/category.service';
import { UpdateCategoryComponent } from '../update-category/update-category.component';

@Component({
  selector: 'app-delete-category',
  templateUrl: './delete-category.component.html',
  styleUrls: ['./delete-category.component.scss'],
})
export class DeleteCategoryComponent implements OnInit {
  form: FormGroup;
  errMsg: string;
  loading: boolean = false;

  constructor(
    private _notifyService: NotifyService,
    private _categoryService: CategoryService,
    private _dialogRef: MatDialogRef<UpdateCategoryComponent>,
    @Inject(MAT_DIALOG_DATA) public category: Category,
  ) {}

  ngOnInit() {}

  submit() {
    this.loading = true;
    this.errMsg = '';
    this._categoryService.delete(this.category._id).subscribe(
      (result) => {
        this.loading = false;
        this.errMsg = '';
        this._notifyService.success('Xóa danh mục thành công!');
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
