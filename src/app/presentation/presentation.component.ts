import { Component, OnInit } from '@angular/core';
import { ExhibitorService } from '../exhibitor.service';
import { Presentation } from '../presentation';

@Component({
  selector: 'app-presentation',
  templateUrl: './presentation.component.html',
  styleUrls: ['./presentation.component.scss']
})
export class PresentationComponent implements OnInit {


  presentationData: Presentation[];

  constructor( private exhibitorService: ExhibitorService) { }

  ngOnInit() {

    this.exhibitorService.getPresentations().subscribe(data => {
        this.presentationData = data['data'].slice();
    });
  }

}
