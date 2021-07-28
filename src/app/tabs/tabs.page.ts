import { Component, OnInit } from '@angular/core';
import { QUESTIONS } from './questions';
import { Question} from './question';

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss']
})
export class TabsPage implements OnInit{
  startTest = false;
  result = false;
  currentType: string;
  currentQuestion: Question;
  currentAnswer: string;
  attendedQuestion: number[] = [];
  currentCategoryQuestions: Question[] = [];
  currentCategory = 0;
  categories: string[] = ['psychometric', 'aptitude', 'creativity', 'adaptability', 'verbal', 'teamwork'];
  difficulties: string[] = ['easy','hard'];

  constructor() {}
  getCategoryQuestions(category: string){
    const ques = QUESTIONS.filter(q => q.category === category);
    return ques;
  }

  ngOnInit() {
    this.currentCategoryQuestions = this.getCategoryQuestions('psychometric');
    const easy = this.currentCategoryQuestions.filter(q => q.level === 'easy');
    this.currentQuestion = easy[Math.floor(Math.random() * easy.length)];
    this.attendedQuestion.push(this.currentQuestion.id);
    this.currentType = this.currentQuestion.type;
  }

  start(){
    console.log('start');
    this.startTest = true;
  }

  nextQuestion(){
    let nextCategory = true;
    console.log('nextQuestion');
    console.log(this.currentAnswer);
    this.currentCategoryQuestions = this.currentCategoryQuestions.filter(q => q.id !== this.currentQuestion.id);
    if(this.currentAnswer === this.currentQuestion.answer){
      if(this.currentQuestion.level === 'easy'){
        this.currentCategoryQuestions = this.currentCategoryQuestions.filter(q => q.level === 'hard');
        if(this.currentCategoryQuestions.length > 0){
          nextCategory = false;
          this.currentQuestion = this.currentCategoryQuestions[Math.floor(Math.random() * this.currentCategoryQuestions.length)];
          this.currentType = this.currentQuestion.type;
        }
      }
    }
    if(nextCategory === true){
      this.currentCategory++;
      this.currentCategoryQuestions = this.getCategoryQuestions(this.categories[this.currentCategory]);
      const easy = this.currentCategoryQuestions.filter(q => q.level === 'easy');
      this.currentQuestion = easy[Math.floor(Math.random() * easy.length)];
      this.currentType = this.currentQuestion.type;
    }
    this.currentAnswer = '';

  }

  setAnswer(event: any){
    this.currentAnswer = event.detail.value;
  }
}
