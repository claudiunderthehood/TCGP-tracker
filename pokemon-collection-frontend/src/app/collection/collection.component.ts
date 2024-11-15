import { Component, OnInit } from '@angular/core';
import { CollectionService } from '../collection.service';
import { Card } from '../models/card.model';

@Component({
  selector: 'app-collection',
  templateUrl: './collection.component.html',
  styleUrls: ['./collection.component.css']
})
export class CollectionComponent implements OnInit {
  collection: Card[] = [];

  constructor(private collectionService: CollectionService) {}

  ngOnInit(): void {
    this.loadCollection();
  }

  loadCollection(): void {
    this.collectionService.getCollection().subscribe((data: Card[]) => {
      this.collection = data.map(card => ({
        ...card,
        PositionProbabilities: card.PositionProbabilities || { "1-3": 0, "4": 0, "5": 0 }
      }));
    });
  }

  toggleOwnership(card: Card): void {
    card.Owned = !card.Owned;
    this.collectionService.updateCollection(this.collection).subscribe();
  }
}
