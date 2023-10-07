package main

import (
	"crypto/rand"
	"encoding/base64"
	"fmt"
	"log"
	"os"
	"unaxed-server/pkg/auth"
	"unaxed-server/pkg/database"
)

func main() {
	keyLength := 32 // 256 bits
	secretKey, err := generateRandomSecretKey(keyLength)
	if err != nil {
		log.Fatalf("Failed to generate secret key: %v", err)
	}

	fmt.Println("Generated Secret Key:", secretKey)

	env := os.Getenv("UNAXED_ENV")
	if env == "localhost" || env == "local" {
		fmt.Printf("Running on %s...\n\n", env)
	}
	dsn, err := database.GetDBDataSourceName()
	if err != nil {
		log.Fatalf("Failed to get DSN: %v", err)
	}
	db, err := database.GetConnection(dsn)
	if err != nil {
		log.Fatalf("Failed to initialize database: %v", err)
	}
	defer db.DB.Close()

	// Initialize the AuthService with your secret key
	authKey := []byte(secretKey) // Replace with your actual secret key
	authService := auth.NewAuthService(authKey)

	r := SetupRouter(db, authService)

	// Start the server on port 8080
	log.Println("Starting server on port 8080")
	r.Run(":8080")
}

func generateRandomSecretKey(keyLength int) (string, error) {
	// Generate random bytes
	keyBytes := make([]byte, keyLength)
	_, err := rand.Read(keyBytes)
	if err != nil {
		return "", err
	}

	// Encode the random bytes to a base64 string
	encodedKey := base64.StdEncoding.EncodeToString(keyBytes)

	return encodedKey, nil
}

// user := &models.User{
// 	Username:   "testUsername",
// 	Password:   "testPassword",
// 	Email:      "test@email.com",
// 	FirstName:  "Test",
// 	MiddleName: "T",
// 	LastName:   "User",
// 	Bio:        "This is a test user bio",
// 	City:       "TestCity",
// 	Country:    "TestCountry",
// 	// Add other user data as needed
// }

// // Call the CreateUser function to insert the user into the database
// err = db.CreateUser(user)
// if err != nil {
// 	log.Fatalf("Failed to create user: %v", err)
// }

// log.Println("User created successfully")
