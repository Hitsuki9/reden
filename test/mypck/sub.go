package mypck

import (
	"crypto/sha256"
	"fmt"
)

// Interfas2 is a function
func Interfas2(str string) string {
	hashmap := map[string]string{
		"name": "Hitsuki9",
	}
	name, ok := hashmap["name"]
	sex, ok2 := hashmap["sex"]
	c1 := sha256.Sum256([]byte("🐮"))
	week := [7]string{"Mon", "Tue", "wed", "Thu", "Fri", "Sat", "Sun"}
	sli := week[1:7]
	sli2 := week[1:3]
	sli[0] = "Tue2"
	sli2 = append(sli2, "null")
	fmt.Println(">>>>>")
	fmt.Println("name:", name, ok)
	fmt.Println("sex:", sex, ok2)
	fmt.Printf("%x\n", c1)
	for i, point := range c1 {
		fmt.Printf("%s", string(point))
		if i == len(c1)-1 {
			fmt.Println()
		}
	}
	fmt.Println(sli, week, sli2, sli2[:5])
	fmt.Println(">>>>>")
	return str
}
