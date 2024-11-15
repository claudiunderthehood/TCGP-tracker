import { Component, OnInit } from '@angular/core';
import { CollectionService } from '../collection.service';
import { Card } from '../models/card.model';

@Component({
  selector: 'app-stats',
  templateUrl: './stats.component.html',
  styleUrls: ['./stats.component.css']
})
export class StatsComponent implements OnInit {
  packageProbabilities: { [key: string]: number } = {};
  bestPackage: { name: string; probability: number } = { name: '', probability: 0 };
  totalOwned: number = 0;
  totalMissing: number = 0;

  constructor(private collectionService: CollectionService) {}

  ngOnInit(): void {
    this.getProbabilities();
  }

  getProbabilities(): void {
    this.collectionService.getProbabilities().subscribe((data: any) => {
      this.packageProbabilities = data.packageProbabilities;
      this.bestPackage = data.bestPackage;
      this.calculateOwnership(data.collection); // Now this will work
    });
  }

  calculateOwnership(collection: Card[]): void {
    this.totalOwned = collection.filter(card => card.Owned).length;
    this.totalMissing = collection.length - this.totalOwned;
  }

  objectKeys(obj: object): string[] {
    return Object.keys(obj);
  }
}
