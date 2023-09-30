package main

import (
	"fmt"
	"log"
	"path/filepath"
	config "unaxed-server/pkg/configs"
	"unaxed-server/pkg/database"

	"github.com/spf13/viper"
)

// Initialize loads the core config and returns the migration path and DSN
func Initialize() (string, string) {
	fmt.Printf("HELLO FROM INITIALZIE\n")
	_, err := config.LoadCoreConfig()
	if err != nil {
		log.Fatalf("Failed to load core config: %s", err)
	}

	migrationsPath := viper.GetString("migrations.path")
	if migrationsPath == "" {
		log.Fatalf("Migrations path is not set in the config")
	}

	absPath, err := filepath.Abs(migrationsPath)
	if err != nil {
		log.Fatalf("Failed to get absolute path for migrations: %s", err)
	}

	dsn, err := database.GetDBDataSourceName()
	if err != nil {
		log.Fatalf("Failed to get DSN: %s", err)
	}

	return "file://" + absPath, "mysql://" + dsn
}
