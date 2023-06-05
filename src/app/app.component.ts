import { Component } from '@angular/core';
import { ColumnsTableModel } from 'projects/ui/src/lib/components/table/models';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'my-pdv-front-angular';

  displayedColumns: ColumnsTableModel[] = [
    {
      name: 'name',
      displayName: 'Name',
      sort: false,
    },
    {
      name: 'old',
      displayName: 'Old',
      sort: false,
    },
  ];

  dataSource: { name: string; old: number }[] = [
    { name: 'Pedro', old: 20 },
    { name: 'Carlos', old: 25 },
    { name: 'Sergio', old: 19 },
    { name: 'Paulo', old: 17 },
  ];
}
