package controllers

import (
	"User-Management-System/entities"
	"User-Management-System/models"
	"database/sql"
	"fmt"
	"net/http"
	"strconv"
	"time"

	"github.com/gin-gonic/gin"
)


// * Returns all users
func GetUsers(db *sql.DB) func(context *gin.Context) {
	return func(context *gin.Context) {
		// Define the SQLite query
		query := "SELECT id, user_name, first_name, last_name, email,image,address, created_date, updated_date FROM users"


		
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
			err := rows.Scan(&user.ID, &user.UserName, &user.FirstName, &user.LastName, &user.Email, &user.Image, &user.Address, &user.CreatedDate, &user.UpdatedDate)
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

// ▪ Save the given user.
func AddUser(db *sql.DB) gin.HandlerFunc {
	return func(context *gin.Context) {
		var newUser entities.User
		if err := context.BindJSON(&newUser); err != nil {
			return
		}

		// Default datetime
		createdDateTime := time.Now()

		insertStatement := `INSERT INTO users (user_name, first_name, last_name,  email, image, address, created_date, updated_date) VALUES (?,?,?,?,?,?,?,?)`
		_, err := db.Exec(insertStatement, newUser.UserName, newUser.FirstName, newUser.LastName, newUser.Email,newUser.Image, newUser.Address, createdDateTime,createdDateTime)
		if err != nil {
			context.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
			return
		}

		context.IndentedJSON(http.StatusCreated, newUser)
	}
}

// ▪ Return the user with the desired “id”
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
		query := "SELECT id, user_name, first_name, last_name, email,image,address, created_date, updated_date FROM users WHERE id = ?"

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
			err := rows.Scan(&user.ID, &user.UserName, &user.FirstName, &user.LastName, &user.Email, &user.Image, &user.Address, &user.CreatedDate, &user.UpdatedDate)
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

// ▪ Update data of the user with the desired “id”
func UpdateUser(db *sql.DB) gin.HandlerFunc {
	return func(context *gin.Context) {
		id := context.Param("id")

		//Update User Model
		var updateUserRequest models.UserUpdate

		// Default datetime
		updatedDateTime := time.Now()
		
		if err := context.BindJSON(&updateUserRequest); err != nil {
			context.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
			return
		}

		// Update colums in users table in database
		updateStatement := `UPDATE users SET user_name= ?, first_name = ?, last_name = ?, email = ?,image = ? , address = ?, updated_date =? WHERE id = ?`
		_, err := db.Exec(updateStatement,updateUserRequest.UserName, updateUserRequest.FirstName, updateUserRequest.LastName, updateUserRequest.Email, updateUserRequest.Image, updateUserRequest.Address,updatedDateTime,  id)
		if err != nil {
			context.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
			return
		}

		context.IndentedJSON(http.StatusOK, gin.H{"message": "users updated successfully"})
	}
}

// ▪ Delete the user with the desired “id”
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
