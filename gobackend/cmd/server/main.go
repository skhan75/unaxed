package main

import (
	"fmt"
	"log"
	"unaxed-server/pkg/database"
)

func main() {
	// Fetch the DSN
	dsn, err := database.GetDBDataSourceName()
	if err != nil {
		log.Fatalf("Failed to get DSN: %s", err)
	}

	// Get a DB connection using the DSN
	db, err := database.GetDBConnection(dsn)
	if err != nil {
		log.Fatalf("Failed to get DB connection: %s", err)
	}
	defer db.Close()

	// ... Rest of your application logic ...
	fmt.Println("Server started!")
}
