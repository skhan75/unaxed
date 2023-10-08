package handlers

import (
	"fmt"
	"net/http"
	"reflect"
	"strconv"
	"unaxed-server/pkg/auth"
	"unaxed-server/pkg/database"
	"unaxed-server/pkg/models"

	"github.com/gin-gonic/gin"
)

type UserHandler struct {
	DB          *database.Database
	AuthService *auth.AuthService
}

// UpdateUserRequest defines the fields that can be updated in a user's profile.
type UpdateUserRequest struct {
	FirstName  *string `json:"first_name"`
	MiddleName *string `json:"middle_name"`
	LastName   *string `json:"last_name"`
	Bio        *string `json:"bio"`
	City       *string `json:"city"`
	Country    *string `json:"country"`
}

// NewUserHandler is a constructor function to create a UserHandler instance.
func NewUserHandler(db *database.Database, authService *auth.AuthService) *UserHandler {
	return &UserHandler{
		DB:          db,
		AuthService: authService, // Inject the AuthService
	}
}

// CreateUser handles the creation of a new user
func (h *UserHandler) CreateUser(c *gin.Context) {
	var user models.User

	if err := c.ShouldBindJSON(&user); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	// Check if the username already exists in the database
	existingUser, err := h.DB.UsernameExists(user.Username)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to check username uniqueness"})
		return
	}
	if existingUser {
		c.JSON(http.StatusConflict, gin.H{"error": "Username already taken"})
		return
	}

	if err := h.DB.CreateUser(&user); err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to create user"})
		return
	}

	c.JSON(http.StatusCreated, user)
}

// GetUserDetails handles the retrieval of user details.
func (h *UserHandler) GetUserDetails(c *gin.Context) {
	username := c.Param("username")

	user, err := h.DB.GetUserDetails(username)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to fetch user details"})
		return
	}

	if user == nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "User not found"})
		return
	}

	c.JSON(http.StatusOK, user)
}

// GetCurrentUserDetails retrieves the details of the currently authenticated user.
func (h *UserHandler) GetCurrentUserDetails(c *gin.Context) {
	// Get the currently authenticated user's username or user ID from the authentication token
	currentUserID, err := h.AuthService.GetCurrentUserIDFromToken(c)
	if err != nil {
		c.JSON(http.StatusUnauthorized, gin.H{"error": "Unauthorized"})
		return
	}

	// Fetch the user details from the database
	currentUser, err := h.DB.GetUserDetailsByID(currentUserID)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to fetch user details"})
		return
	}

	if currentUser == nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "User not found"})
		return
	}

	c.JSON(http.StatusOK, currentUser)
}

func (h *UserHandler) UpdateCurrentUser(c *gin.Context) {
	// Get the currently authenticated user's username or user ID from the authentication token
	currentUserID, err := h.AuthService.GetCurrentUserIDFromToken(c)
	if err != nil {
		c.JSON(http.StatusUnauthorized, gin.H{"error": "Unauthorized"})
		return
	}

	// Retrieve the user's current details
	currentUser, err := h.DB.GetUserDetailsByID(currentUserID)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to fetch user details"})
		return
	}
	if currentUser == nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "User not found"})
		return
	}

	// Parse the request body to get the fields to update
	var updateRequest map[string]interface{}
	if err := c.ShouldBindJSON(&updateRequest); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	// Use reflection to update the user's details based on the fields provided in the updateRequest
	userValue := reflect.ValueOf(currentUser).Elem()

	for fieldName, fieldValue := range updateRequest {
		field := userValue.FieldByName(fieldName)

		if field.IsValid() {
			if field.Kind() == reflect.String {
				field.SetString(fmt.Sprintf("%v", fieldValue))
			} else {
				// Handle other types if needed
			}
		}
	}

	// Save the updated user data to the database
	if err := h.DB.UpdateCurrentUser(currentUser); err != nil {
		// Handle error if the database update fails
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to update user in the database"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"message": "User updated successfully"})

}

func (h *UserHandler) DeleteCurrentUser(c *gin.Context) {
	// Get the currently authenticated user's username or user ID from the authentication token
	currentUserID, err := h.AuthService.GetCurrentUserIDFromToken(c)
	if err != nil {
		c.JSON(http.StatusUnauthorized, gin.H{"error": "Unauthorized"})
		return
	}

	if err := h.DB.DeleteUserByID(currentUserID); err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to delete user"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"message": "User deleted successfully"})
}

// DeleteUser handles the deletion of a user.
func (h *UserHandler) DeleteUser(c *gin.Context) {
	username := c.Param("username")

	if err := h.DB.DeleteUser(username); err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to delete user"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"message": "User deleted successfully"})
}

// LoginUser handles user authentication and generates a JWT token upon successful login.
func (h *UserHandler) LoginUser(c *gin.Context) {
	var loginRequest struct {
		Username string `json:"username" binding:"required"`
		Password string `json:"password" binding:"required"`
	}

	if err := c.ShouldBindJSON(&loginRequest); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	// Authenticate the user based on username and password using the AuthenticateUser method.
	user, err := h.DB.AuthenticateUser(loginRequest.Username, loginRequest.Password)
	if err != nil {
		c.JSON(http.StatusUnauthorized, gin.H{"error": "Invalid credentials"})
		return
	}

	// If authentication succeeds, generate a JWT token for the user.
	token, err := h.AuthService.GenerateToken(strconv.FormatInt(user.ID, 10))
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to generate token"})
		return
	}

	// Set the JWT token in the response header
	c.Header("Authorization", "Bearer "+token)

	// Respond with a success status code
	c.JSON(http.StatusOK, gin.H{"message": "Login successful"})
}
