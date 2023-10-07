package main

import (
	"unaxed-server/pkg/auth"
	"unaxed-server/pkg/database"
	"unaxed-server/pkg/handlers"

	"github.com/gin-gonic/gin"
)

func SetupRouter(db *database.Database, authService *auth.AuthService) *gin.Engine {
	r := gin.Default()

	r.GET("/", handlers.RootHandler)

	userHandler := handlers.NewUserHandler(db, authService)
	userRoutes := r.Group("/users")
	{
		userRoutes.POST("/create", userHandler.CreateUser)
		userRoutes.GET("/:username", userHandler.GetUserDetails)
	}

	return r
}
