// auth/middleware.go

package auth

import (
	"net/http"
	"strings"

	"github.com/gin-gonic/gin"
)

func AuthMiddleware(authService *AuthService) gin.HandlerFunc {
	return func(c *gin.Context) {
		// Get the Authorization header from the request
		authorizationHeader := c.GetHeader("Authorization")

		// Check if the Authorization header is missing
		if authorizationHeader == "" {
			c.JSON(http.StatusUnauthorized, gin.H{"error": "Authorization header missing"})
			c.Abort()
			return
		}

		// The header should be in the format "Bearer <token>"
		parts := strings.Split(authorizationHeader, " ")
		if len(parts) != 2 || parts[0] != "Bearer" {
			c.JSON(http.StatusUnauthorized, gin.H{"error": "Invalid Authorization header format"})
			c.Abort()
			return
		}

		// Use the AuthService to validate and extract user ID
		userID, err := authService.GetCurrentUserIDFromToken(c)
		if err != nil {
			c.JSON(http.StatusUnauthorized, gin.H{"error": err.Error()})
			c.Abort()
			return
		}

		// Store the user ID in the Gin context for later use in the route handlers
		c.Set("user_id", userID)

		// Continue processing the request
		c.Next()
	}
}
