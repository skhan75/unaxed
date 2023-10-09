package models

import "time"

type Connection struct {
	ID                   int64                  `db:"id"`
	UserID               int64                  `db:"user_id"`
	TargetID             int64                  `db:"target_id"`
	ConnectionType       string                 `db:"connection_type"`
	ConnectedAt          time.Time              `db:"connected_at"`
	Status               string                 `db:"status"` // pending, accepted, blocked, etc.
	LastInteraction      time.Time              `db:"last_interaction"`
	MessageCount         int                    `db:"message_count"`
	ConnectionNotes      string                 `db:"connection_notes"`
	ConnectionSettings   map[string]interface{} `db:"connection_settings"`
	ConnectionStrength   int                    `db:"connection_strength"`
	ConnectionTags       []string               `db:"connection_tags"`       // Slice of tags or labels
	ConnectionGroups     []string               `db:"connection_groups"`     // Slice of group names
	ConnectionVisibility string                 `db:"connection_visibility"` // public, private, limited, etc.
	ConnectionEndReason  string                 `db:"connection_end_reason"`
}
