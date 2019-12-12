package mypck

import (
	"crypto/sha256"
	"encoding/json"
	"fmt"
)

// Movie ...
type Movie struct {
	Title  string
	Year   int  `json:"release"`
	Color  bool `json:"color,omitempty"`
	Actors []string
}

// Interfas2 is a function
func Interfas2(str string) string {
	hashmap := map[string]string{
		"name": "Hitsuki9",
	}
	movies := []Movie{
		{Title: "Casablanca", Year: 1942, Color: false,
			Actors: []string{"Humphrey Bogart", "Ingrid Bergman"}},
		{Title: "Cool Hand Luke", Year: 1967, Color: true,
			Actors: []string{"Paul Newman"}},
		{Title: "Bullitt", Year: 1968, Color: true,
			Actors: []string{"Steve McQueen", "Jacqueline Bisset"}},
	}
	var titles []struct{ Title string }
	data, _ := json.MarshalIndent(movies, "", "	")
	json.Unmarshal(data, &titles)
	nestedArr := [3][1]int{1: {1}}
	name, ok := hashmap["name"]
	sex, ok2 := hashmap["sex"]
	c1 := sha256.Sum256([]byte("🐮"))
	week := [7]string{"Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"}
	sli := week[1:7]
	sli2 := week[1:3]
	sli[0] = "Tue2"
	sli2 = append(sli2, "null")
	fmt.Println(">>>>>")
	fmt.Printf("%s\n", data)
	fmt.Println(titles)
	fmt.Printf("%T\n", nestedArr)
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
