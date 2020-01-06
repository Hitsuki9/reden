import 'package:meta/meta.dart';

void main() {
  var text = 'Hello World';
  int num;
  var list = [1, 2, 3];
  var listOfStrings = ['#0', for (var i in list) '#$i'];
  print('$text $num ${list[0]}');
  print(listOfStrings);
  print(isNull(param: null));
}

bool isNull({@required dynamic param}) {
  return param == null;
}
