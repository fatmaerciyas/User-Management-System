package main

import (
	"User-Management-System/controllers"
	"fmt"
	"log"
	"net/http"

	L "./config.go"
	"github.com/gorilla/mux"
)

func main() {
	L.LoadAppConfig()

	// Initialize the router
	router := mux.NewRouter().StrictSlash(true)

	RegisterProductRoutes(router)

	// Start the server
	log.Println(fmt.Sprintf("Starting Server on port %s", L.AppConfig.Port))
	log.Fatal(http.ListenAndServe(fmt.Sprintf(":%v", L.AppConfig.Port), router))
}

func RegisterProductRoutes(router *mux.Router) {
	var muxBase = "/api/products"
	router.HandleFunc(muxBase, controllers.GetProducts).Methods("GET")
	router.HandleFunc(fmt.Sprintf("%s/{id}", muxBase), controllers.GetProductById).Methods("GET")
	router.HandleFunc(muxBase, controllers.CreateProduct).Methods("POST")
	router.HandleFunc(fmt.Sprintf("%s/{id}", muxBase), controllers.UpdateProduct).Methods("PUT")
	router.HandleFunc(fmt.Sprintf("%s/{id}", muxBase), controllers.DeleteProduct).Methods("DELETE")
}