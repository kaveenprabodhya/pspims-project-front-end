import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-table',
  imports: [CommonModule, FormsModule],
  templateUrl: './table.component.html',
  styleUrl: './table.component.css'
})
export class TableComponent {
  @Input() headers: string[] = [];
  @Input() keys: string[] = [];
  @Input() data: any[] = [];
  @Output() edit = new EventEmitter<any>();
  @Output() delete = new EventEmitter<any>();
  @Input() actionDisable: boolean = false;

  getValue(obj: any, path: string): any {
    return path.split('.').reduce((o, p) => o?.[p], obj);
  }

  copiedKeyMap = new Map<string, boolean>();

  isCopyable(key: string): boolean {
    const copyKeywords = ['id', 'email', 'invoice', 'tracking', 'uuid', 'reference'];
    return copyKeywords.some(kw => key.toLowerCase().includes(kw));
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
