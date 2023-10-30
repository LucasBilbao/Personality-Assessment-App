import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// Material
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

// Components & Directives
import { LoaderComponent } from './components/loader/loader.component';
import { SignupComponent } from './components/signup/signup.component';
import { ShowPasswordDirective } from './directives/show-password/show-password.directive';
import { DisclaimerComponent } from './components/disclaimer/disclaimer.component';

const components = [LoaderComponent, SignupComponent, DisclaimerComponent];

const materialModules = [
  MatProgressSpinnerModule,
  MatInputModule,
  MatFormFieldModule,
  MatButtonModule,
  MatIconModule,
];

@NgModule({
  declarations: [components, ShowPasswordDirective],
  imports: [CommonModule, materialModules, FormsModule, ReactiveFormsModule],
  exports: [components, materialModules, CommonModule],
})
export class SharedModule {}
