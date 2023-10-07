package main

import (
	"fmt"
	"log"
	"os"
	"unaxed-server/pkg/auth"
	"unaxed-server/pkg/database"

	"github.com/joho/godotenv"
)

func main() {
	// Load environment variables from .env file
	if err := godotenv.Load(); err != nil {
		log.Fatalf("Error loading .env file: %v", err)
	}

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

	// // Initialize the TokenManager with your secret key
	// tokenKey := []byte(secretKey) // Replace with your actual secret key
	// tokenManager := auth.NewTokenManager(tokenKey)

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

// Generate a sample token
// sampleUserID := "testUsername" // Replace with the actual user ID
// sampleToken, err := tokenManager.GenerateToken(sampleUserID)
// if err != nil {
// 	log.Fatalf("Failed to generate sample token: %v", err)
// }

// fmt.Println("Generated Sample Token:", sampleToken)

// // Parse the sample token
// parsedToken, err := tokenManager.ParseToken(sampleToken)
// if err != nil {
// 	log.Fatalf("Failed to parse sample token: %v", err)
// }

// // Check if the token is valid
// if !parsedToken.Valid {
// 	log.Fatalf("Sample token is not valid")
// }

// // Extract user ID from the token claims
// claims, ok := parsedToken.Claims.(jwt.MapClaims)
// if !ok {
// 	log.Fatalf("Invalid token claims")
// }

// userID, ok := claims["user_id"].(string)
// if !ok {
// 	log.Fatalf("User ID not found in token")
// }

// fmt.Println("Extracted User ID:", userID)
