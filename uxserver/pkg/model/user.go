package model

type User struct {
	ID         int64  `json:"id" db:"id"`
	Username   string `json:"username" db:"username"`
	Password   string `json:"password" db:"password"` // Hashed!
	Email      string `json:"email" db:"email"`
	FullName   string `json:"full_name" db:"full_name"`
	Bio        string `json:"bio" db:"bio"`
	ProfilePic string `json:"profile_pic" db:"profile_pic"`
}
