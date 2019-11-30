package main

import(
	"bufio"
	"fmt"
	"os"
	"strings"
)

func main()  {
	str := strings.Join(os.Args[1:], " ")
	fmt.Println(str)
	counts := make(map[string]int)
	input := bufio.NewScanner(os.Stdin)
	for input.Scan() {
		counts[input.Text()]++
	}
	for line, n := range counts {
		if n > 0 {
			fmt.Printf("%d\t%s\n", n, line)
		}
	}
}
