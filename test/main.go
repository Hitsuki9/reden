package main

import (
	"flag"
	"fmt"
	"io/ioutil"
	"os"
	"strings"
	"test/mypck"
)

var n = flag.Bool("n", false, "omit trailing newline")
var sep = flag.String("s", "sep", "separator")

// MtoS is a type
type MtoS bool

func (m MtoS) String() string {
	if m {
		return "MtoS true"
	}
	return "MtoS false"
}

func main() {
	fmt.Println(mypck.Tag)
	fmt.Println(mypck.Tag2)
	// mypck.Interfas("Interfas")
	// mypck.Interfas2("Interfas2")
	mypck.Interfas3("Interfas3")
	fmt.Println(test("1"))
	for _, filename := range os.Args[1:] {
		data, err := ioutil.ReadFile(filename)
		if err != nil {
			fmt.Println(err)
			continue
		}
		for _, line := range strings.Split(string(data), "\n") {
			fmt.Println(line)
		}
	}
}

func test(v string) *string {
	var m MtoS = false
	fmt.Println(m)
	flag.Parse()
	if !*n {
		fmt.Println(*sep)
	}
	p := &v
	return p
}
