import {Component, OnInit} from '@angular/core';
import {ScoreInterface} from "../../interfaces/score.interface";
import {ScoreService} from "../../../utils/services/score.service";
import {NgForOf} from "@angular/common";

@Component({
  selector: 'app-scores',
  standalone: true,
  imports: [
    NgForOf
  ],
  templateUrl: './scores.component.html',
  styleUrl: './scores.component.css'
})
export class ScoresComponent implements OnInit{

  scores : ScoreInterface[] |  undefined
  constructor(
    private scoreService: ScoreService
  ) {
  }
  ngOnInit() {
    this.scoreService.getTopScores().subscribe(scores => {
      console.log(scores)
      this.scores = scores
    })
  }



}
