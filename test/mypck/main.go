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
	var x int8 = 15
	var y int8 = 3
	z, w := 0.1, 0.2
	v := 1 + 2i
	fmt.Println("=====")
	fmt.Printf("%08b\t%08b\t%#[1]o\t%#[1]x\n", x, y)
	fmt.Printf("%08b\t%#[1]o\n", x &^ y)
	fmt.Printf("%8.20f\n", z + w)
	fmt.Println("复数", v, "的虚部为", imag(v))
	fmt.Println("=====")
	return str
}
