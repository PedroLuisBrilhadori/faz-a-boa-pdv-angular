import {
  AfterViewInit,
  Component,
  Input,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { EventEmitter } from '@angular/core';
import { SelectionModel } from '@angular/cdk/collections';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { LiveAnnouncer } from '@angular/cdk/a11y';
import { ColumnsTableModel } from './models';

@Component({
  selector: 'pdv-table',
  templateUrl: './table.component.html',
  styleUrls: [],
})
export class TableComponent implements OnInit, AfterViewInit {
  /** Propriedade responsavel por exibir os items da tabela */
  @Input('dataSource')
  data: any[];

  /** Propriedade responsavel por criar e exibir as colunas da tabela */
  @Input('displayedColumns')
  displayedColumns: ColumnsTableModel[];

  /**
   * propriedade responsavel por o modo de seleção do componente
   */
  // TODO: criar enum com multi, sigle or non select
  @Input('multiSelect')
  multiSelect: boolean = false;

  /**
   * Output que emite seleções na tabela
   */
  @Output('selectedRow')
  selected: EventEmitter<any> = new EventEmitter<any>();

  @ViewChild(MatSort) sort: MatSort;

  private _columnsToDisplay: string[] = [];

  /** Propriedade que exibe os nomes das colunas */
  get columnsToDisplay() {
    return this._columnsToDisplay;
  }

  selection = new SelectionModel<any>(true, []);

  dataSource: any;

  constructor(private _liveAnnoucer: LiveAnnouncer) {}

  ngOnInit() {
    if (this.multiSelect) {
      this._columnsToDisplay.push('select');
    }

    this._initTable();
  }

  selectRow(event: any) {
    if (this.multiSelect) {
      this.selection.toggle(event);
    }
    this.selected.emit(this.selection.selected);
  }

  // -----------------------------------------------------------------------------------------
  // -------------------------------------- checkboxes ---------------------------------------
  // -----------------------------------------------------------------------------------------

  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.filteredData.length;
    return numSelected === numRows;
  }

  masterToggle() {
    if (this.isAllSelected()) {
      this.selection.clear();
      return;
    }

    this.selection.select(...this.dataSource.filteredData);
    this.selected.emit(this.selection.selected);
  }

  checkboxLabel(row?: any): string {
    if (!row) {
      return `${this.isAllSelected() ? 'deselect' : 'select'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${
      row.position + 1
    }`;
  }

  // -----------------------------------------------------------------------------------------
  // ----------------------------------------- sort ------------------------------------------
  // -----------------------------------------------------------------------------------------

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
  }

  changeSort(sortState: any) {
    if (sortState.direction) {
      this._liveAnnoucer.announce(`Sorted ${sortState.direction}ending`);
    } else {
      this._liveAnnoucer.announce('Sorted clared');
    }
  }

  // -----------------------------------------------------------------------------------------
  // ------------------------------------ table private --------------------------------------
  // -----------------------------------------------------------------------------------------

  private _initTable() {
    this._setColumns();
    this._setDataSource();
  }

  private _setDataSource() {
    if (this.data) {
      this.dataSource = new MatTableDataSource(this.data);
    }
  }

  private _setColumns() {
    if (this.displayedColumns === undefined) {
      throw new Error(`displayed columns error`);
    }

    this.displayedColumns.forEach((column) => {
      this._columnsToDisplay.push(column.displayName);
    });
  }
}
