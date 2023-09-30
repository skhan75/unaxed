package main

import (
	"fmt"
	"log"
	"unaxed-server/pkg/database"
	"unaxed-server/pkg/models"
)

func main() {
	// Mock user data
	user := &models.User{
		Username:   "testUsername",
		Password:   "testPassword",
		Email:      "test@email.com",
		FirstName:  "Test",
		MiddleName: "T",
		LastName:   "User",
		Bio:        "This is a test user bio",
		City:       "TestCity",
		Country:    "TestCountry",
	}

	// Try to create the user in the database
	err := database.CreateUser(user)
	if err != nil {
		log.Fatalf("Error creating user: %v", err)
	}

	fmt.Println("User created successfully!")
}
