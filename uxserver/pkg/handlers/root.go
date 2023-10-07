package handlers

import (
	"net/http"

	"github.com/gin-gonic/gin"
)

// RootHandler handles requests to the root path ("/").
func RootHandler(c *gin.Context) {
	// Define links to various endpoints in the API.
	links := []map[string]string{
		{"rel": "users", "href": "/users"},
		// Add more links as needed for other endpoints.
	}

	// Provide basic information about the API along with links.
	response := gin.H{
		"api_version": "1.0",
		"status":      "ok",
		"links":       links,
	}

	c.JSON(http.StatusOK, response)
}
