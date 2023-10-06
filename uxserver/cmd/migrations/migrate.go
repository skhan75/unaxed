package main

import (
	"flag"
	"fmt"
	"log"
	"unaxed-server/pkg/database"
	configLoader "unaxed-server/utils"

	migrate "github.com/golang-migrate/migrate/v4"
	_ "github.com/golang-migrate/migrate/v4/database/mysql"
	_ "github.com/golang-migrate/migrate/v4/source/file"
)

func main() {
	// Command-line arguments
	direction := flag.String("direction", "up", "Direction of migration ('up' or 'down')")
	flag.Parse()

	// Fetch the DSN
	dsn, err := database.GetDBDataSourceName()
	if err != nil {
		log.Fatalf("Failed to get DSN: %s", err)
	}

	// Load the migrations config
	migrationConfig, err := configLoader.LoadMigrationConfig()
	if err != nil {
		log.Fatalf("Failed to load migration config: %s", err)
	}

	// Use the migrations path from the loaded config
	migrationsFullPath := "file://" + migrationConfig.Path
	if migrationsFullPath == "" {
		log.Fatalf("Migrations path is not set in the config")
	}

	// Initialize migration
	m, err := migrate.New(migrationsFullPath, "mysql://"+dsn)
	if err != nil {
		log.Fatalf("Migration failed to start: %s", err)
	}

	// Apply migrations based on the direction specified
	switch *direction {
	case "up":
		if err = m.Up(); err != nil {
			log.Fatalf("Migration failed: %s", err)
		}
		fmt.Println("Migration completed successfully")
	case "down":
		if err = m.Down(); err != nil {
			if err != migrate.ErrNoChange {
				log.Fatalf("Rollback failed: %s", err)
			}
		}
		fmt.Println("Rollback completed successfully")
	default:
		log.Fatalf("Invalid migration direction: %s. Use 'up' or 'down'", *direction)
	}
}
