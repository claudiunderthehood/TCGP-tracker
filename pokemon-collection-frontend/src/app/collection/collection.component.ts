import { Component, OnInit } from '@angular/core';
import { CollectionService } from '../collection.service';
import { Card } from '../models/card.model';

@Component({
  selector: 'app-collection',
  templateUrl: './collection.component.html',
  styleUrls: ['./collection.component.css'],
})
export class CollectionComponent implements OnInit {
  collection: Card[] = [];
  positionProbabilities: { [key: string]: { '1-3': number; '4': number; '5': number } } = {};

  constructor(private collectionService: CollectionService) {}

  ngOnInit(): void {
    this.loadCollection();
  }

  loadCollection(): void {
    this.collectionService.getProbabilities().subscribe((data: any) => {
      this.collection = data.collection;
      this.positionProbabilities = data.positionProbabilities;
    });
  }

  toggleOwnership(card: Card): void {
    card.Owned = !card.Owned;
    this.updateCollection();
  }

  updateCollection(): void {
    this.collectionService.updateCollection(this.collection).subscribe(() => {
      this.refreshProbabilities();
    });
  }

  refreshProbabilities(): void {
    this.collectionService.getProbabilities().subscribe((data: any) => {
      this.positionProbabilities = data.positionProbabilities;
    });
  }

  handleImageError(event: Event): void {
    const target = event.target as HTMLImageElement;
    target.src = 'assets/A1.webp'; // Placeholder image
  }
}
