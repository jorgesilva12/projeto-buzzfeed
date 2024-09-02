import { Component, OnInit } from '@angular/core';
import {CommonModule} from '@angular/common'
import quizz_questions from "../../../assets/data/quizz_questions.json"

@Component({
  selector: 'app-quizz',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './quizz.component.html',
  styleUrl: './quizz.component.css'
})
export class QuizzComponent implements OnInit{
  title:string = ""
  
  questions:any
  questionsSelected:any
  
  answers:string[]=[]
  answerSelected:string=""
  
  questionIndex:number = 0
  questionMaxIndex:number = 0
  
  finished:boolean = false
  constructor(){}
  ngOnInit(){
    if(quizz_questions){
      this.finished = false
      this.title = quizz_questions.title
      this.questions = quizz_questions.questions
      this.questionsSelected = this.questions[this.questionIndex]
      
      this.questionIndex = 0
      this.questionMaxIndex = this.questions.length
    }
  }
  playerChoose(valeu:string) {
    this.answers.push(valeu)
    this.nextStep()
  }

  async nextStep(){
    this.questionIndex+=1
    if(this.questionMaxIndex > this.questionIndex){
      this.questionsSelected = this.questions[this.questionIndex]
    }else{
      const finalAnswer:string = await this.checkResult(this.answers)
      this.finished = true
      this.answerSelected = quizz_questions.results[finalAnswer as keyof typeof quizz_questions.results]
    }
  }

  async checkResult(answer:string[]){
    const result = answer.reduce((prev, curr, i, arr)=>{
      if(arr.filter(item => item === prev).length > 
        arr.filter(item => item === curr).length ){
        return prev
      }else{
        return curr
      }
    })
    return result
  }
}
