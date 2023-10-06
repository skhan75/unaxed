package main

import (
	"log"
	"unaxed-server/pkg/database"
)

func main() {
	dsn, err := database.GetDBDataSourceName()
	if err != nil {
		log.Fatalf("Failed to get DSN: %v", err)
	}
	db, err := database.GetConnection(dsn)
	if err != nil {
		log.Fatalf("Failed to initialize database: %v", err)
	}
	defer db.DB.Close()

}
