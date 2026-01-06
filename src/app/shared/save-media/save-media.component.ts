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
  @Input({ required: true }) mediaId!: string;

  @Output() saveRequested = new EventEmitter<string>();

  onClick(event: MouseEvent): void {
    event.stopPropagation();
    this.saveRequested.emit(this.mediaId);
  }
}
