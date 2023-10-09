package server

import (
	"fmt"
	"log"
	"os"
	"unaxed-server/pkg/auth"
	"unaxed-server/pkg/database"
)

func Run() {
	// TODO [Refactor] - Load the secret key from a dedicated secret mgmt service or AWS KMS
	// This is only used during the initial phase of development and testing
	secretKey := os.Getenv("SECRET_KEY")

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

// func generateRandomSecretKey(keyLength int) (string, error) {
// 	// Generate random bytes
// 	keyBytes := make([]byte, keyLength)
// 	_, err := rand.Read(keyBytes)
// 	if err != nil {
// 		return "", err
// 	}

// 	// Encode the random bytes to a base64 string
// 	encodedKey := base64.StdEncoding.EncodeToString(keyBytes)

// 	return encodedKey, nil
// }
