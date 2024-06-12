import {AfterViewInit, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute, Params} from "@angular/router";
import {MediaService} from "../../../utils/services/media.service";
import {MediaInterface} from "../../interfaces/media.interface";
import {FormsModule} from "@angular/forms";
import {NgClass, NgForOf, NgIf, NgOptimizedImage} from "@angular/common";
import {LocalUserInterface} from "../../interfaces/user.interface";
import {ScoreService} from "../../../utils/services/score.service";
import {UserService} from "../../../utils/services/user.service";

@Component({
  selector: 'app-game',
  standalone: true,
  imports: [
    FormsModule,
    NgIf,
    NgForOf,
    NgOptimizedImage,
    NgClass
  ],
  templateUrl: './game.component.html',
  styleUrl: './game.component.css'
})
export class GameComponent implements OnInit {

  @ViewChild('response') responseInput!: ElementRef;

  params: Params | undefined
  medias: MediaInterface[] | undefined
  progressCount: number = 0
  user: LocalUserInterface = localStorage.getItem('user') !== null ? JSON.parse(localStorage.getItem('user') || "{}") : undefined
  answer: string = ''
  filteredMedias: MediaInterface[] | undefined = []
  lives: number = 5

  constructor
  (private route: ActivatedRoute,
   private mediaService: MediaService,
   private scoreService: ScoreService,
   private userService : UserService
  ) {
  }

  ngOnInit() {
    this.route.queryParams.subscribe(params =>
      this.params = params)
    if (this.params)
      this.mediaService.getMediaAfterYearAndType(this.params['startYear'], this.params['mode']).subscribe(medias => {
        this.medias = medias.sort(() => 0.5 - Math.random())
      })
  }

  containsWord(content: string) {
    return this.medias?.some(media =>
      media.name.toLowerCase() === content.toLowerCase() && content !== '')
  }

  filterMedias(input: string) {
    console.log(input)
    this.filteredMedias = this.medias?.filter(media =>
      media.name.toLowerCase().includes(input.toLowerCase()) && input !== '')
  }

  selectMedia(media: MediaInterface): void {
    this.answer = media.name
    this.filteredMedias = []
  }

  endGame() {
    if(this.user && this.user.maxScore < this.progressCount){
      this.user.maxScore = this.progressCount
      this.userService.updateUser(this.user.id, {
        maxScore: this.user.maxScore,
      }).subscribe()
    }
    if(this.user) {
      this.userService.getUserById(this.user.id).subscribe(user => {
          this.scoreService.createScore({
            user: user,
            userId: user.id,
            score: this.progressCount,
            date: new Date()
          }).subscribe()
        }
      )
      localStorage.setItem('user', JSON.stringify(this.user))
    }
  }

  submit(answer: string) {
    if (this.medias)
      if (this.containsWord(answer)) {
        this.answer = ''
        if (this.medias[this.progressCount].name.toLowerCase() === answer.toLowerCase()) {
          this.progressCount++
          this.progressCount % 5 === 0 && this.lives < 5 && this.lives++
          if(!this.medias[this.progressCount])
            this.endGame()
        } else {
          this.lives--
          if (this.lives === 0) {
            this.endGame()
          }
        }
      }
  }
}
