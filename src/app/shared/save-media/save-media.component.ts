import {
  Component,
  Input,
  Output,
  EventEmitter,
  ChangeDetectionStrategy,
} from '@angular/core';

@Component({
  selector: 'app-save-media',
  templateUrl: './save-media.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SaveMediaComponent {
  @Input({ required: true }) mediaId!: number;

  @Output() saveRequested = new EventEmitter<number>();

  onClick(): void {
    this.saveRequested.emit(this.mediaId);
  }
}
