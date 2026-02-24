import { Component, Input, Output, EventEmitter } from "@angular/core";
import { NgIf, NgFor, NgClass, SlicePipe } from "@angular/common";
import { TvShowApi } from "../../../../types/tvshow.type";

@Component({
  selector: 'app-tvshow-card',
  standalone: true,
  imports: [NgIf, NgFor, NgClass, SlicePipe],
  templateUrl: './tvshow-card.component.html',
  styleUrls: ['./tvshow-card.component.css'],
})
export class TvShowCard {
  @Input() tvshow: TvShowApi | null = null;
  @Output() isSelected = new EventEmitter<TvShowApi>();
}
