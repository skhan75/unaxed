package models

import (
	"time"
)

type Showcase struct {
	ID          uint64    `json:"id" gorm:"primaryKey"`
	UserID      uint64    `json:"user_id"`
	Title       string    `json:"title" gorm:"not null"`
	Description string    `json:"description"`
	MediaURL    string    `json:"media_url"`
	Tags        string    `json:"tags"`
	Likes       int       `json:"likes" gorm:"default:0"`
	Views       int       `json:"views" gorm:"default:0"`
	Comments    int       `json:"comments" gorm:"default:0"`
	Privacy     string    `json:"privacy" gorm:"default:'public'"`
	Latitude    float64   `json:"latitude"`
	Longitude   float64   `json:"longitude"`
	CreatedAt   time.Time `json:"created_at" gorm:"not null"`
	UpdatedAt   time.Time `json:"updated_at"`
}
