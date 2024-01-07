package models

import "time"

type UserUpdate struct {
	UserName    string    `json:"user_name"`
	FirstName   string    `json:"first_name"`
	LastName    string    `json:"last_name"`
	Email       string    `json:"email"`
	Image       string    `json:"image"`
	Address     string    `json:"address"`
	UpdatedDate time.Time `json:"created_date"`
}