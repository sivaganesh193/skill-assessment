import { Component, OnInit, ViewChild } from '@angular/core';
import { QUESTIONS } from './questions';
import { Question} from './question';
import {
  ApexAxisChartSeries,
  ApexChart,
  ChartComponent,
  ApexDataLabels,
  ApexXAxis,
  ApexPlotOptions,
  ApexFill
} from 'ng-apexcharts';

export type ChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  dataLabels: ApexDataLabels;
  plotOptions: ApexPlotOptions;
  xaxis: ApexXAxis;
  fill: ApexFill;
};

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss']
})

export class TabsPage implements OnInit{
  @ViewChild('chart') chart: ChartComponent;
  public chartOptions: Partial<ChartOptions>;

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

  categoryScores: any = {
    psychometric: {
      score: 0,
      total: 0
    },
    aptitude: {
      score: 0,
      total: 0
    },
    creativity: {
      score: 0,
      total: 0
    },
    adaptability: {
      score: 0,
      total: 0
    },
    verbal: {
      score: 0,
      total: 0
    },
    teamwork: {
      score: 0,
      total: 0
    }
  };

  constructor() {
    this.chartOptions = {
      fill: {
        colors: ['#FCE4D6', '#F8CBAD','#F4B084','#C65911','#833C0C','#926239']
      },
      series: [
        {
          name: 'basic',
          data: [0,0,0,0,0,0]
        }
      ],
      chart: {
        type: 'bar',
        height: 350
      },
      plotOptions: {
        bar: {
          horizontal: true,
          colors:{
            ranges:[{
              from: 0,
              to: 100,
                color:'#926239',
            }]
          }
        }
      },
      dataLabels: {
        enabled: true
      },
      xaxis: {
        categories: [
          'Psychometric',
          'Aptitude', 'Creativity', 'Adaptability', 'Verbal', 'Teamwork'
        ],
        max: 100
      },
    };
  }
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
    if(this.currentQuestion.level === 'hard') {
      this.categoryScores[this.currentQuestion.category].total+=75;
    }
    else {
      this.categoryScores[this.currentQuestion.category].total+=25;
    }
    if(this.currentAnswer === this.currentQuestion.answer){
      this.score = this.currentQuestion.level === 'easy'? this.score + 1 : this.score + 2;
      if(this.currentQuestion.level === 'hard'){
        this.hardAnswer++;
        this.categoryScores[this.currentQuestion.category].score+=75;
      }
      if(this.currentQuestion.level === 'easy'){
        this.easyAnswer++;
        this.categoryScores[this.currentQuestion.category].score+=25;
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
      // for(let i = 0; i < 6; ++i){
      //   this.chartOptions.series[0].data[i] =
      // }
      let i = 0;
      this.categories.forEach(category => {
        this.chartOptions.series[0].data[i]=(this.categoryScores[category].score/this.categoryScores[category].total) * 100;
        ++i;
      });

      this.finalScore = ((this.easyAnswer / this.easyQuestions) * 25) + ((this.hardAnswer / this.hardQuestions) * 75);
      this.bottomLabel =  this.finalScore.toFixed(2).toString() + '%';
      console.log(this.categoryScores);

    }
    this.currentAnswer = '';

  }

  setAnswer(event: any){
    this.currentAnswer = event.detail.value;
  }
}
