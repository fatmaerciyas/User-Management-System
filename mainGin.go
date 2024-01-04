package main

import (
	"User-Management-System/controllers"
	"database/sql"
	"fmt"
	"log"
	"net/http"

	"github.com/gin-gonic/gin"
	_ "github.com/mattn/go-sqlite3"
	"github.com/spf13/viper"
)

func handleError(c *gin.Context) {
	if err := recover(); err != nil {
		log.Printf("Error occurred: %+v", err)
		c.AbortWithStatusJSON(http.StatusInternalServerError, gin.H{
			"message": "An internal server error occurred.",
		})
	}
}


func main(){
	// To access the port from the config.json file, used viper package
	viper.SetConfigName("config") // Name of config file 
	viper.AddConfigPath(".") // Optionally look for config in the working directory
	err := viper.ReadInConfig()	// Find and read the config file

	if err != nil {	// Handle errors reading the config file
		panic(fmt.Errorf("Fatal error config file: %s", err))
	}

	port := viper.GetInt("port") //	Access port

	db, err := sql.Open("sqlite3", "./database/userDb.db")
	if err != nil {
		panic(err)
	}
	defer db.Close()

	

	router := gin.Default() //This is our server
	router.GET("/UserManagement", controllers.GetUsers(db))
	router.GET("/UserManagement/:id",  controllers.GetUserById(db))
	router.DELETE("/UserManagement/:id", controllers.DeleteUser(db))//users

	router.PATCH("/UserManagement/:id",  controllers.UpdateUser(db))
	 router.POST("/UserManagement",  controllers.AddUser(db))
	
	router.Run(fmt.Sprintf("localhost:%d", port)) //Run server in this port

} 

	