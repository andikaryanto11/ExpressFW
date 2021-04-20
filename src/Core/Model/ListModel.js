
class ListModel {
     items = [];
     constructor(items){
          this.items = items
     }

     add(item){
          this.items.push = item;
          return;
     }

     getItems(){
          return this.items;
     }

     isEmpty(){
          return this.items.length == 0;
     }
}