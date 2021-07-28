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
  totalQuestions = 0;
  score = 0;
  currentType: string;
  currentQuestion: Question;
  currentAnswer = '';
  attendedQuestion: number[] = [];
  currentCategoryQuestions: Question[] = [];
  currentCategory = 0;
  easyAnswer = 0;
  easyQuestions = 0;
  hardAnswer = 0;
  hardQuestions = 0;
  categories: string[] = ['psychometric', 'aptitude', 'creativity', 'adaptability', 'verbal', 'teamwork'];
  difficulties: string[] = ['easy','hard'];
  public canvasWidth = 300;
  public centralLabel = '';
  public name = 'Skill Meter';
  public bottomLabel = '';
  public options = {
    hasNeedle: true,
    needleColor: 'black',
    needleUpdateSpeed: 1000,
    arcColors: ['#FCE4D6', '#F8CBAD','#F4B084','#C65911','#833C0C'],
    arcDelimiters: [20,40,60,80],
    rangeLabel: ['0', '100'],
    needleStartValue: 0,
  };
  public finalScore = 0;

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
    if(this.currentCategory === this.categories.length - 1){
      this.result = true;
    }
    if(this.currentQuestion.level === 'hard') {
      this.hardQuestions++;
    }
    else {
      this.easyQuestions++;
    }
    this.totalQuestions ++;
    this.currentCategoryQuestions = this.currentCategoryQuestions.filter(q => q.id !== this.currentQuestion.id);
    if(this.currentAnswer === this.currentQuestion.answer){
      this.score = this.currentQuestion.level === 'easy'? this.score + 1 : this.score + 2;
      if(this.currentQuestion.level === 'hard'){
        this.hardAnswer++;
        this.score += 2;
      }
      if(this.currentQuestion.level === 'easy'){
        this.easyAnswer++;
        this.score += 1;
        this.currentCategoryQuestions = this.currentCategoryQuestions.filter(q => q.level === 'hard');
        if(this.currentCategoryQuestions.length > 0){
          nextCategory = false;
          this.currentQuestion = this.currentCategoryQuestions[Math.floor(Math.random() * this.currentCategoryQuestions.length)];
          this.currentType = this.currentQuestion.type;
        }
      }
    }
    if(nextCategory === true && !this.result){
      this.currentCategory++;
      this.currentCategoryQuestions = this.getCategoryQuestions(this.categories[this.currentCategory]);
      const easy = this.currentCategoryQuestions.filter(q => q.level === 'easy');
      this.currentQuestion = easy[Math.floor(Math.random() * easy.length)];
      this.currentType = this.currentQuestion.type;
    }
    if(this.result){
      this.finalScore = ((this.easyAnswer / this.easyQuestions) * 25) + ((this.hardAnswer / this.hardQuestions) * 75);
      this.bottomLabel =  this.finalScore.toFixed(2).toString() + '%';
    }
    this.currentAnswer = '';

  }

  setAnswer(event: any){
    this.currentAnswer = event.detail.value;
  }
}
