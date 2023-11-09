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
import { DisclaimerComponent } from './components/disclaimer/disclaimer.component';
import { ResultsComponent } from './components/results/results.component';

const components = [LoaderComponent, DisclaimerComponent, ResultsComponent];

const materialModules = [
  MatProgressSpinnerModule,
  MatInputModule,
  MatFormFieldModule,
  MatButtonModule,
  MatIconModule,
];

@NgModule({
  declarations: [components],
  imports: [CommonModule, materialModules, FormsModule, ReactiveFormsModule],
  exports: [components, materialModules, CommonModule],
})
export class SharedModule {}
