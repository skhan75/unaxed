package config

import (
	"fmt"
	"path/filepath"
	"runtime"

	"github.com/spf13/viper"
)

type SecretsConfig struct {
	DBCredentialsPath string `mapstructure:"dbCredentialsPath"`
}

type DBConfig struct {
	Name string `mapstructure:"name"`
	Host string `mapstructure:"host"`
	Port int    `mapstructure:"port"`
}

type CoreConfig struct {
	DB      DBConfig      `mapstructure:"db"`
	Secrets SecretsConfig `mapstructure:"secrets"`
}

// Calculate the base path for the file relative to the config.go file

const DefaultConfigPath = "pkg/configs/config.json"

func LoadCoreConfig() (CoreConfig, error) {

	rootPath := GetProjectRoot()
	fmt.Println("ROOT PATH1 ", rootPath)
	configPath := filepath.Join(rootPath, DefaultConfigPath)
	fmt.Println("CONFIG PATH ", DefaultConfigPath)
	return LoadConfig(configPath)
}

// func LoadCoreConfig() (CoreConfig, error) {
// 	// Check for environment variable
// 	configPathFromEnv := os.Getenv("UNAXED_CONFIG_PATH")
// 	if configPathFromEnv != "" {
// 		return LoadConfig(configPathFromEnv)
// 	}

// 	// Fallback to relative path
// 	rootPath := GetProjectRoot()
// 	configPath := filepath.Join(rootPath, DefaultConfigPath)
// 	return LoadConfig(configPath)
// }

func LoadConfig(configPath string) (CoreConfig, error) {
	viper.SetConfigFile(configPath)
	viper.SetConfigType("json")

	err := viper.ReadInConfig()
	if err != nil {
		return CoreConfig{}, err
	}

	var config CoreConfig

	err = viper.Unmarshal(&config)
	if err != nil {
		return CoreConfig{}, err
	}

	return config, nil
}

func GetProjectRoot() string {
	_, filename, _, _ := runtime.Caller(0)
	dir := filepath.Dir(filename)
	return filepath.Join(dir, "../../")
}
