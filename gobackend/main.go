package main

import (
	"database/sql"
	"fmt"
	"unaxed-server/pkg/model"

	_ "github.com/go-sql-driver/mysql"
)

var users []model.User // This is a mock in-memory slice to hold our users for now
var db *sql.DB

func initDB() {
	// rootCertPool := x509.NewCertPool()
	// pem, err := ioutil.ReadFile("certs/global-bundle.pem") // Adjust the path as needed
	// if err != nil {
	// 	log.Fatalf("Failed to load root CA certificate: %s", err)
	// }
	// if ok := rootCertPool.AppendCertsFromPEM(pem); !ok {
	// 	log.Fatal("Failed to append PEM.")
	// }
	// mysql.RegisterTLSConfig("custom", &tls.Config{
	// 	RootCAs: rootCertPool,
	// })

	var dbName string = "UnaxedDB"
	var dbUser string = "uxdadmin"
	var dbPassword string = "3dyN1hk74M8m5tRLET5yml3QrMZt0yfc"
	var dbHost string = "unaxed-db-cluster.cluster-c6pdbbxu24hb.us-east-2.rds.amazonaws.com"
	var dbPort int = 3306

	dsn := fmt.Sprintf("%s:%s@tcp(%s:%d)/%s",
		dbUser, dbPassword, dbHost, dbPort, dbName,
	)

	fmt.Printf("DSN STRING - %s", dsn)

	db, err := sql.Open("mysql", dsn)
	if err != nil {
		panic(err)
	}

	err = db.Ping()
	if err != nil {
		fmt.Printf("ERROR: %s", err)
		panic(err)
	} else {
		fmt.Printf("Success")
	}
}

// func createUserHandler(w http.ResponseWriter, r *http.Request) {
// 	var newUser model.User
// 	if err := json.NewDecoder(r.Body).Decode(&newUser); err != nil {
// 		http.Error(w, err.Error(), http.StatusBadRequest)
// 		return
// 	}
// 	// For now, just append to the in-memory users slice
// 	newUser.ID = int64(len(users) + 1)
// 	users = append(users, newUser)
// 	json.NewEncoder(w).Encode(newUser)
// }

// func getUserHandler(w http.ResponseWriter, r *http.Request) {
// 	id, _ := strconv.Atoi(mux.Vars(r)["id"])
// 	for _, user := range users {
// 		if user.ID == int64(id) {
// 			json.NewEncoder(w).Encode(user)
// 			return
// 		}
// 	}
// 	http.Error(w, "User not found", http.StatusNotFound)
// }

func main() {
	initDB()

	// r := mux.NewRouter()

	// r.HandleFunc("/api/ping", PingHandler).Methods("GET")
	// r.HandleFunc("/api/users", createUserHandler).Methods("POST")
	// r.HandleFunc("/api/users/{id:[0-9]+}", getUserHandler).Methods("GET")

	// http.Handle("/", r)
	// log.Println("Server started on :8080")
	// log.Fatal(http.ListenAndServe(":8080", r))
}

// PingHandler is a sample handler to test if the server is running
// func PingHandler(w http.ResponseWriter, r *http.Request) {
// 	w.Write([]byte("Pong!"))
// }
