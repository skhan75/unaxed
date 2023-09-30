package utils

import (
	"errors"
	"os"
	"path/filepath"
	"strings"
	"sync"
)

var cache = make(map[string]string)
var mu sync.RWMutex

// GetRootFromPWD returns the relative path from the current working directory
// back to the project root.
func GetRootFromPWD(projectRootName string) (string, error) {
	pwd, err := os.Getwd()
	if err != nil {
		return "", err
	}

	// Check if result is already cached
	mu.RLock()
	cachedResult, exists := cache[pwd]
	mu.RUnlock()
	if exists {
		return cachedResult, nil
	}

	// Split the path into its components
	components := strings.Split(pwd, string(filepath.Separator))

	// Find the index of the projectRootName in the path
	index := -1
	for i, component := range components {
		if component == projectRootName {
			index = i
			break
		}
	}

	if index == -1 {
		return "", errors.New("project root name not found in path")
	}

	// Calculate how many directories we are away from the project root
	levelsAway := len(components) - index - 1

	// Generate the relative path based on the number of directories we're away
	relativePath := strings.Repeat("../", levelsAway)

	// Cache the result before returning
	mu.Lock()
	cache[pwd] = relativePath
	mu.Unlock()

	return relativePath, nil
}

// func main() {
// 	const projectRootName = "uxserver"

// 	relativePath, err := GetRootFromPWD(projectRootName)
// 	if err != nil {
// 		println("Error:", err.Error())
// 		return
// 	}
// 	requiredPath := relativePath + "pkg/configs/config.go"

// 	println(requiredPath)
// }
