package models

type User struct {
	ID       int64  `db:"id"`
	Username string `db:"username"`
	Password string `db:"password"` // This will store the hashed version of the password
	Email    string `db:"email"`
}
