package main

import (
	"fmt"
	"log"

	migrate "github.com/golang-migrate/migrate/v4"
	_ "github.com/golang-migrate/migrate/v4/source/file"
	"github.com/spf13/cobra"
)

var upCmd = &cobra.Command{
	Use:   "up",
	Short: "Apply all up migrations",
	Run: func(cmd *cobra.Command, args []string) {
		fmt.Printf("HIII FROM UP COMMAND\n")
		migrationsFullPath, dsn := Initialize()
		fmt.Println("Migrations Full Path:", migrationsFullPath)
		m, err := migrate.New(migrationsFullPath, dsn)
		if err != nil {
			log.Fatalf("Migration failed to start: %s", err)
		}

		if err = m.Up(); err != nil {
			log.Fatalf("Migration failed: %s", err)
		}

		fmt.Println("Migrations completed successfully")
	},
}

func init() {
	fmt.Printf("HIII FROM UP\n")
	rootCmd.AddCommand(upCmd)
}
