package mypck

import (
	"fmt"
	"os"
	"text/template"
)

// Interfas3 ...
func Interfas3(str string) string {
	p := template.New("test")
	fmt.Println("---->")
	fmt.Printf("%s\n", p.Name())
	os.Stdout.WriteString("stdout\n")
	fmt.Println("---->")
	return str
}
