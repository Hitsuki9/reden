void main(List<String> args) {
  print(args);
  demo1();
}

class Demo {
  final String title;
  Demo(this.title);
  Demo.alias1() : title = 'alias1' {
    print(title);
  }
  Demo.alias2() : this.alias1();
}

void demo1() {
  var name1 = 'Bob';
  var name2 = name1;
  var list = [1, 2];
  var sym = #s;
  print('$name1 $name2 $list $sym');
  var demo = Demo('demo');
  print(demo.title);
  demo = Demo.alias1();
  demo = Demo.alias2();
}
