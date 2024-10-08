import { Component, inject, OnInit } from '@angular/core';
import { SurveyAnswer } from '../../models/survey-answer.model';
import { CommonModule } from '@angular/common';
import { SurveyService } from '../../services/survey.service';
import { take } from 'rxjs';

@Component({
  selector: 'app-survey-results',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './survey-results.component.html',
  styleUrl: './survey-results.component.scss'
})
export class SurveyResultsComponent implements OnInit {
  private surveyService = inject(SurveyService);
  surveyAnswers: SurveyAnswer[] = [];

  ngOnInit(): void {
    this.surveyService.getAnswers().pipe(take(1)).subscribe((res: SurveyAnswer[]) => this.surveyAnswers = res);
  }
}
