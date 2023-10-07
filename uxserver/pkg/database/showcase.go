package database

import (
	"database/sql"
	"errors"
	"unaxed-server/pkg/models"
)

func (database *Database) CreateShowcase(showcase *models.Showcase) error {
	// Use a prepared statement for insertion
	stmt, err := database.DB.Prepare("INSERT INTO ux_fact_showcase (user_id, title, description, media_url, tags, privacy, latitude, longitude) VALUES (?, ?, ?, ?, ?, ?, ?, ?)")
	if err != nil {
		return err
	}
	defer stmt.Close()

	_, err = stmt.Exec(
		showcase.UserID,
		showcase.Title,
		showcase.Description,
		showcase.MediaURL,
		showcase.Tags,
		showcase.Privacy,
		showcase.Latitude,
		showcase.Longitude,
	)
	return err
}

func (database *Database) GetShowcaseDetails(showcaseID string) (*models.Showcase, error) {
	stmt, err := database.DB.Prepare("SELECT id, user_id, title, description, media_url, tags, privacy, latitude, longitude, created_at, updated_at FROM ux_fact_showcase WHERE id = ?")
	if err != nil {
		return nil, err
	}
	defer stmt.Close()

	var showcase models.Showcase
	err = stmt.QueryRow(showcaseID).Scan(
		&showcase.ID,
		&showcase.UserID,
		&showcase.Title,
		&showcase.Description,
		&showcase.MediaURL,
		&showcase.Tags,
		&showcase.Privacy,
		&showcase.Latitude,
		&showcase.Longitude,
		&showcase.CreatedAt,
		&showcase.UpdatedAt,
	)
	if err != nil {
		if err == sql.ErrNoRows {
			return nil, nil
		}
		return nil, err
	}

	return &showcase, nil
}

func (database *Database) DeleteShowcase(showcaseID string) error {
	stmt, err := database.DB.Prepare("DELETE FROM ux_fact_showcase WHERE id = ?")
	if err != nil {
		return err
	}
	defer stmt.Close()

	result, err := stmt.Exec(showcaseID)
	if err != nil {
		return err
	}

	// Check if a row was actually deleted
	rowsAffected, err := result.RowsAffected()
	if err != nil {
		return err
	}
	if rowsAffected == 0 {
		return errors.New("no showcase found with the provided ID")
	}

	return nil
}
