package main

import (
	"unaxed-server/pkg/auth"
	"unaxed-server/pkg/database"
	"unaxed-server/pkg/handlers"

	"github.com/gin-gonic/gin"
)

func SetupRouter(db *database.Database, authService *auth.AuthService) *gin.Engine {
	authMiddleware := auth.AuthMiddleware(authService)

	r := gin.Default()

	r.GET("/", handlers.RootHandler)

	userHandler := handlers.NewUserHandler(db, authService)
	userRoutes := r.Group("/users")
	{
		userRoutes.POST("/create", userHandler.CreateUser)
		userRoutes.POST("/login", userHandler.LoginUser)
		userRoutes.GET("/:username", userHandler.GetUserDetails)
	}

	// Use singular "user" for user-related actions
	currentUserRoutes := r.Group("/user")
	{
		currentUserRoutes.Use(authMiddleware)
		currentUserRoutes.GET("/", userHandler.GetCurrentUserDetails)
		// currentUserRoutes.PUT("/update", userHandler.UpdateCurrentUser)
		// currentUserRoutes.DELETE("/delete", userHandler.DeleteCurrentUser)
	}

	showcaseHandler := handlers.NewShowcaseHandler(db)
	showcaseRoutes := r.Group("/showcases")
	{
		showcaseRoutes.Use(authMiddleware)
		// showcaseRoutes.GET("/", showcaseHandler.GetAllShowcases)
		showcaseRoutes.POST("/create", showcaseHandler.CreateShowcase)
	}

	return r
}
