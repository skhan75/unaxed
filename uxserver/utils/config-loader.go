package utils

import (
	"fmt"
	"os"

	"github.com/spf13/viper"
)

// TODO - can it be done better than this?
const (
	defaultDBConfigPath        = "configs/db-config.json"
	defaultSecretsConfigPath   = "configs/secrets-config.json"
	defaultProjectRootName     = "uxserver"
	defaultMigrationConfigPath = "configs/data-migration-config.json"
)

type SecretsConfig struct {
	DBCredentialsPath string `mapstructure:"dbCredentialsPath"`
}

type DBConfig struct {
	Name string `mapstructure:"name"`
	Host string `mapstructure:"host"`
	Port int    `mapstructure:"port"`
}

type MigrationConfig struct {
	Path string `mapstructure:"path"`
}

// getConfigPath checks for the environment variable and falls back to the default path if not set.
func getConfigPath(envVar string, defaultPath string) string {
	if path := os.Getenv(envVar); path != "" {
		return path
	}
	return defaultPath
}

func getProjectRootName() string {
	if rootName := os.Getenv("UNAXED_PROJECT_ROOT_NAME"); rootName != "" {
		return rootName
	}
	return defaultProjectRootName
}

// loadConfig is a generic function to load configurations using viper.
func loadConfig(path string, v interface{}) error {
	viper.SetConfigFile(path)
	if err := viper.ReadInConfig(); err != nil {
		return err
	}
	return viper.Unmarshal(v)
}

func LoadDBConfig() (*DBConfig, error) {
	var dbConfig DBConfig

	// Get the root path relative to the current directory
	rootPath, err := GetRootFromPWD(getProjectRootName())
	if err != nil {
		return nil, err
	}

	// Determine the environment
	env := os.Getenv("UNAXED_ENV")
	var path string
	if env == "localhost" || env == "local" {
		fmt.Printf("Fetching config for local host..\n\n")
		path = rootPath + "configs/db-config.local.json"
		fmt.Printf("Path - %s\n", path)
	} else {
		path = rootPath + getConfigPath("UNAXED_DB_CONFIG_PATH", defaultDBConfigPath)
	}

	if err := loadConfig(path, &dbConfig); err != nil {
		return nil, err
	}

	return &dbConfig, nil
}

func LoadSecretsConfig() (*SecretsConfig, error) {
	var secretsConfig SecretsConfig

	// Get the root path relative to the current directory
	rootPath, err := GetRootFromPWD(getProjectRootName())
	if err != nil {
		return nil, err
	}

	// Construct the full path to the secrets config
	path := rootPath + getConfigPath("UNAXED_SECRETS_CONFIG_PATH", defaultSecretsConfigPath)
	if err := loadConfig(path, &secretsConfig); err != nil {
		return nil, err
	}

	return &secretsConfig, nil
}

func LoadMigrationConfig() (*MigrationConfig, error) {
	var migrationConfig MigrationConfig

	// Get the root path relative to the current directory
	rootPath, err := GetRootFromPWD(getProjectRootName())
	if err != nil {
		return nil, err
	}

	// Construct the full path to the migration config
	configPath := rootPath + getConfigPath("UNAXED_MIGRATION_CONFIG_PATH", defaultMigrationConfigPath)
	if err := loadConfig(configPath, &migrationConfig); err != nil {
		return nil, err
	}

	// Adjust the migration path to be an absolute path
	migrationConfig.Path = rootPath + migrationConfig.Path

	return &migrationConfig, nil
}
