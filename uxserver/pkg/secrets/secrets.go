package secrets

import (
	"context"
	"encoding/json"
	"errors"

	"github.com/aws/aws-sdk-go-v2/config"
	"github.com/aws/aws-sdk-go-v2/service/secretsmanager"
)

type DBInfo struct {
	Username string `json:"username"`
	Password string `json:"password"`
}

func GetDBCredentials(secretName string) (*DBInfo, error) {
	cfg, err := config.LoadDefaultConfig(context.TODO())
	if err != nil {
		return nil, err
	}

	client := secretsmanager.NewFromConfig(cfg)
	secretValue, err := client.GetSecretValue(context.TODO(), &secretsmanager.GetSecretValueInput{
		SecretId: &secretName,
	})
	if err != nil {
		return nil, err
	}

	if secretValue.SecretString == nil {
		return nil, errors.New("secret string is empty")
	}

	var secret DBInfo
	if err := json.Unmarshal([]byte(*secretValue.SecretString), &secret); err != nil {
		return nil, err
	}

	return &secret, nil
}
