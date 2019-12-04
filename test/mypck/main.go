package mypck

import(
	"fmt"
)

// Tag is a string
var Tag string

// Tag2 is a int
var Tag2 int

func init() {
	Tag = "mypck/tag"
}

func init() {
	Tag2 = 9
}

// Interfas is a function
func Interfas(str string) string {
	p := new(*string)
	fmt.Println(*p)
	return str
}
