package main

import(
	"fmt"
	"os"
	"strings"
)

func main()  {
	var str string
	str = strings.Join(os.Args[1:], " ")
	fmt.Println(str)
}
