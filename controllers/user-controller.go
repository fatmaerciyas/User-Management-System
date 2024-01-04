package controllers

import (
	"User-Management-System/entities"
	"database/sql"
	"fmt"
	"net/http"
	"strconv"

	"github.com/gin-gonic/gin"
)



func GetUsers(db *sql.DB) func(context *gin.Context) {
	return func(context *gin.Context) {
		// Define the SQLite query
		query := "SELECT id, first_name, last_name, email FROM users"
		
		fmt.Println("query IS",query)

		// Query the database and store the result in rows
		rows, err := db.Query(query)
		if err != nil {
			panic(err)
		}

		fmt.Println("ROWS IS",rows)
		defer rows.Close()

		// Initialize an empty slice to store the users
		var users []entities.User

		// Iterate over the rows and append each user to the slice
		for rows.Next() {
			var user entities.User
			err := rows.Scan(&user.ID, &user.FirstName, &user.LastName, &user.Email)
			if err != nil {
				panic(err)
			}
			users = append(users, user)
		}

		// Check for errors during row iteration
		err = rows.Err()
		if err != nil {
			panic(err)
		}

		// Return the user data as a JSON response
		context.IndentedJSON(http.StatusOK, users)
	}

}

func AddUser(db *sql.DB) gin.HandlerFunc {
	return func(context *gin.Context) {
		var newUser entities.User
		if err := context.BindJSON(&newUser); err != nil {
			return
		}

		insertStatement := `INSERT INTO users (first_name, last_name,  email) VALUES (?,?,?)`
		_, err := db.Exec(insertStatement, newUser.FirstName, newUser.LastName, newUser.Email)
		if err != nil {
			context.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
			return
		}

		context.IndentedJSON(http.StatusCreated, newUser)
	}
}

func GetUserById(db *sql.DB) func(context *gin.Context) {
	return func(context *gin.Context) {
		id := context.Param("id")

		// Convert the user ID to an integer
		userID, err := strconv.ParseInt(id, 10, 64)
		if err != nil {
			context.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
			return
		}

		// Define the SQLite query
		query := "SELECT id, first_name, last_name, email FROM users WHERE id = ?"

		// Query the database and store the result in rows
		rows, err := db.Query(query, userID)
		if err != nil {
			panic(err)
		}
		defer rows.Close()

		// Initialize an empty User variable to store the user data
		var user entities.User

		// Iterate over the rows and set the user data
		for rows.Next() {
			err := rows.Scan(&user.ID, &user.FirstName, &user.LastName, &user.Email)
			if err != nil {
				panic(err)
			}
		}

		// Check for errors during row iteration
		err = rows.Err()
		if err != nil {
			panic(err)
		}

		// Return the user data as a JSON response
		context.IndentedJSON(http.StatusOK, user)
	}
}

func UpdateUser(db *sql.DB) gin.HandlerFunc {
	return func(context *gin.Context) {
		id := context.Param("id")
		
		// Parse the JSON body of the request
		// var updateUserRequest models.UserUpdate
		var updateUserRequest struct {
			FirstName string `json:"first_name"`
			LastName  string `json:"last_name"`
			Email     string `json:"email"`
		}
		
		if err := context.BindJSON(&updateUserRequest); err != nil {
			context.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
			return
		}

		// Update the 'completed' value of the todo item in the database
		updateStatement := `UPDATE users SET first_name = ?, last_name = ?, email = ? WHERE id = ?`
		_, err := db.Exec(updateStatement, updateUserRequest.FirstName, updateUserRequest.LastName, updateUserRequest.Email, id)
		if err != nil {
			context.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
			return
		}

		context.IndentedJSON(http.StatusOK, gin.H{"message": "Todo item updated successfully"})
	}
}

func DeleteUser(db *sql.DB) gin.HandlerFunc {
	return func(context *gin.Context) {
		id := context.Param("id")

		// Delete the user from the database
		deleteStatement := `DELETE FROM users WHERE id = ?`
		_, err := db.Exec(deleteStatement, id)
		if err != nil {
			context.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
			return
		}

		context.IndentedJSON(http.StatusOK, gin.H{"message": "User deleted successfully"})
	}
}
