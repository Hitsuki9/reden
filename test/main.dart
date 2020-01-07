import 'package:meta/meta.dart';

void foo() {}

class A {
  static void bar() {} // 定义静态方法
  void baz() {} // 定义实例方法
}

class Point {
  var x;
  var y;
  Point.withAssert(this.x, this.y) {
    print('In Point.withAssert(): ($x, $y)');
  }
}

class Logger {
  final String name;
  bool mute = false;
  // _cache 变量是库私有的，因为在其名字前面有下划线。
  static final Map<String, Logger> _cache = <String, Logger>{};
  factory Logger(String name) {
    return _cache.putIfAbsent(name, () => Logger._internal(name));
  }
  Logger._internal(this.name) {
    log('log');
  }
  void log(String msg) {
    if (!mute) print(msg);
  }
}

void main() {
  var x = foo;
  assert(x == foo);
  x = A.bar;
  assert(x == A.bar);
  var text = 'Hello World';
  int num;
  var list = [1, 2, 3];
  var listOfStrings = ['#0', for (var i in list) '#$i'];
  Point.withAssert(1, 2);
  print('$text $num ${list[0]}');
  print(listOfStrings);
  print(isNull(param: null));
  print('=====');
  var tmp1 = Logger('tmp1');
  var tmp2 = Logger('tmp1');
  print(tmp1 == tmp2);
}

bool isNull({@required dynamic param, List<int> num = const [1]}) {
  if (param == null) {
    num = [2, ...num];
    print(num);
    return true;
  }
  return param == null;
}
