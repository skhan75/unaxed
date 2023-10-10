package models

type UserProfile struct {
	UserID     int64  `db:"user_id"`
	Email      string `db:"email"`
	Username   string `db:"username"`
	FirstName  string `db:"first_name"`
	MiddleName string `db:"middle_name,omitempty"`
	LastName   string `db:"last_name"`
	Bio        string `db:"bio,omitempty"`
	City       string `db:"city"`
	Country    string `db:"country"`
}
