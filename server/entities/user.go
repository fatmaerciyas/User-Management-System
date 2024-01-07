package entities

import "time"

type User struct {
	ID          string    `json:"id"`
	UserName    string    `json:"user_name"`
	FirstName   string    `json:"first_name"`
	LastName    string    `json:"last_name"`
	Email       string    `json:"email"`
	Image       string    `json:"image"`
	Address     string    `json:"address"`
	CreatedDate time.Time `json:"created_date"`
	UpdatedDate time.Time `json:"updated_date"`
}