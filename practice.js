function Grand() {
  this.hobbit = "smoke"

}
var grand = new Grand();
Father.prototype=grand;
function Father() {
  this.name = "lin"
    this.num = 100;
}
var father = new Father();
Son.prototype=father; 
function Son() {

}
var son = new Son();