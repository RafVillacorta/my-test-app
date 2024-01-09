import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Vehicle } from '../vehicle';

@Component({
  selector: 'app-photo-gallery',
  templateUrl: './photo-gallery.component.html',
  styleUrls: ['./photo-gallery.component.css']
})
export class PhotoGalleryComponent {
  
  @Input("photos")
  imageList: string[] = []

  @Output("on-navigate")
  emitter = new EventEmitter
  
  currentIndex = 0

  moveNext() {
    if (this.currentIndex < this.imageList.length -1) {
      this.currentIndex += 1
      // Raise event with index as payload
      this.emitter.emit(this.currentIndex)
    }
  }

  movePrevious() {
    if (this.currentIndex > 0) {
      this.currentIndex -= 1
      // Raise event with index as payload
      this.emitter.emit(this.currentIndex)
    }
  }

}
