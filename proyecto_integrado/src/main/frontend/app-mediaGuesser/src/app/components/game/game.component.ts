import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Params} from "@angular/router";
import {MediaService} from "../../../utils/services/media.service";
import {MediaInterface} from "../../interfaces/media.interface";
import {FormsModule} from "@angular/forms";
import {NgForOf, NgIf} from "@angular/common";

@Component({
  selector: 'app-game',
  standalone: true,
  imports: [
    FormsModule,
    NgIf,
    NgForOf
  ],
  templateUrl: './game.component.html',
  styleUrl: './game.component.css'
})
export class GameComponent implements OnInit{

  params : Params | undefined
  medias : MediaInterface[] | undefined
  progressCount: number = 0
  constructor
  (private route: ActivatedRoute,
   private mediaService: MediaService) {
  }

  ngOnInit() {
    this.route.queryParams.subscribe(params =>
    this.params = params)

    console.log(this.params)
    if(this.params)
    this.mediaService.getMediaAfterYearAndType(new Date(this.params['date']).getFullYear(), this.params['mode']).subscribe(medias => {
      this.medias = medias.sort((a, b) => 0.5 - Math.random())
      console.log(this.medias)
    })
  }

  searchText: string = '';
  filteredMedias: MediaInterface[] | undefined = [];

  filterMedias(input: string){
    console.log(input)
    this.filteredMedias =  this.medias?.filter(media =>
    media.name.toLowerCase().includes(input.toLowerCase()))
  }

  selectMediaType(mediaType: MediaInterface): void {
    console.log(mediaType)
    this.searchText = mediaType.name
    this.filteredMedias = []
  }
  submit(item: string){
    console.log(item)
  }
}
