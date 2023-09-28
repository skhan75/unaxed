package main

import (
	"fmt"
	"log"
	config "unaxed-server/pkg/configs"
	"unaxed-server/pkg/database"

	migrate "github.com/golang-migrate/migrate/v4"
	_ "github.com/golang-migrate/migrate/v4/database/mysql"
	_ "github.com/golang-migrate/migrate/v4/source/file"
	"github.com/spf13/viper"
)

func main() {
	// Load the core config
	_, err := config.LoadCoreConfig()
	if err != nil {
		log.Fatalf("Failed to load core config: %s", err)
	}

	// Fetch the migrations path from the config
	migrationsPath := viper.GetString("migrations.path")
	if migrationsPath == "" {
		log.Fatalf("Migrations path is not set in the config")
	}

	// Fetch the DSN
	dsn, err := database.GetDBDataSourceName()
	if err != nil {
		log.Fatalf("Failed to get DSN: %s", err)
	}

	// Using the file scheme for migrations path
	// migrationsFullPath := "file://" + migrationsPath
	migrationsFullPath := "file:///home/khansa/workspace/unaxed/gobackend/pkg/db/migrations/"

	m, err := migrate.New(migrationsFullPath, "mysql://"+dsn)
	if err != nil {
		log.Fatalf("Migration failed to start: %s", err)
	}

	// Apply all up migrations
	// if err = m.Up(); err != nil {
	// 	log.Fatalf("Migration failed: %s", err)
	// }

	if err = m.Down(); err != nil {
		if err != migrate.ErrNoChange  {
			log.Fatalf("Rollback failed: %s", err)
		}
	}

	fmt.Println("Rollback  completed successfully")
}
