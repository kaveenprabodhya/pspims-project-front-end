import { CommonModule, DatePipe } from '@angular/common';
import { Component, EventEmitter, Input, Output, SimpleChanges } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-table',
  imports: [CommonModule, FormsModule],
  templateUrl: './table.component.html',
  styleUrl: './table.component.css',
  providers: [DatePipe]
})
export class TableComponent {
  @Input() headers: string[] = [];
  @Input() keys: string[] = [];
  @Input() data: any[] = [];
  @Output() edit = new EventEmitter<any>();
  @Output() delete = new EventEmitter<any>();
  @Input() actionDisable: boolean = false;

  filteredData: any[] = [];
  searchTerm: string = '';

  constructor(private datePipe: DatePipe) {}

  ngOnInit(){
    this.filterData();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['data']) {
      this.filterData();
    }
  }

  filterData(): void {
    if (!this.data || this.data.length === 0) {
      this.filteredData = [];
      return;
    }
    const term = this.searchTerm.toLowerCase();
    this.filteredData = this.data.filter(item =>
      this.keys.some(key => {
        const val = this.getValue(item, key)?.toString().toLowerCase();
        return val?.includes(term);
      })
    );
  }
  

  getValue(obj: any, path: string): any {
    const value = path.split('.').reduce((o, p) => o?.[p], obj);

    // Check if value is a date string
    if (typeof value === 'string' && !isNaN(Date.parse(value))) {
      const date = new Date(value);
      return this.datePipe.transform(date, 'dd/MM/yyyy'); // Adjust format as needed
    }

    return value;
  }

  copiedKeyMap = new Map<string, boolean>();

  isCopyable(key: string): boolean {
    const copyKeywords = [
      'id',
      'email',
      'invoice',
      'tracking',
      'uuid',
      'reference',
      'batch',
    ];
    return copyKeywords.some((kw) => key.toLowerCase().includes(kw));
  }

  copyToClipboard(value: any, key: string, index: number): void {
    if (!value) return;

    navigator.clipboard.writeText(value.toString()).then(() => {
      const mapKey = `${index}-${key}`;
      this.copiedKeyMap.set(mapKey, true);
      setTimeout(() => this.copiedKeyMap.delete(mapKey), 1500);
    });
  }

  isCopied(key: string, index: number): boolean {
    return this.copiedKeyMap.has(`${index}-${key}`);
  }
}
