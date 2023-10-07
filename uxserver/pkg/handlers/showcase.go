package handlers

import (
	"net/http"
	"unaxed-server/pkg/database"
	"unaxed-server/pkg/models"

	"github.com/gin-gonic/gin"
)

type ShowcaseHandler struct {
	DB *database.Database
}

func NewShowcaseHandler(db *database.Database) *ShowcaseHandler {
	return &ShowcaseHandler{
		DB: db,
	}
}

func (h *ShowcaseHandler) CreateShowcase(c *gin.Context) {
	var showcase models.Showcase

	if err := c.ShouldBindJSON(&showcase); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	if err := h.DB.CreateShowcase(&showcase); err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to create showcase"})
		return
	}

	c.JSON(http.StatusCreated, showcase)
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
