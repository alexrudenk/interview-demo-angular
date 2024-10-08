import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { CheckBoxStatus } from '../../../enums/checkbox-status.enum';
import { SurveyService } from '../../services/survey.service';

@Component({
  selector: 'app-survey-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  providers: [SurveyService],
  templateUrl: './survey-form.component.html',
  styleUrl: './survey-form.component.scss'
})
export class SurveyFormComponent implements OnInit {
  surveyService = inject(SurveyService);
  public surveyForm: FormGroup;
  public CheckBoxStatus = CheckBoxStatus;
  public checkBoxStatus: CheckBoxStatus = CheckBoxStatus.DESELECTED;

  get nameControl(): FormControl<boolean> {
    return this.surveyForm.controls['name'] as FormControl;
  }
  get ageControl(): FormControl<boolean> {
    return this.surveyForm.controls['age'] as FormControl;
  }
  get sportsControl(): FormControl<boolean> {
    return (this.surveyForm.controls['preferences'] as FormGroup).controls['sports'] as FormControl;
  }
  get booksControl(): FormControl<boolean> {
    return (this.surveyForm.controls['preferences'] as FormGroup).controls['books'] as FormControl;
  }
  get travelControl(): FormControl<boolean> {
    return (this.surveyForm.controls['preferences'] as FormGroup).controls['travel'] as FormControl;
  }
  get preferencesGroup(): FormGroup {
    return this.surveyForm.controls['preferences'] as FormGroup;
  }

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.surveyForm = this.formBuilder.group({
      name: this.formBuilder.control<string | null>(null, [Validators.required, Validators.minLength(3)]),
      age: this.formBuilder.control<number | null>(null, [Validators.required, Validators.min(0), Validators.max(100)]),
      preferences: this.formBuilder.group({
        sports: this.formBuilder.control(false),
        books: this.formBuilder.control(false),
        travel: this.formBuilder.control(false)
      })
    });
  }

  public submitSurvey(event: Event): void {
    event.preventDefault();
    this.surveyService.postAnswer(this.surveyForm.value);
    this.surveyForm.reset();
    this.checkBoxStatus = CheckBoxStatus.DESELECTED;
  }

  public toggleSelectAll(): void {
    if (this.checkBoxStatus === CheckBoxStatus.DESELECTED || this.checkBoxStatus === CheckBoxStatus.INDETERMINATE) {
      this.preferencesGroup.setValue({
        sports: true,
        books: true,
        travel: true
      });
      this.checkBoxStatus = CheckBoxStatus.SELECTED;
    } else if (this.checkBoxStatus === CheckBoxStatus.SELECTED) {
      this.preferencesGroup.setValue({
        sports: false,
        books: false,
        travel: false
      });
      this.checkBoxStatus = CheckBoxStatus.DESELECTED;
    }
  }

  public checkIndeterminate(): void {
    let selectedFields: boolean[] = [];
    for (let key in this.preferencesGroup.controls) {
      selectedFields.push(this.preferencesGroup.controls[key].value);
    }
    let selectedFieldsNumber: number = selectedFields.reduce<number>((acc: number, val) => val ? acc + 1 : acc, 0);
    switch (selectedFieldsNumber) {
      case (0): this.checkBoxStatus = CheckBoxStatus.DESELECTED; break;
      case (1):
      case (2): this.checkBoxStatus = CheckBoxStatus.INDETERMINATE; break;
      case (3): this.checkBoxStatus = CheckBoxStatus.SELECTED; break;
    }
  }
}
