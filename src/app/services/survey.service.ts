import { inject, Injectable } from '@angular/core';
import { collectionData, Firestore } from '@angular/fire/firestore';
import { addDoc, collection } from 'firebase/firestore';
import { from, Observable } from 'rxjs';
import { SurveyAnswer } from '../models/survey-answer.model';


@Injectable({
  providedIn: 'root',
})
export class SurveyService {
  firestore = inject(Firestore);
  surveyCollection = collection(this.firestore, 'answers');

  public getAnswers(): Observable<SurveyAnswer[]> {
    return collectionData(this.surveyCollection)
  }

  public postAnswer(answer: SurveyAnswer): Observable<string> {
    const answerPromise = addDoc(this.surveyCollection, answer).then(response => response.id)
    return from(answerPromise);
  }

}
