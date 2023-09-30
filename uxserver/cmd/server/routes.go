package main

import "github.com/gin-gonic/gin"

func SetupRouter() *gin.Engine {
	r := gin.Default()
	r.POST("/register", RegisterUser)
	// ... other routes
	return r
}
