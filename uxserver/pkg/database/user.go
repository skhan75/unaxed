// uxserver/pkg/database/user.go
package database

import (
	"database/sql"
	"errors"
	"fmt"
	"unaxed-server/pkg/models"

	"golang.org/x/crypto/bcrypt"
)

func (database *Database) CreateUser(user *models.User) error {
	// Hash the user's password using bcrypt
	hashedPassword, err := bcrypt.GenerateFromPassword([]byte(user.Password), bcrypt.DefaultCost)
	if err != nil {
		return err
	}
	user.Password = string(hashedPassword)

	// Use a prepared statement for insertion
	stmt, err := database.DB.Prepare("INSERT INTO ux_dim_users (username, password, email, first_name, middle_name, last_name, bio, city, country) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)")
	if err != nil {
		return err
	}
	defer stmt.Close()

	_, err = stmt.Exec(user.Username, user.Password, user.Email, user.FirstName, user.MiddleName, user.LastName, user.Bio, user.City, user.Country)
	return err
}

func (database *Database) GetUserDetails(username string) (*models.User, error) {
	stmt, err := database.DB.Prepare("SELECT username, email, first_name, middle_name, last_name, bio, city, country FROM ux_dim_users WHERE username = ?")
	if err != nil {
		return nil, err
	}
	defer stmt.Close()

	var user models.User
	err = stmt.QueryRow(username).Scan(&user.Username, &user.Email, &user.FirstName, &user.MiddleName, &user.LastName, &user.Bio, &user.City, &user.Country)
	if err != nil {
		if err == sql.ErrNoRows {
			return nil, nil
		}
		return nil, err
	}

	return &user, nil
}

func (database *Database) UsernameExists(username string) (bool, error) {
	stmt, err := database.DB.Prepare("SELECT COUNT(*) FROM ux_dim_users WHERE username = ?")
	if err != nil {
		return false, err
	}
	defer stmt.Close()

	var count int
	err = stmt.QueryRow(username).Scan(&count)
	if err != nil {
		return false, err
	}

	return count > 0, nil
}

func (database *Database) getUserWithPassword(username string) (*models.User, error) {
	stmt, err := database.DB.Prepare("SELECT id, username, password, email, first_name, middle_name, last_name, bio, city, country FROM ux_dim_users WHERE username = ?")
	if err != nil {
		return nil, err
	}
	defer stmt.Close()

	var user models.User
	err = stmt.QueryRow(username).Scan(&user.ID, &user.Username, &user.Password, &user.Email, &user.FirstName, &user.MiddleName, &user.LastName, &user.Bio, &user.City, &user.Country)
	if err != nil {
		if err == sql.ErrNoRows {
			return nil, nil // Not found
		}
		return nil, err // Other error
	}

	return &user, nil
}

func (database *Database) DeleteUser(username string) error {
	stmt, err := database.DB.Prepare("DELETE FROM ux_dim_users WHERE username = ?")
	if err != nil {
		return err
	}
	defer stmt.Close()

	result, err := stmt.Exec(username)
	if err != nil {
		return err
	}

	// Check if a row was actually deleted
	rowsAffected, err := result.RowsAffected()
	if err != nil {
		return err
	}
	if rowsAffected == 0 {
		return errors.New("no user found with the provided username")
	}

	return nil
}

func (database *Database) AuthenticateUser(username, password string) (*models.User, error) {
	// Retrieve user with password
	user, err := database.getUserWithPassword(username)
	if err != nil {
		return nil, err
	}

	fmt.Printf("USER in AUTH  - %s\n\n", user.ID)

	// Compare hash of provided password with the stored hash
	err = bcrypt.CompareHashAndPassword([]byte(user.Password), []byte(password))
	if err != nil {
		if errors.Is(err, bcrypt.ErrMismatchedHashAndPassword) {
			return nil, errors.New("Invalid password") // Return error if hash and password don't match
		}
		return nil, err
	}

	return user, nil // Return the user if they match
}
