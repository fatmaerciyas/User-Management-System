package main

import (
	"User-Management-System/controllers"
	"database/sql"
	"fmt"

	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
	_ "github.com/mattn/go-sqlite3"
	"github.com/spf13/viper"
)


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

// Configure CORS
// config := cors.Config{
// 	AllowOrigins:     []string{"*"},
// 	AllowMethods:     []string{"GET", "POST", "PUT", "DELETE","PATCH"},
// 	AllowHeaders:     []string{"Origin", "Content-Type", "Content-Length", "Accept-Encoding", "X-CSRF-Token", "Authorization"},
// 	AllowCredentials: true,
// 	ExposeHeaders:    []string{"Content-Length"},
// 	MaxAge:           12 * 60 * 60, // 12 hours
//  }
 
 // Use Gin CORS middleware with the configured options
//  config := cors.DefaultConfig()
//  config.AllowAllOrigins = true

 // Use Gin CORS middleware with the configured options
 router := gin.Default() //This is our server
//  router.Use(CORSMiddleware())

router.Use(cors.New(cors.Config{
	AllowAllOrigins: true,
	AllowMethods:     []string{"GET", "POST", "PUT", "DELETE"},
	AllowHeaders:     []string{"Origin", "Content-Type", "Authorization"},
	ExposeHeaders:    []string{"Content-Length"},
	AllowCredentials: true,
}))

 // Define routes
 router.GET("/UserManagement", controllers.GetUsers(db))
 router.GET("/UserManagement/:id", controllers.GetUserById(db))
 router.DELETE("/UserManagement/:id", controllers.DeleteUser(db))
 router.PATCH("/UserManagement/:id", controllers.UpdateUser(db))
 router.POST("/UserManagement", controllers.AddUser(db))

 router.Run(fmt.Sprintf("localhost:%d", port)) // Run server in this port
 
} 
