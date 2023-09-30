package database

import (
	"database/sql"
	"fmt"
	"unaxed-server/pkg/secrets"
	"unaxed-server/utils"

	_ "github.com/go-sql-driver/mysql"
)

// db singleton
var dbInstance *sql.DB

func GetDB() (*sql.DB, error) {
	if dbInstance != nil {
		return dbInstance, nil
	}

	dsn, err := GetDBDataSourceName()
	if err != nil {
		return nil, err
	}

	dbInstance, err = GetDBConnection(dsn)
	if err != nil {
		return nil, err
	}

	return dbInstance, nil
}

func GetDBDataSourceName() (string, error) {
	// Load secrets configuration to get the path for DB credentials
	secretsConfig, err := utils.LoadSecretsConfig()
	if err != nil {
		return "", fmt.Errorf("failed to load secrets config: %s", err)
	}

	// Fetch credentials and configurations from secrets manager
	dbCredentials, err := secrets.GetDBCredentials(secretsConfig.DBCredentialsPath)
	if err != nil {
		return "", fmt.Errorf("failed to get DB secrets: %s", err)
	}

	// Load DB configuration to get host, port, etc.
	dbConfig, err := utils.LoadDBConfig()
	if err != nil {
		return "", fmt.Errorf("failed to load DB config: %s", err)
	}

	return BuildDBURL(dbCredentials.Username, dbCredentials.Password, dbConfig.Host, dbConfig.Port, dbConfig.Name), nil
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
