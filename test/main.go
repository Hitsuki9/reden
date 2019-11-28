package main

import(
	"fmt"
	"os"
	"strings"
)

func main()  {
	str := strings.Join(os.Args[1:], " ")
	fmt.Println(str)
}
