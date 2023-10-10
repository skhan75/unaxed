// uxserver/pkg/database/user.go
package database

import (
	"database/sql"
	"errors"
	"fmt"
	"unaxed-server/pkg/models"

	"golang.org/x/crypto/bcrypt"
)

// Registration related function
func (database *Database) RegisterUser(user *models.User) error {
	hashedPassword, err := bcrypt.GenerateFromPassword([]byte(user.Password), bcrypt.DefaultCost)
	if err != nil {
		return err
	}
	user.Password = string(hashedPassword)
	fmt.Printf("username %s\n", user.Username)
	fmt.Printf("password %s\n", user.Password)

	stmt, err := database.DB.Prepare("INSERT INTO ux_dim_users (username, password, email) VALUES (?, ?, ?)")
	if err != nil {
		return err
	}
	defer stmt.Close()

	fmt.Printf("Statement %v\n", stmt)
	_, err = stmt.Exec(user.Username, user.Password, user.Email)
	if err != nil {
		fmt.Printf("Error while executing statement: %v", err)
		return err
	}
	return err
}

// UserProfile creation function
func (database *Database) CreateUserProfile(userProfile *models.UserProfile) error {
	stmt, err := database.DB.Prepare("UPDATE ux_dim_users SET first_name=?, middle_name=?, last_name=?, bio=?, city=?, country=? WHERE id=?")
	if err != nil {
		return err
	}
	defer stmt.Close()
	_, err = stmt.Exec(userProfile.FirstName, userProfile.MiddleName, userProfile.LastName, userProfile.Bio, userProfile.City, userProfile.Country, userProfile.UserID)
	return err
}

// func (database *Database) CreateUser(user *models.User) error {
// 	// Hash the user's password using bcrypt
// 	hashedPassword, err := bcrypt.GenerateFromPassword([]byte(user.Password), bcrypt.DefaultCost)
// 	if err != nil {
// 		return err
// 	}
// 	user.Password = string(hashedPassword)

// 	// Use a prepared statement for insertion
// 	stmt, err := database.DB.Prepare("INSERT INTO ux_dim_users (username, password, email, first_name, middle_name, last_name, bio, city, country) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)")
// 	if err != nil {
// 		return err
// 	}
// 	defer stmt.Close()

// 	_, err = stmt.Exec(
// 		user.Username,
// 		user.Password,
// 		user.Email,
// 		user.FirstName,
// 		user.MiddleName,
// 		user.LastName,
// 		user.Bio,
// 		user.City,
// 		user.Country,
// 	)
// 	return err
// }

func (database *Database) GetUserDetailsByID(userID string) (*models.UserProfile, error) {
	stmt, err := database.DB.Prepare("SELECT id, username, email, first_name, middle_name, last_name, bio, city, country FROM ux_dim_users WHERE id = ?")
	if err != nil {
		return nil, err
	}
	defer stmt.Close()

	var userProfile models.UserProfile
	err = stmt.QueryRow(userID).Scan(
		&userProfile.UserID,
		&userProfile.Username,
		&userProfile.Email,
		&userProfile.FirstName,
		&userProfile.MiddleName,
		&userProfile.LastName,
		&userProfile.Bio,
		&userProfile.City,
		&userProfile.Country,
	)
	if err != nil {
		if err == sql.ErrNoRows {
			return nil, nil
		}
		return nil, err
	}

	return &userProfile, nil
}

func (database *Database) GetUserDetailsByUsername(username string) (*models.UserProfile, error) {
	stmt, err := database.DB.Prepare("SELECT id, username, email, first_name, middle_name, last_name, bio, city, country FROM ux_dim_users WHERE username = ?")
	if err != nil {
		return nil, err
	}
	defer stmt.Close()

	var userProfile models.UserProfile
	err = stmt.QueryRow(username).Scan(
		&userProfile.UserID,
		&userProfile.Username,
		&userProfile.Email,
		&userProfile.FirstName,
		&userProfile.MiddleName,
		&userProfile.LastName,
		&userProfile.Bio,
		&userProfile.City,
		&userProfile.Country,
	)
	if err != nil {
		if err == sql.ErrNoRows {
			return nil, nil // Not found
		}
		return nil, err // Other error
	}

	return &userProfile, nil
}

// func (database *Database) GetUserDetails(username string) (*models.User, error) {
// 	stmt, err := database.DB.Prepare("SELECT username, email, first_name, middle_name, last_name, bio, city, country FROM ux_dim_users WHERE username = ?")
// 	if err != nil {
// 		return nil, err
// 	}
// 	defer stmt.Close()

// 	var user models.User
// 	err = stmt.QueryRow(username).Scan(&user.Username, &user.Email, &user.FirstName, &user.MiddleName, &user.LastName, &user.Bio, &user.City, &user.Country)
// 	if err != nil {
// 		if err == sql.ErrNoRows {
// 			return nil, nil
// 		}
// 		return nil, err
// 	}

// 	return &user, nil
// }

func (database *Database) UpdateCurrentUser(userProfile *models.UserProfile) error {
	stmt, err := database.DB.Prepare("UPDATE ux_dim_users SET email=?, first_name=?, middle_name=?, last_name=?, bio=?, city=?, country=? WHERE id=?")
	if err != nil {
		return err
	}
	defer stmt.Close()

	_, err = stmt.Exec(
		userProfile.Email,
		userProfile.FirstName,
		userProfile.MiddleName,
		userProfile.LastName,
		userProfile.Bio,
		userProfile.City,
		userProfile.Country,
		userProfile.UserID,
	)
	if err != nil {
		return err
	}

	return nil
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

func (database *Database) getUserPassword(username string) (string, error) {
	stmt, err := database.DB.Prepare("SELECT password FROM ux_dim_users WHERE username = ?")
	if err != nil {
		return "", err
	}
	defer stmt.Close()

	var password string
	err = stmt.QueryRow(username).Scan(&password)
	if err != nil {
		if err == sql.ErrNoRows {
			return "", errors.New("invalid credentials")
		}
		return "", err // Other error
	}

	return password, nil
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

func (database *Database) DeleteUserByID(userID string) error {
	stmt, err := database.DB.Prepare("DELETE FROM ux_dim_users WHERE id = ?")
	if err != nil {
		return err
	}
	defer stmt.Close()

	result, err := stmt.Exec(userID)
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

func (database *Database) AuthenticateUser(username, password string) (*models.UserProfile, error) {
	// Retrieve hashed password of the user
	hashedPassword, err := database.getUserPassword(username)
	if err != nil {
		return nil, err
	}

	if hashedPassword == "" {
		// User does not exist
		return nil, errors.New("user not found")
	}

	// Compare hash of provided password with the stored hash
	err = bcrypt.CompareHashAndPassword([]byte(hashedPassword), []byte(password))
	if err != nil {
		if errors.Is(err, bcrypt.ErrMismatchedHashAndPassword) {
			return nil, errors.New("invalid credential") // Return error if hash and password don't match
		}
		return nil, err
	}

	// If authentication is successful, retrieve the full user details
	userDetails, err := database.GetUserDetailsByUsername(username)
	if err != nil {
		return nil, err
	}

	return userDetails, nil // Return the user if they match
}
