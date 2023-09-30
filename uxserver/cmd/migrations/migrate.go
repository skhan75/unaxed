package main

import (
	"fmt"
	"log"
	"unaxed-server/pkg/database"
	configLoader "unaxed-server/utils"

	migrate "github.com/golang-migrate/migrate/v4"
	_ "github.com/golang-migrate/migrate/v4/database/mysql"
	_ "github.com/golang-migrate/migrate/v4/source/file"
)

func main() {
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

	// Apply all up migrations
	if err = m.Up(); err != nil {
		log.Fatalf("Migration failed: %s", err)
	}
	fmt.Println("Migration completed successfully")

	// if err = m.Down(); err != nil {
	// 	if err != migrate.ErrNoChange {
	// 		log.Fatalf("Rollback failed: %s", err)
	// 	}
	// }
	// fmt.Println("Rollback completed successfully")
}

// package main

// import (
// 	"fmt"
// 	"log"

// 	"github.com/spf13/cobra"
// )

// var rootCmd = &cobra.Command{
// 	Use:   "migrate",
// 	Short: "Migration CLI tool for UnaxedDB",
// }

// func Execute() {
// 	if err := rootCmd.Execute(); err != nil {
// 		log.Fatalf("Error: %s", err)
// 	}
// }

// func main() {
// 	fmt.Printf("HIII")
// 	Execute()
// }
