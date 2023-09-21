package main

import (
	"encoding/json"
	"log"
	"net/http"
	"strconv"

	"unaxed-server/pkg/model"

	"github.com/gorilla/mux"
)

var users []model.User // This is a mock in-memory slice to hold our users for now

func createUserHandler(w http.ResponseWriter, r *http.Request) {
	var newUser model.User
	if err := json.NewDecoder(r.Body).Decode(&newUser); err != nil {
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}
	// For now, just append to the in-memory users slice
	newUser.ID = int64(len(users) + 1)
	users = append(users, newUser)
	json.NewEncoder(w).Encode(newUser)
}

func getUserHandler(w http.ResponseWriter, r *http.Request) {
	id, _ := strconv.Atoi(mux.Vars(r)["id"])
	for _, user := range users {
		if user.ID == int64(id) {
			json.NewEncoder(w).Encode(user)
			return
		}
	}
	http.Error(w, "User not found", http.StatusNotFound)
}

func main() {
	r := mux.NewRouter()

	r.HandleFunc("/api/ping", PingHandler).Methods("GET")
	r.HandleFunc("/api/users", createUserHandler).Methods("POST")
	r.HandleFunc("/api/users/{id:[0-9]+}", getUserHandler).Methods("GET")

	http.Handle("/", r)
	log.Println("Server started on :8080")
	log.Fatal(http.ListenAndServe(":8080", r))
}

// PingHandler is a sample handler to test if the server is running
func PingHandler(w http.ResponseWriter, r *http.Request) {
	w.Write([]byte("Pong!"))
}
