import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class InteractionService {

  private symbolMessageSource = new BehaviorSubject<string>("");
  currentSymbolMessage = this.symbolMessageSource.asObservable(); 

  private selectedFiltersMessageSource = new BehaviorSubject<string[]>([]);
  currentSelectedFiltersMessage = this.selectedFiltersMessageSource.asObservable();

  
  constructor() { }

  public changeSymbolMessage(message: string) {
    this.symbolMessageSource.next(message);
  }

  public changeSelectedFiltersMessage(message: string[]) {
    this.selectedFiltersMessageSource.next(message);
  }
}
