package handlers

import (
	"net/http"
	"strconv"
	"unaxed-server/pkg/auth"
	"unaxed-server/pkg/database"
	"unaxed-server/pkg/models"

	"github.com/gin-gonic/gin"
)

type ShowcaseHandler struct {
	DB          *database.Database
	AuthService *auth.AuthService
}

func NewShowcaseHandler(db *database.Database, authService *auth.AuthService) *ShowcaseHandler {
	return &ShowcaseHandler{
		DB:          db,
		AuthService: authService,
	}
}

func (h *ShowcaseHandler) CreateShowcase(c *gin.Context) {
	var showcase models.Showcase

	// Get the currently authenticated user's username or user ID from the authentication token
	currentUserID, err := h.AuthService.GetCurrentUserIDFromToken(c)
	if err != nil {
		c.JSON(http.StatusUnauthorized, gin.H{"error": "Unauthorized"})
		return
	}

	if err := c.ShouldBindJSON(&showcase); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	// Convert the currentUserID to a uint64
	userID, err := strconv.ParseUint(currentUserID, 10, 64)
	// Set the UserID field of the Showcase to the ID of the authenticated user
	showcase.UserID = userID

	if err := h.DB.CreateShowcase(&showcase); err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to create showcase"})
		return
	}

	c.JSON(http.StatusCreated, showcase)
}

func (h *ShowcaseHandler) GetAllShowcases(c *gin.Context) {

}

func (h *ShowcaseHandler) GetShowcaseDetails(c *gin.Context) {
	showcaseID := c.Param("id")

	showcase, err := h.DB.GetShowcaseDetails(showcaseID)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to fetch showcase details"})
		return
	}

	if showcase == nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "Showcase not found"})
		return
	}

	c.JSON(http.StatusOK, showcase)
}

func (h *ShowcaseHandler) DeleteShowcase(c *gin.Context) {
	showcaseID := c.Param("id")

	if err := h.DB.DeleteShowcase(showcaseID); err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to delete showcase"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"message": "Showcase deleted successfully"})
}
