import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import {MatDialog, MatDialogModule} from '@angular/material/dialog';
import { PeopleTableComponent } from '../people-table/people-table.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Subscription } from 'rxjs';
import { GentlemanStateManager } from 'src/app/app.module';
import { SourceOfTruthKeys } from '../../state-management/store/store';

@Component({
  standalone: true,
  imports: [CommonModule, MatToolbarModule, MatIconModule, MatDialogModule, BrowserAnimationsModule],
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent implements OnInit, OnDestroy {

  constructor(public dialog: MatDialog) {
    GentlemanStateManager.getEntity(SourceOfTruthKeys.USER)
    .getObservable()
    .subscribe((user)=>{console.log(user)});
  }

  ngOnInit() {
  }

  ngOnDestroy(): void {
    GentlemanStateManager.getEntity(SourceOfTruthKeys.USER).unSubscribe();
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
  }

  openDialog(enterAnimationDuration: string, exitAnimationDuration: string): void {

    this.dialog.open(PeopleTableComponent, {
      // width: '250px',
      // enterAnimationDuration,
      // exitAnimationDuration,
      });
  }
}
