import { Component } from '@angular/core';
import { QUESTIONS } from "./questions";
import { Question} from "./question";

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss']
})
export class TabsPage {
  constructor() {}
  start_test:boolean = false;
  result:boolean = false;
  current_type:String;
  current_question: Question;
  current_answer: String;
  attendedQuestion: number[] = [];
  currentCategoryQuestions: Question[] = [];
  currentCategory:number = 0;
  categories: String[] = ['psychometric', 'aptitude', 'creativity', 'adaptability', 'verbal', 'teamwork'];
  difficulties:String[] = ['easy','hard']

  getCategoryQuestions(category:String){
    let ques = QUESTIONS.filter(q => q.category === category);
    return ques;
  }


  ngOnInit() {
    this.currentCategoryQuestions = this.getCategoryQuestions('psychometric');
    let easy = this.currentCategoryQuestions.filter(q => q.level === 'easy');
    this.current_question = easy[Math.floor(Math.random() * easy.length)];
    this.attendedQuestion.push(this.current_question.id);
    this.current_type = this.current_question.type;
  }

  start(){
    console.log("start");
    this.start_test = true;
  }

  nextQuestion(){
    console.log("nextQuestion");
    console.log(this.current_answer);
    this.currentCategoryQuestions = this.currentCategoryQuestions.filter(q => q.id !== this.current_question.id);
    if(this.current_answer === this.current_question.answer){
      if(this.current_question.level === "easy"){
        this.currentCategoryQuestions = this.currentCategoryQuestions.filter(q => q.level === "hard");
        if(this.currentCategoryQuestions.length > 0){
          this.current_question = this.currentCategoryQuestions[Math.floor(Math.random() * this.currentCategoryQuestions.length)];
          this.current_type = this.current_question.type;
        }
        else{
          this.currentCategory++;
          this.currentCategoryQuestions = this.getCategoryQuestions(this.categories[this.currentCategory]);
          let easy = this.currentCategoryQuestions.filter(q => q.level === "easy");
          this.current_question = easy[Math.floor(Math.random() * easy.length)];
          this.current_type = this.current_question.type;
        }
      }
      else{
        this.currentCategory++;
        this.currentCategoryQuestions = this.getCategoryQuestions(this.categories[this.currentCategory]);
        let easy = this.currentCategoryQuestions.filter(q => q.level === "easy");
        this.current_question = easy[Math.floor(Math.random() * easy.length)];
        this.current_type = this.current_question.type;
      }
    }
    else{
      this.currentCategory++;
      this.currentCategoryQuestions = this.getCategoryQuestions(this.categories[this.currentCategory]);
      let easy = this.currentCategoryQuestions.filter(q => q.level === "easy");
      this.current_question = easy[Math.floor(Math.random() * easy.length)];
      this.current_type = this.current_question.type;
    }
    this.current_answer = "";
    
  }

  setAnswer(event:any){
    this.current_answer = event.detail.value;
  }
}
