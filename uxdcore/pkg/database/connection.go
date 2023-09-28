package database

import (
	"database/sql"
	"fmt"
	config "unaxed-server/pkg/configs"
	"unaxed-server/pkg/secrets"

	_ "github.com/go-sql-driver/mysql"
)

func GetDBDataSourceName() (string, error) {
	const SecretStorePath = "dev/unaxed/db/aurora/credentials"

	config, err := config.LoadCoreConfig()
	if err != nil {
		return "", fmt.Errorf("failed to load DB config: %s", err)
	}

	// Fetch credentials and configurations from secrets manager
	db, err := secrets.GetDBCredentials(SecretStorePath)
	if err != nil {
		return "", fmt.Errorf("failed to get DB secrets: %s", err)
	}

	return BuildDBURL(db.Username, db.Password, config.DB.Host, config.DB.Port, config.DB.Name), nil
}

func GetDBConnection(dsn string) (*sql.DB, error) {
	db, err := sql.Open("mysql", dsn)
	if err != nil {
		return nil, err
	}

	if err := db.Ping(); err != nil {
		return nil, err
	}

	return db, nil
}

func BuildDBURL(username, password, host string, port int, dbName string) string {
	return fmt.Sprintf("%s:%s@tcp(%s:%d)/%s",
		username, password, host, port, dbName)
}

// func InitDB(connStr string) (*sql.DB, error) {
// 	db, err := sql.Open("mysql", connStr)
// 	if err != nil {
// 		return nil, err
// 	}

// 	if err := db.Ping(); err != nil {
// 		return nil, err
// 	}

// 	return db, nil
// }
