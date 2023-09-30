package main

import (
	"fmt"
	"log"

	migrate "github.com/golang-migrate/migrate/v4"
	_ "github.com/golang-migrate/migrate/v4/source/file"
	"github.com/spf13/cobra"
)

var downCmd = &cobra.Command{
	Use:   "down",
	Short: "Rollback all migrations",
	Run: func(cmd *cobra.Command, args []string) {
		fmt.Println("HELLO:")
		migrationsFullPath, dsn := Initialize()
		fmt.Println("Migrations Full Path:", migrationsFullPath)
		m, err := migrate.New(migrationsFullPath, dsn)
		if err != nil {
			log.Fatalf("Migration failed to start: %s", err)
		}

		if err = m.Down(); err != nil && err != migrate.ErrNoChange {
			log.Fatalf("Rollback failed: %s", err)
		}

		fmt.Println("Rollback completed successfully")
	},
}

func init() {
	rootCmd.AddCommand(downCmd)
}
