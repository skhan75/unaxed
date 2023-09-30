// uxserver/pkg/database/user.go
package database

import (
	"unaxed-server/pkg/models"

	"golang.org/x/crypto/bcrypt"
)

func CreateUser(user *models.User) error {
	// Connect to DB
	db, err := GetDB()
	if err != nil {
		return err
	}

	// Hash the user's password using bcrypt
	hashedPassword, err := bcrypt.GenerateFromPassword([]byte(user.Password), bcrypt.DefaultCost)
	if err != nil {
		return err
	}
	user.Password = string(hashedPassword)

	// Use a prepared statement for insertion
	stmt, err := db.Prepare("INSERT INTO ux_dim_users (username, password, email, first_name, middle_name, last_name, bio, city, country) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)")
	if err != nil {
		return err
	}
	defer stmt.Close()

	_, err = stmt.Exec(user.Username, user.Password, user.Email, user.FirstName, user.MiddleName, user.LastName, user.Bio, user.City, user.Country)
	return err
}

// ... Add other functions like GetUser, UpdateUser, DeleteUser as required
