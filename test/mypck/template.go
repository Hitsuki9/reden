package mypck

import (
	"fmt"
	"os"
	"text/template"
	"log"
	"strings"
)

func square(n int) int { return n * n }

// Interfas3 ...
func Interfas3(str string) string {
	p := template.New("test")
	f := square
	fmt.Println("---->")
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
