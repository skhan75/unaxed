// auth/token.go

package auth

import (
	"errors"

	"github.com/dgrijalva/jwt-go"
)

type TokenManager struct {
	SecretKey []byte
}

func NewTokenManager(secretKey []byte) *TokenManager {
	return &TokenManager{
		SecretKey: secretKey,
	}
}

func (tm *TokenManager) GenerateToken(userID string) (string, error) {
	// Create a new token with relevant claims (e.g., user ID)
	token := jwt.NewWithClaims(jwt.SigningMethodHS256, jwt.MapClaims{
		"user_id": userID,
	})

	// Sign the token with the secret key
	tokenString, err := token.SignedString(tm.SecretKey)
	if err != nil {
		return "", err
	}

	return tokenString, nil
}

func (tm *TokenManager) ParseToken(tokenString string) (*jwt.Token, error) {
	// Parse the token with the secret key
	token, err := jwt.Parse(tokenString, func(token *jwt.Token) (interface{}, error) {
		// Check the token signing method
		if _, ok := token.Method.(*jwt.SigningMethodHMAC); !ok {
			return nil, errors.New("Invalid token signing method")
		}
		return tm.SecretKey, nil
	})

	return token, err
}
