package mypck

import (
	"fmt"
)

type point struct {
	X float64
	Y float64
}

func (p *point) ScaleBy(factory float64) {
	p.X *= factory
	p.Y *= factory
}

// Interfas4 ...
func Interfas4(str string) string {
	p := point{
		X: 3.14,
		Y: 3.14,
	}
	p.ScaleBy(3.14)
	fmt.Println("====>")
	fmt.Printf("X:%f Y:%f\n", p.X, p.Y)
	fmt.Println("====>")
	return str
}
