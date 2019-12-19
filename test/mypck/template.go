package mypck

import (
	"fmt"
	"log"
	"os"
	"strings"
	"text/template"
)

func square(n int) int { return n * n }
func async(str string, flag bool) string {
	defer fmt.Println("before return defer")
	fmt.Println("before return")
	if flag {
		return str
	}
	fmt.Println("after return")
	defer fmt.Println("after return defer")
	return "sub\t" + str
}
func f1(x int) {
	fmt.Printf("f(%d)\n", x+0/x)
	defer fmt.Printf("defer %d\n", x)
	f1(x - 1)
}

// Interfas3 ...
func Interfas3(str string) string {
	p := template.New("test")
	f := square
	fmt.Println("---->")
	// f1(3)
	fmt.Println(async("async", false))
	fmt.Println(f(999))
	fmt.Println(strings.Map(func(r rune) rune { return r - 1 }, "HAL-9000"))
	fmt.Printf("%s\n", p.Name())
	os.Stdout.WriteString("stdout\n")
	fmt.Println("---->")
	log.SetPrefix("wait: ")
	log.SetFlags(0)
	log.Fatal("feak error")
	return str
}
