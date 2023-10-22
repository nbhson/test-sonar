import { FormGroup } from '@angular/forms';

export function validPassword(password: string, rePassword: string) {
  return (formGroup: FormGroup) => {
    const passwordControl = formGroup.controls[password];
    const rePasswordControl = formGroup.controls[rePassword];

    if (passwordControl.value !== rePasswordControl.value) {
      rePasswordControl.setErrors({ invalid: true });
    }
  };
}
