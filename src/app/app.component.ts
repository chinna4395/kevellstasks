import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

export interface UserData {
  id: number;
  title: string;
  url: string;
  thumbnailUrl: string;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{

  title = 'kevellstasks';
  ELEMENT_DATA:any =[];
  displayedColumns: string[] = ['id', 'title', 'url', 'thumbnailUrl'];
  dataSource: MatTableDataSource<UserData>;


  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor( 
                private http : HttpClient
) {}

  ngOnInit() {
    this.dataSource = new MatTableDataSource();
    this.getLabs();
    this.dataSource.sort = this.sort;
    this.dataSource.paginator =this.paginator;
    this.dataSource.paginator = this.paginator;

  }

  getLabs(){
    this.http.get('https://jsonplaceholder.typicode.com/photos').subscribe((res)=>{
      console.log(res);
      this.ELEMENT_DATA = res;
      this.dataSource = new MatTableDataSource(this.ELEMENT_DATA);
      console.log(this.dataSource);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
      return this.ELEMENT_DATA;
    })
  }


applyFilter(event: Event) {
  const filterValue = (event.target as HTMLInputElement).value;
  this.dataSource.filter = filterValue.trim().toLowerCase();
}

}
