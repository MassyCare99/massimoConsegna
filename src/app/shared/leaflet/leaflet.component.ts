import {
  Component,
  ElementRef,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import * as L from 'leaflet';

@Component({
  selector: 'mc-leaflet',
  templateUrl: './leaflet.component.html',
  styles: [],
})
export class LeafletComponent implements OnChanges {
  @ViewChild('host', { static: true }) host!: ElementRef<HTMLDivElement>;

  @Input() coords: number[] | null = null;
  @Input() zoom: number = 5;
  @Input() markerText: string = '';

  firstChange: boolean = true;
  map!: L.Map;
  marker!: L.Marker;

  ngOnChanges(changes: SimpleChanges) {
    if (changes['coords'].currentValue) {
      if (changes['coords'] && this.firstChange) {
        const coords: L.LatLngExpression = this.coords as L.LatLngExpression;
        this.map = L.map(this.host.nativeElement).setView(coords, this.zoom);

        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(
          this.map
        );
        //if (this.markerText) {
        this.marker = L.marker(coords).addTo(this.map);
        //.bindPopup(this.markerText)
        //.openPopup();
        //}
        this.firstChange = false;
      }

      if (changes['coords'] && !this.firstChange) {
        const coords: L.LatLngExpression = this.coords as L.LatLngExpression;

        if (this.markerText) {
          this.marker.bindPopup(this.markerText);
        }
        this.map.setView(coords);
        this.marker.setLatLng(coords);
      }

      if (changes['zoom']) {
        this.map.setZoom(changes['zoom'].currentValue);
      }
    }
  }
}
