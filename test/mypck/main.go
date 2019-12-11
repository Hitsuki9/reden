package mypck

import (
	"fmt"
	"strings"
	"unicode/utf8"
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

func comma(s string) string {
	n := len(s)
	if n <= 3 {
		return s
	}
	return comma(s[:n-3]) + "," + s[n-3:]
}

// Interfas is a function
// str = "Interfas"
func Interfas(str string) string {
	var x int8 = 15
	var y int8 = 3
	var runeType rune = 10
	var int32Type int32 = 10
	const constant = 123i
	z, w := 0.1, 0.2
	v := 1 + 2i
	s := "中日英文混合プログラムwords"
	fmt.Println("=====")
	fmt.Printf("%T\n", constant)
	fmt.Println("HasPrefix", strings.HasPrefix(str, "Inter"))
	fmt.Println("HasSuffix", strings.HasSuffix(str, "fas"))
	fmt.Println("Contains", strings.Contains(str, "ter"))
	fmt.Println("rune === int32", runeType == int32Type)
	fmt.Printf("%08b\t%08b\t%#[1]o\t%#[1]x\n", x, y)
	fmt.Printf("%08b\t%#[1]o\n", x&^y)
	fmt.Printf("%8.20f\n", z+w)
	fmt.Println("复数", v, "的虚部为", imag(v))
	fmt.Println(`多行
测试`, "字节数：", len("测试"), "码点数：", utf8.RuneCountInString("测试"))
	fmt.Println(string(1234567))
	for i, r := range s {
		fmt.Printf("%d\t%c\t%d\n", i, r, r)
	}
	fmt.Println(comma("123456789"))
	fmt.Println("=====")
	return str
}
