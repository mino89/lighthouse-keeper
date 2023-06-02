import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'lhk-modal-content',
  templateUrl: './modal-content.component.html',
})
export class ModalContentComponent {
  @Input() title!: string;
  @Input() disabled: boolean = false;
  @Output() onConfirmAction = new EventEmitter<void>();

  public confirmActionHandle(): void {
    console.log('confirm')
    this.onConfirmAction.emit();
  }
}
