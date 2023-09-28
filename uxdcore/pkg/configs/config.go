package config

import (
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

const DefaultConfigPath = "./pkg/configs/config.json"

func LoadCoreConfig() (CoreConfig, error) {
	return LoadConfig(DefaultConfigPath)
}

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
