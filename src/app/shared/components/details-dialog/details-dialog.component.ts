import { Component, OnInit } from '@angular/core';
import { InteractionService } from '../../services/interaction.service';

@Component({
  selector: 'app-details-dialog',
  templateUrl: './details-dialog.component.html',
  styleUrls: ['./details-dialog.component.css']
})
export class DetailsDialogComponent implements OnInit {
  symbol;

  constructor(
    private _interactionService: InteractionService,
  ) { }

  ngOnInit(): void {
    this._interactionService.currentSymbolMessage.subscribe(currentSymbolMessage => {
      this.symbol = currentSymbolMessage;
    });
  }

}
