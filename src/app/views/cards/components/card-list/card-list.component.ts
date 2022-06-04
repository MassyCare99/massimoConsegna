import { Card } from '../../../../models/card';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'mc-card-list',
  templateUrl: './card-list.component.html',
  styles: [],
})
export class CardListComponent implements OnInit {
  @Input() cards: Card[] | null = [];
  @Output() vediDettaglio = new EventEmitter<string>();
  @Output() elimina = new EventEmitter<string>();
  @Output() aggiungiNuovo = new EventEmitter<void>();

  constructor(private http: HttpClient) {}

  ngOnInit(): void {}
}
