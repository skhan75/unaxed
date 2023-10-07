// auth/service.go

package auth

import (
	"errors"
	"strings"

	"github.com/dgrijalva/jwt-go"
	"github.com/gin-gonic/gin"
)

type AuthService struct {
	// You can include any necessary dependencies here, such as configuration or user repositories.
	SecretKey []byte
}

func NewAuthService(secretKey []byte) *AuthService {
	return &AuthService{
		SecretKey: secretKey,
	}
}

func (s *AuthService) GetCurrentUserIDFromToken(c *gin.Context) (string, error) {
	// Get the Authorization header from the request
	authorizationHeader := c.GetHeader("Authorization")

	// Check if the Authorization header is missing
	if authorizationHeader == "" {
		return "", errors.New("Authorization header missing")
	}

	// The header should be in the format "Bearer <token>"
	parts := strings.Split(authorizationHeader, " ")
	if len(parts) != 2 || parts[0] != "Bearer" {
		return "", errors.New("Invalid Authorization header format")
	}

	// Extract the token from the header
	tokenString := parts[1]

	// Parse the token with the secret key
	token, err := jwt.Parse(tokenString, func(token *jwt.Token) (interface{}, error) {
		// Check the token signing method
		if _, ok := token.Method.(*jwt.SigningMethodHMAC); !ok {
			return nil, errors.New("Invalid token signing method")
		}
		return s.SecretKey, nil
	})

	// Check for token parsing errors
	if err != nil {
		return "", err
	}

	// Verify if the token is valid
	if !token.Valid {
		return "", errors.New("Invalid token")
	}

	// Extract user ID or relevant claims from the token
	claims, ok := token.Claims.(jwt.MapClaims)
	if !ok {
		return "", errors.New("Invalid token claims")
	}

	// Extract the user ID from claims (replace with your own claim name)
	userID, ok := claims["user_id"].(string)
	if !ok {
		return "", errors.New("User ID not found in token")
	}

	// Return the extracted user ID
	return userID, nil
}

// Add other authentication-related methods as needed.
