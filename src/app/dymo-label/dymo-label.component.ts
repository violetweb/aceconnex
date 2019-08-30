import { Component, OnInit, Input, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import { loadPrinter, loadLabelFromWeb, renderPreview, getFullname, getCompany, setFullname, setCompany, printLabel, setTitle, setBadge } from 'src/assets/PreviewandPrintLabel.js';



@Component({
  selector: 'app-dymo-label',
  templateUrl: './dymo-label.component.html',
  styleUrls: ['./dymo-label.component.scss']
})
export class DymoLabelComponent implements OnChanges {

   @Input() fullname = '';
   @Input() title = '';
   @Input() company = '';
   @Input() badge: any = '';

   @Output() complete = new EventEmitter<string>();

  printerName = '';
  printers: any;
  labelXml: any;
  pngData: any;
  labelImage: any = 'data:image/png;base64,';
  print = false;

  constructor() {
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.print = true;
    this.printers = loadPrinter();
    this.printerName = this.printers[0].name;    
    this.labelXml = loadLabelFromWeb();
    setFullname(this.labelXml, this.fullname);
    setCompany(this.labelXml, this.company);
    setTitle(this.labelXml, this.title);
    setBadge(this.labelXml, this.badge);
    const li = renderPreview(this.labelXml);
    this.labelImage = 'data:image/png;base64,' + li;
  }


   onPrintLabel() {
     printLabel(this.labelXml, this.printerName);
   }


}
