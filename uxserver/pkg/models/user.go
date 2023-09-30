package models

type User struct {
	ID         int64  `db:"id"`
	Username   string `db:"username"`
	Password   string `db:"password"` // This will store the hashed version of the password
	Email      string `db:"email"`
	FirstName  string `db:"first_name"`
	MiddleName string `db:"middle_name,omitempty"` // omitempty since it can be NULL
	LastName   string `db:"last_name"`
	Bio        string `db:"bio,omitempty"` // omitempty since it's TEXT and can be empty
	City       string `db:"city"`
	Country    string `db:"country"`
}
